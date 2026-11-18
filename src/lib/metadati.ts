import type { Metadata } from "next";

import { SEZIONE_PUBBLICA } from "@/data/sezioni";

/**
 * Metadati di una pagina: titolo, descrizione e anteprima di condivisione
 * (WhatsApp, Telegram, LinkedIn, Slack...).
 *
 * Serve perché Next unisce i metadati dei layout e delle pagine solo al
 * primo livello: una pagina che dichiara `openGraph` sostituisce per intero
 * quello del layout, e una che non lo dichiara eredita titolo e
 * descrizione della home. Senza questa funzione ogni link condiviso
 * mostrerebbe "Rethink" e il claim, qualunque pagina fosse.
 *
 * Lo stesso vale per `alternates`: dichiarare l'indirizzo canonico
 * cancellerebbe il link al feed RSS del layout, quindi lo rimettiamo qui.
 */
export const OG_BASE = {
  type: "website",
  locale: "it_IT",
  siteName: "Rethink",
  // Anche l'immagine va ripetuta: il file src/app/opengraph-image.png vale
  // solo per le pagine che non dichiarano un loro `openGraph`. Gli
  // articoli la sostituiscono con la copertina.
  images: [
    {
      url: "/opengraph-image.png",
      width: 1200,
      height: 630,
      alt: "Il logo Rethink su fondo scuro, con il motto “Ripensiamo l’università. Costruiamo il futuro.” e l'indirizzo rethinkuni.it.",
    },
  ],
};

export const RSS = SEZIONE_PUBBLICA
  ? { "application/rss+xml": [{ url: "/articoli/feed.xml", title: "Rethink – Articoli" }] }
  : undefined;

export function metadatiPagina({
  titolo,
  descrizione,
  percorso,
  titoloCondivisione,
  openGraph,
  ...altro
}: {
  /** Nome della pagina, senza " – Rethink": lo aggiungiamo noi. */
  titolo: string;
  descrizione: string;
  /** Indirizzo della pagina a partire da "/", per canonical e og:url. */
  percorso: string;
  /** Titolo dell'anteprima, se diverso da quello della scheda del browser. */
  titoloCondivisione?: string;
  openGraph?: Metadata["openGraph"];
} & Omit<Metadata, "title" | "description" | "openGraph">): Metadata {
  const titoloCompleto = `${titolo} – Rethink`;
  return {
    title: titoloCompleto,
    description: descrizione,
    alternates: { canonical: percorso, ...(RSS ? { types: RSS } : {}) },
    ...altro,
    openGraph: {
      ...OG_BASE,
      title: titoloCondivisione ?? titoloCompleto,
      description: descrizione,
      url: percorso,
      ...openGraph,
    } as Metadata["openGraph"],
  };
}
