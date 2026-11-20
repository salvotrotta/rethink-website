import sedi from "@/data/sedi.json";

/**
 * Eventi Rethink presi da Luma: il calendario nazionale
 * (luma.com/rethink_uni) più il calendario di ogni sede che ha il campo
 * "luma" in sedi.json. Così un evento compare sul sito sia se la sede lo
 * condivide col nazionale (co-organizzatore o trasferimento), sia se sta
 * solo sul calendario della sede. Gli eventi presenti in più calendari
 * compaiono una volta sola. Non serve nessuna chiave: usiamo i dati
 * pubblici delle pagine dei calendari.
 *
 * Privacy: la richiesta a Luma la fa il server quando rigenera la pagina,
 * mai il browser di chi visita. Anche le copertine passano dal nostro
 * server (next/image), quindi aprire il sito non contatta luma.com finché
 * il visitatore non clicca un evento.
 *
 * Fonti:
 * 1. api.lu.ma/calendar/get-items: lo stesso elenco che mostra la pagina
 *    pubblica, con copertina e organizzatori. Non è un'API documentata,
 *    quindi la leggiamo con cautela.
 * 2. Per il solo calendario nazionale, il feed iCal pubblico: stabile, ma
 *    senza copertine né sede organizzatrice. Entra in gioco se la prima
 *    fonte non risponde.
 * Un calendario che non risponde viene saltato: gli altri si vedono lo
 * stesso. Se non risponde nessuno la sezione resta vuota e rimanda a Luma.
 */

export const LUMA_NAZIONALE = "https://luma.com/rethink_uni";
// ID del calendario rethink_uni. Per ritrovarlo: nel sorgente di
// luma.com/rethink_uni è il campo "api_id" dentro "calendar". Attenzione,
// nella pagina possono comparire ID di altri calendari.
const CALENDARIO_ID = "cal-e6QIyLopn8sYDco";
const SLUG_NAZIONALE = "rethink_uni";

/**
 * Ogni quanto (secondi) il sito rilegge il calendario. Pagina e richiesta
 * a Luma hanno ciascuna la sua cache, quindi nel caso peggiore un evento
 * nuovo compare dopo circa il doppio: 15 minuti qui ≈ mezz'ora sul sito.
 * Le pagine che mostrano eventi ripetono questo valore in `revalidate`
 * (Next vuole un numero scritto lì, non una costante importata).
 */
export const AGGIORNAMENTO = 900;

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
  hosts?: { name?: string; username?: string | null }[];
};

async function vociLuma(
  calendario: string,
  periodo: "future" | "past",
  limite: number,
): Promise<VoceLuma[]> {
  const url =
    `https://api.lu.ma/calendar/get-items?calendar_api_id=${calendario}` +
    `&period=${periodo}&pagination_limit=${limite}`;
  const res = await fetch(url, { headers: INTESTAZIONI, next: { revalidate: AGGIORNAMENTO } });
  if (!res.ok) throw new Error(`Luma ${calendario} ${periodo}: HTTP ${res.status}`);
  const dati = await res.json();
  // Quando Luma limita le richieste risponde con un messaggio senza "entries".
  if (!Array.isArray(dati?.entries)) throw new Error(`Luma ${calendario} ${periodo}: risposta inattesa`);
  return dati.entries;
}

/**
 * ID del calendario Luma a partire dall'indirizzo (luma.com/rethink_unipv →
 * cal-...). Non cambia mai, quindi lo teniamo in cache per un giorno.
 */
async function idCalendario(slug: string): Promise<string> {
  const res = await fetch(`https://api.lu.ma/url?url=${encodeURIComponent(slug)}`, {
    headers: INTESTAZIONI,
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`Luma ${slug}: HTTP ${res.status}`);
  const dati = await res.json();
  const id = dati?.kind === "calendar" ? dati.data?.calendar?.api_id : null;
  if (typeof id !== "string") throw new Error(`Luma ${slug}: non è un calendario`);
  return id;
}

/**
 * @param sedeCalendario slug della sede se la voce viene dal calendario di
 *   quella sede: allora l'evento è suo, chiunque siano gli host.
 */
function daVoce(v: VoceLuma, sedeCalendario: string | null = null): Evento | null {
  const e = v.event;
  if (!e?.name || !e.start_at || !e.url) return null;

  const online = e.location_type === "online" || e.location_type === "zoom";
  const luogo = online
    ? "Online"
    : e.geo_address_info?.city ?? e.geo_address_info?.city_state?.split(",")[0] ?? null;

  // Chi organizza. La sede si riconosce, in quest'ordine: dal calendario
  // da cui stiamo leggendo; dal calendario proprietario dell'evento (se il
  // nazionale è solo co-organizzatore); dagli host (se l'evento è stato
  // trasferito sul nazionale, la sede resta tra gli host, es. "Rethink
  // UniPv" con username rethink_unipv). Per il nome usiamo l'host, che è
  // più pulito del nome del calendario ("Eventi Rethink UniPv").
  const slugCal = v.calendar?.slug?.toLowerCase() ?? null;
  const calSede = slugCal && slugCal !== SLUG_NAZIONALE ? slugCal : null;
  const host = v.hosts?.find(
    (h) => h.name && h.username && h.username.toLowerCase() !== SLUG_NAZIONALE,
  );
  const sede =
    sedeCalendario ??
    (calSede && SEDE_DA_LUMA.get(calSede)) ??
    (host?.username && SEDE_DA_LUMA.get(host.username.toLowerCase())) ??
    null;
  const nomeOrg = host?.name ?? (calSede ? v.calendar?.name : null) ?? null;
  const organizzatore = nomeOrg ? { nome: nomeOrg, sede } : null;

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

const finito = (e: Evento) => new Date(e.fine ?? e.inizio).getTime() < Date.now();
const pulisci = (voci: VoceLuma[], sede: string | null = null) =>
  voci.map((v) => daVoce(v, sede)).filter((e): e is Evento => e !== null);

async function eventiIcal(): Promise<Eventi> {
  const res = await fetch(`https://api.lu.ma/ics/get?entity=calendar&id=${CALENDARIO_ID}`, {
    headers: INTESTAZIONI,
    next: { revalidate: AGGIORNAMENTO },
  });
  if (!res.ok) throw new Error(`Luma iCal: HTTP ${res.status}`);
  const tutti = eventiDaIcal(await res.text());
  return { prossimi: tutti.filter((e) => !finito(e)), passati: tutti.filter(finito) };
}

// ---------------------------------------------------------------------------

async function eventiNazionali(): Promise<Eventi> {
  try {
    const [futuri, passati] = await Promise.all([
      vociLuma(CALENDARIO_ID, "future", 50),
      vociLuma(CALENDARIO_ID, "past", 12),
    ]);
    return { prossimi: pulisci(futuri), passati: pulisci(passati) };
  } catch (errore) {
    console.warn("[eventi] elenco Luma nazionale non disponibile, provo il feed iCal:", errore);
  }
  try {
    return await eventiIcal();
  } catch (errore) {
    console.warn("[eventi] anche il feed iCal nazionale non è disponibile:", errore);
    return { prossimi: [], passati: [] };
  }
}

async function eventiSede(slugLuma: string, sede: string): Promise<Eventi> {
  try {
    const id = await idCalendario(slugLuma);
    const [futuri, passati] = await Promise.all([
      vociLuma(id, "future", 50),
      vociLuma(id, "past", 12),
    ]);
    return { prossimi: pulisci(futuri, sede), passati: pulisci(passati, sede) };
  } catch (errore) {
    console.warn(`[eventi] calendario Luma di ${sede} non disponibile:`, errore);
    return { prossimi: [], passati: [] };
  }
}

/** Unisce gli elenchi togliendo i doppioni (stesso evento in più calendari). */
function unisci(elenchi: Evento[][]): Evento[] {
  const perId = new Map<string, Evento>();
  for (const e of elenchi.flat()) {
    const gia = perId.get(e.id);
    // Tra due copie teniamo quella che sa a quale sede appartiene.
    if (!gia || (!gia.organizzatore?.sede && e.organizzatore?.sede)) perId.set(e.id, e);
  }
  return [...perId.values()];
}

/**
 * Prossimi eventi (dal più vicino) e passati (dal più recente), da tutti i
 * calendari. Non lancia mai: in caso di problemi restituisce elenchi
 * vuoti, perché un calendario irraggiungibile non deve rompere la pagina
 * né la build.
 */
export async function eventiLuma(): Promise<Eventi> {
  const risultati = await Promise.all([
    eventiNazionali(),
    ...[...SEDE_DA_LUMA].map(([slugLuma, sede]) => eventiSede(slugLuma, sede)),
  ]);
  // Un evento appena finito può essere ancora tra i "future" di Luma per
  // qualche minuto: lo spostiamo noi tra i passati.
  const tutti = unisci(risultati.flatMap((r) => [r.prossimi, r.passati]));
  return {
    prossimi: tutti.filter((e) => !finito(e)).sort((a, b) => a.inizio.localeCompare(b.inizio)),
    passati: tutti.filter(finito).sort((a, b) => b.inizio.localeCompare(a.inizio)),
  };
}
