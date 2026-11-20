import sedi from "@/data/sedi.json";

/**
 * Eventi del calendario Luma nazionale (luma.com/rethink_uni).
 *
 * Le sedi creano l'evento sul proprio Luma e aggiungono il calendario
 * nazionale come co-organizzatore: così l'evento compare anche lì, e da lì
 * lo leggiamo noi. Non serve nessuna chiave: usiamo i dati pubblici della
 * pagina del calendario.
 *
 * Privacy: la richiesta a Luma la fa il server quando rigenera la pagina,
 * mai il browser di chi visita. Anche le copertine passano dal nostro
 * server (next/image), quindi aprire il sito non contatta luma.com finché
 * il visitatore non clicca un evento.
 *
 * Fonti, in ordine:
 * 1. api.lu.ma/calendar/get-items: lo stesso elenco che mostra la pagina
 *    pubblica, con copertina e calendario della sede che organizza. Non è
 *    un'API documentata, quindi la leggiamo con cautela.
 * 2. Il feed iCal pubblico del calendario: stabile, ma senza copertine né
 *    sede organizzatrice. Entra in gioco se la prima fonte non risponde.
 * Se falliscono entrambe la sezione resta vuota e rimanda a Luma.
 */

export const LUMA_NAZIONALE = "https://luma.com/rethink_uni";
const CALENDARIO_ID = "cal-fk0tCH7DnaGXSnP";
const SLUG_NAZIONALE = "rethink_uni";

/** Ogni quanto (secondi) il sito rilegge il calendario. */
export const AGGIORNAMENTO = 1800;

const INTESTAZIONI = { "User-Agent": "rethinkuni.it (sito Rethink)" };

export type Evento = {
  id: string;
  titolo: string;
  /** ISO 8601 */
  inizio: string;
  fine: string | null;
  fuso: string;
  url: string;
  copertina: string | null;
  /** Città o "Online"; null se Luma non la dice. */
  luogo: string | null;
  /** Chi lo organizza, se non è il nazionale. */
  organizzatore: { nome: string; sede: string | null } | null;
};

export type Eventi = { prossimi: Evento[]; passati: Evento[] };

// Slug Luma della sede (luma.com/rethink_unipv → rethink_unipv) → slug
// della pagina sul sito, per collegare l'evento alla sua sede.
const SEDE_DA_LUMA = new Map(
  sedi.flatMap((s) => {
    const slug = s.luma?.replace(/\/+$/, "").split("/").pop();
    return slug ? [[slug.toLowerCase(), s.slug] as const] : [];
  }),
);

// --- Fonte 1: elenco della pagina pubblica ---------------------------------

type VoceLuma = {
  api_id?: string;
  event?: {
    api_id?: string;
    name?: string;
    start_at?: string;
    end_at?: string | null;
    timezone?: string;
    url?: string;
    cover_url?: string | null;
    location_type?: string;
    geo_address_info?: { city?: string; city_state?: string } | null;
  };
  calendar?: { name?: string; slug?: string | null } | null;
};

async function vociLuma(periodo: "future" | "past", limite: number): Promise<VoceLuma[]> {
  const url =
    `https://api.lu.ma/calendar/get-items?calendar_api_id=${CALENDARIO_ID}` +
    `&period=${periodo}&pagination_limit=${limite}`;
  const res = await fetch(url, { headers: INTESTAZIONI, next: { revalidate: AGGIORNAMENTO } });
  if (!res.ok) throw new Error(`Luma ${periodo}: HTTP ${res.status}`);
  const dati = await res.json();
  // Quando Luma limita le richieste risponde con un messaggio senza "entries".
  if (!Array.isArray(dati?.entries)) throw new Error(`Luma ${periodo}: risposta inattesa`);
  return dati.entries;
}

function daVoce(v: VoceLuma): Evento | null {
  const e = v.event;
  if (!e?.name || !e.start_at || !e.url) return null;

  const online = e.location_type === "online" || e.location_type === "zoom";
  const luogo = online
    ? "Online"
    : e.geo_address_info?.city ?? e.geo_address_info?.city_state?.split(",")[0] ?? null;

  const slugCal = v.calendar?.slug?.toLowerCase() ?? null;
  const organizzatore =
    v.calendar?.name && slugCal !== SLUG_NAZIONALE
      ? { nome: v.calendar.name, sede: (slugCal && SEDE_DA_LUMA.get(slugCal)) || null }
      : null;

  return {
    id: e.api_id ?? v.api_id ?? e.url,
    titolo: e.name,
    inizio: e.start_at,
    fine: e.end_at ?? null,
    fuso: e.timezone || "Europe/Rome",
    url: e.url.startsWith("http") ? e.url : `https://luma.com/${e.url}`,
    copertina: e.cover_url || null,
    luogo,
    organizzatore,
  };
}

// --- Fonte 2: feed iCal ----------------------------------------------------

/** Data iCal (20261120T180000Z o 20261120) → ISO 8601. */
function dataIcal(valore: string): string | null {
  const m = valore.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z?))?$/);
  if (!m) return null;
  const [, a, me, g, o = "00", mi = "00", s = "00", z] = m;
  return `${a}-${me}-${g}T${o}:${mi}:${s}${z ? "Z" : ""}`;
}

function testoIcal(valore: string): string {
  return valore.replace(/\\n/gi, "\n").replace(/\\([,;\\])/g, "$1");
}

export function eventiDaIcal(ics: string): Evento[] {
  // Le righe lunghe continuano sulla successiva, che inizia con uno spazio.
  const righe = ics.replace(/\r?\n[ \t]/g, "").split(/\r?\n/);
  const eventi: Evento[] = [];
  let campi: Record<string, string> | null = null;

  for (const riga of righe) {
    if (riga === "BEGIN:VEVENT") campi = {};
    else if (riga === "END:VEVENT" && campi) {
      const inizio = campi.DTSTART && dataIcal(campi.DTSTART);
      const descrizione = testoIcal(campi.DESCRIPTION ?? "");
      const url =
        campi.URL ?? descrizione.match(/https:\/\/(?:luma\.com|lu\.ma)\/[\w-]+/)?.[0];
      if (campi.SUMMARY && inizio && url) {
        const luogo = testoIcal(campi.LOCATION ?? "");
        eventi.push({
          id: campi.UID ?? url,
          titolo: testoIcal(campi.SUMMARY),
          inizio,
          fine: (campi.DTEND && dataIcal(campi.DTEND)) || null,
          fuso: "Europe/Rome",
          url,
          copertina: null,
          // Il feed mette nel luogo l'indirizzo completo o il link della
          // diretta: non lo mostriamo per intero.
          luogo: !luogo ? null : /^https?:/.test(luogo) ? "Online" : null,
          organizzatore: null,
        });
      }
      campi = null;
    } else if (campi) {
      const i = riga.indexOf(":");
      if (i > 0) campi[riga.slice(0, i).split(";")[0]] = riga.slice(i + 1);
    }
  }
  return eventi;
}

async function eventiIcal(): Promise<Eventi> {
  const res = await fetch(`https://api.lu.ma/ics/get?entity=calendar&id=${CALENDARIO_ID}`, {
    headers: INTESTAZIONI,
    next: { revalidate: AGGIORNAMENTO },
  });
  if (!res.ok) throw new Error(`Luma iCal: HTTP ${res.status}`);
  const tutti = eventiDaIcal(await res.text());
  const ora = Date.now();
  const finito = (e: Evento) => new Date(e.fine ?? e.inizio).getTime() < ora;
  return {
    prossimi: tutti.filter((e) => !finito(e)).sort((a, b) => a.inizio.localeCompare(b.inizio)),
    passati: tutti.filter(finito).sort((a, b) => b.inizio.localeCompare(a.inizio)),
  };
}

// ---------------------------------------------------------------------------

/**
 * Prossimi eventi (dal più vicino) e passati (dal più recente).
 * Non lancia mai: in caso di problemi restituisce elenchi vuoti, perché un
 * calendario irraggiungibile non deve rompere la pagina né la build.
 */
export async function eventiLuma(): Promise<Eventi> {
  try {
    const [futuri, passati] = await Promise.all([vociLuma("future", 50), vociLuma("past", 12)]);
    const pulisci = (v: VoceLuma[]) => v.map(daVoce).filter((e): e is Evento => e !== null);
    return { prossimi: pulisci(futuri), passati: pulisci(passati) };
  } catch (errore) {
    console.warn("[eventi] elenco Luma non disponibile, provo il feed iCal:", errore);
  }
  try {
    return await eventiIcal();
  } catch (errore) {
    console.warn("[eventi] anche il feed iCal non è disponibile:", errore);
    return { prossimi: [], passati: [] };
  }
}
