import sedi from "@/data/sedi.json";
import { SOCIAL, SOCIAL_ORDINE } from "@/components/social";

type Sede = (typeof sedi)[number];

/**
 * Recapiti di una sede: email cliccabile e icone dei social presenti.
 * Usato in home, elenco sedi e ovunque serva la stessa scheda, così le
 * tre viste non divergono quando si aggiunge un canale.
 */
export default function RecapitiSede({ sede }: { sede: Sede }) {
  const social = SOCIAL_ORDINE.filter((chiave) => sede[chiave]);
  if (!sede.email && social.length === 0) return null;

  return (
    <div className="space-y-1.5">
      {sede.email && (
        <a
          href={`mailto:${sede.email}`}
          className="block text-[#1A1814] text-xs font-semibold hover:underline break-all"
        >
          {sede.email}
        </a>
      )}

      {social.length > 0 && (
        <div className="flex gap-2.5">
          {social.map((chiave) => {
            const { label, Icona } = SOCIAL[chiave];
            return (
              <a
                key={chiave}
                href={sede[chiave]!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} di Rethink ${sede.citta}`}
                className="text-[#4A4A4A] hover:text-[#1A1814] transition-colors"
              >
                <Icona className="w-[17px] h-[17px]" />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
