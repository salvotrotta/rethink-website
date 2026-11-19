import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { OG_BASE, RSS } from "@/lib/metadati";

// Entrambi i font passano da next/font: i file vengono scaricati in fase di
// build e serviti dal nostro dominio. Il browser di chi visita il sito non
// contatta mai i server di Google, quindi nessun indirizzo IP esce verso
// gli Stati Uniti. Non aggiungere <link> verso fonts.googleapis.com.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Rethink – Ripensiamo l’università. Costruiamo il futuro.",
  description:
    "Rethink è una rete nazionale di giovani, studenti e dottorandi, nata negli atenei italiani: confronto tra discipline, divulgazione fondata sui dati, merito e innovazione.",
  referrer: "strict-origin-when-cross-origin",
  // Annuncia il feed degli articoli ai lettori RSS che partono dal sito.
  ...(RSS ? { alternates: { types: RSS } } : {}),
  // Senza metadataBase l'immagine di anteprima resterebbe un percorso
  // relativo: WhatsApp, LinkedIn e gli altri leggono la pagina da fuori e
  // hanno bisogno dell'indirizzo completo, altrimenti non mostrano nulla.
  metadataBase: new URL("https://rethinkuni.it"),
  openGraph: {
    title: "Rethink",
    description: "Ripensiamo l’università. Costruiamo il futuro.",
    ...OG_BASE,
    // L'immagine non si dichiara qui: ci pensa il file
    // src/app/opengraph-image.png (più il suo .alt.txt), da cui Next ricava
    // da solo URL, tipo, larghezza e altezza. Si rigenera da design/og-card.html.
  },
  twitter: {
    // Senza questa riga X mostrerebbe l'anteprima in un quadratino.
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/*
          Statistiche di visita con Umami, installato sulla nostra VPS
          (/opt/umami, pannello su stats.rethinkuni.it). Niente cookie,
          niente dati che escono dal nostro server: lo script e l'invio
          passano da rethinkuni.it/stats, che Caddy gira a Umami.
          - data-domains: conta solo il sito pubblico, non localhost.
          - data-do-not-track: rispetta chi ha attivato "Do Not Track".
          - data-exclude-search: non registra i parametri degli indirizzi.
        */}
        <Script
          src="/stats/script.js"
          data-website-id="66eca9e4-3903-4892-a47d-1313b7066196"
          data-host-url="/stats"
          data-domains="rethinkuni.it,www.rethinkuni.it"
          data-do-not-track="true"
          data-exclude-search="true"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
