import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

import autoriJson from "@/data/autori.json";
import { categoria } from "@/data/categorie";

/**
 * Articoli e autori del sito.
 *
 * Ogni articolo è un file Markdown in content/articoli/<slug>.md: il nome
 * del file è l'indirizzo (rethinkuni.it/articoli/<slug>). In cima al file,
 * tra due righe "---", ci sono i dati dell'articolo (vedi content/README.md);
 * sotto, il testo. Le note a piè di pagina si scrivono come [^1].
 *
 * Tutto si legge in fase di build: le pagine escono statiche e il server
 * non tocca mai questi file a sito avviato.
 *
 * Un articolo o un autore con "bozza: true" si vede solo in sviluppo
 * (npm run dev), mai sul sito pubblicato: serve per impaginare un testo
 * prima di darlo al nazionale per l'approvazione.
 */

const CARTELLA = path.join(process.cwd(), "content", "articoli");
const MOSTRA_BOZZE = process.env.NODE_ENV !== "production";

export type Autore = {
  slug: string;
  nome: string;
  ruolo: string;
  ospite: boolean;
  sede: string | null;
  ateneo: string | null;
  foto: string | null;
  bio: string;
  linkedin: string | null;
  instagram: string | null;
  bozza?: boolean;
};

export type Articolo = {
  slug: string;
  titolo: string;
  sottotitolo: string | null;
  /** AAAA-MM-GG */
  data: string;
  autori: Autore[];
  categoria: { slug: string; nome: string };
  /** Slug della sede, o null per un articolo del nazionale. */
  sede: string | null;
  copertina: string;
  copertinaAlt: string;
  copertinaCredito: string | null;
  avvertenza: boolean;
  minutiLettura: number;
  html: string;
  bozza: boolean;
};

export const AVVERTENZA =
  "Le opinioni espresse in questo articolo sono dell'autore e non rappresentano necessariamente la posizione di Rethink.";

const tuttiGliAutori = (autoriJson as Autore[]).filter(
  (a) => MOSTRA_BOZZE || !a.bozza,
);

export function autori(): Autore[] {
  return tuttiGliAutori;
}

export function autore(slug: string): Autore | undefined {
  return tuttiGliAutori.find((a) => a.slug === slug);
}

const markdown = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, {
    footnoteLabel: "Note e fonti",
    footnoteBackLabel: "Torna al testo",
    // Di serie il titolo delle note è nascosto ai vedenti (sr-only): lo
    // vogliamo visibile, separa il testo dalle fonti.
    footnoteLabelProperties: {},
  })
  .use(rehypeStringify);

function testo(v: unknown, campo: string, file: string): string {
  if (typeof v !== "string" || !v.trim()) {
    throw new Error(`${file}: manca "${campo}"`);
  }
  return v.trim();
}

// YAML legge 2026-11-20 come data, "2026-11-20" come testo: accettiamo
// entrambi e teniamo sempre la forma AAAA-MM-GG.
function dataIso(v: unknown, file: string): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  throw new Error(`${file}: "data" deve essere nella forma AAAA-MM-GG`);
}

function leggi(nomeFile: string): Articolo {
  const slug = nomeFile.replace(/\.md$/, "");
  const grezzo = fs.readFileSync(path.join(CARTELLA, nomeFile), "utf8");
  const { data: d, content } = matter(grezzo);

  // Un errore qui ferma la build: meglio che pubblicare un articolo con
  // l'autore sbagliato o senza copertina.
  const slugAutori: unknown = d.autori;
  if (!Array.isArray(slugAutori) || slugAutori.length === 0) {
    throw new Error(`${nomeFile}: "autori" deve elencare almeno un autore`);
  }
  const listaAutori = slugAutori.map((s) => {
    const a = (autoriJson as Autore[]).find((x) => x.slug === s);
    if (!a) throw new Error(`${nomeFile}: autore "${s}" non trovato in src/data/autori.json`);
    return a;
  });

  const cat = categoria(testo(d.categoria, "categoria", nomeFile));
  if (!cat) throw new Error(`${nomeFile}: categoria "${d.categoria}" non prevista in src/data/categorie.ts`);

  const parole = content.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    titolo: testo(d.titolo, "titolo", nomeFile),
    sottotitolo: typeof d.sottotitolo === "string" ? d.sottotitolo.trim() : null,
    data: dataIso(d.data, nomeFile),
    autori: listaAutori,
    categoria: { slug: cat.slug, nome: cat.nome },
    sede: typeof d.sede === "string" ? d.sede : null,
    copertina: testo(d.copertina, "copertina", nomeFile),
    copertinaAlt: testo(d.copertinaAlt, "copertinaAlt", nomeFile),
    copertinaCredito: typeof d.copertinaCredito === "string" ? d.copertinaCredito : null,
    avvertenza: d.avvertenza === true,
    // 200 parole al minuto, arrotondato per eccesso: chi legge un
    // articolo con note e fonti va più piano di un post.
    minutiLettura: Math.max(1, Math.ceil(parole / 200)),
    html: String(markdown.processSync(content)),
    bozza: d.bozza === true,
  };
}

let cache: Articolo[] | null = null;

/** Tutti gli articoli pubblicabili, dal più recente. */
export function articoli(): Articolo[] {
  if (!cache) {
    const file = fs.existsSync(CARTELLA)
      ? fs.readdirSync(CARTELLA).filter((f) => f.endsWith(".md"))
      : [];
    cache = file
      .map(leggi)
      .filter((a) => MOSTRA_BOZZE || !a.bozza)
      .sort((a, b) => b.data.localeCompare(a.data));
  }
  return cache;
}

export function articolo(slug: string): Articolo | undefined {
  return articoli().find((a) => a.slug === slug);
}

export function articoliDi(slugAutore: string): Articolo[] {
  return articoli().filter((a) => a.autori.some((x) => x.slug === slugAutore));
}

/** "13 novembre 2026" */
export function dataEstesa(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Rome",
  });
}

/** "Giulia Rossi", "Giulia Rossi e Marco Bianchi", "A, B e C" */
export function nomiAutori(lista: { nome: string }[]): string {
  const nomi = lista.map((a) => a.nome);
  if (nomi.length <= 1) return nomi.join("");
  return `${nomi.slice(0, -1).join(", ")} e ${nomi[nomi.length - 1]}`;
}
