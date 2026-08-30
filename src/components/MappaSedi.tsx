import sedi from "@/data/sedi.json";

/**
 * Mappa dell'Italia in SVG inline: nessuna libreria, nessuna tile esterna,
 * nessuna chiave API. Il profilo è generato da un GeoJSON pubblico
 * (Natural Earth) con la stessa proiezione usata qui sotto per i pin,
 * così i punti cadono dove devono.
 */

const VIEW_W = 400;
const VIEW_H = 481;

// Costanti della proiezione equirettangolare corretta in longitudine.
const LON_MIN = 6.749955;
const LAT_MAX = 47.115393;
const KX = 0.744688;
const SCALE = 45.7906;

const ITALIA_PATH =
  "M299.1,406.8L286.8,442.9L291.9,457.0L284.7,480.6L258.7,463.3L241.3,458.4L193.7,435.1L198.5,411.6L238.4,415.8L273.2,410.8L299.1,406.8ZM83.9,270.4L104.3,302.9L99.6,363.5L84.1,360.6L70.1,375.9L57.2,363.7L55.9,308.5L48.1,282.3L66.8,284.6L83.9,270.4ZM191.9,15.9L240.6,27.8L236.9,50.3L245.1,69.8L218.0,63.1L190.2,79.4L192.1,102.1L187.9,115.2L199.1,138.5L231.1,161.5L248.2,199.4L286.2,236.3L312.9,236.0L321.2,246.1L311.7,255.3L342.2,271.8L367.2,285.7L396.5,309.5L400.0,318.1L393.6,334.5L374.7,313.1L345.1,305.6L330.7,335.2L355.4,352.2L351.3,376.1L337.1,378.8L318.9,418.0L304.7,421.6L304.8,407.6L311.7,383.0L319.2,373.2L305.8,346.7L295.4,323.6L281.3,317.9L271.2,298.1L249.3,289.8L234.5,271.4L209.3,268.4L182.7,247.8L151.5,218.0L128.3,191.6L117.6,146.3L100.7,141.0L72.9,125.9L57.2,132.1L37.5,153.3L23.4,156.7L27.3,136.8L8.8,131.0L0.0,95.6L11.8,81.6L1.8,64.4L3.2,51.5L17.9,61.3L34.3,59.1L53.4,43.6L59.3,50.8L75.6,49.4L83.0,30.9L108.2,36.7L123.2,28.9L125.9,10.2L146.6,16.7L150.5,8.0L184.2,0.0L191.9,15.9Z";

const proietta = (lat: number, lon: number) => ({
  x: (lon - LON_MIN) * KX * SCALE,
  y: (LAT_MAX - lat) * SCALE,
});

type Punto = {
  citta: string;
  x: number;
  y: number;
  fondata: boolean;
  nomi: string[];
};

// Più atenei nella stessa città condividono un pin: due cerchi sovrapposti
// sarebbero illeggibili. Il pin è "fondata" se almeno una sede lo è.
function raggruppaPerCitta(): Punto[] {
  const mappa = new Map<string, Punto>();

  for (const s of sedi) {
    if (s.lat === null || s.lon === null) continue;
    const { x, y } = proietta(s.lat, s.lon);
    const esistente = mappa.get(s.citta);

    if (esistente) {
      esistente.nomi.push(s.nome);
      esistente.fondata ||= s.stato === "fondata";
    } else {
      mappa.set(s.citta, {
        citta: s.citta,
        x,
        y,
        fondata: s.stato === "fondata",
        nomi: [s.nome],
      });
    }
  }

  return [...mappa.values()];
}

/** "Pavia (1 ateneo), Milano (3 atenei)" per l'etichetta accessibile. */
function etichetta(punti: Punto[]): string {
  if (punti.length === 0) return "nessuna";
  return punti
    .map((p) =>
      p.nomi.length > 1 ? `${p.citta} (${p.nomi.length} atenei)` : p.citta,
    )
    .join(", ");
}

export default function MappaSedi() {
  const punti = raggruppaPerCitta();
  const fondate = punti.filter((p) => p.fondata).length;

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full max-w-[300px] h-auto"
        role="img"
        aria-label={`Mappa dell'Italia con le città in cui Rethink è presente. Sedi fondate: ${etichetta(
          punti.filter((p) => p.fondata),
        )}. In formazione: ${etichetta(punti.filter((p) => !p.fondata))}.`}
      >
        <path d={ITALIA_PATH} fill="#E0E0E0" stroke="#C9C9C9" strokeWidth={1} />

        {/* I pin sono decorativi: l'elenco leggibile delle sedi è subito
            sotto nella pagina. Niente <title> come tooltip — React 19 lo
            sposta nel <head> anche dentro un SVG, rompendo l'hydration. */}
        <g aria-hidden="true">
          {punti.map((p) => (
            <circle
              key={p.citta}
              cx={p.x}
              cy={p.y}
              r={p.fondata ? 7 : 5}
              fill={p.fondata ? "#FFBF00" : "#FBFBFB"}
              stroke="#1A1814"
              strokeWidth={p.fondata ? 2.5 : 2}
            />
          ))}
        </g>
      </svg>

      <div className="flex gap-6 mt-6 text-xs text-[#4A4A4A]">
        <span className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-[#FFBF00] border-2 border-[#1A1814]" />
          Sedi fondate ({fondate})
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FBFBFB] border-2 border-[#1A1814]" />
          In formazione ({punti.length - fondate})
        </span>
      </div>
    </div>
  );
}
