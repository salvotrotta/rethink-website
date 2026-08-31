import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  title: "Rethink – Pensare con rigore. Costruire con coraggio.",
  description:
    "Rethink è un'associazione apartitica di studenti e ricercatori che promuove il pensiero critico, il merito e l'innovazione nelle università italiane.",
  referrer: "strict-origin-when-cross-origin",
  openGraph: {
    title: "Rethink",
    description: "Pensare con rigore. Costruire con coraggio.",
    type: "website",
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
      </body>
    </html>
  );
}
