import fs from "node:fs";
import path from "node:path";
import Link from "next/link";

import { htmlDaMarkdown } from "@/lib/articoli";
import { metadatiPagina } from "@/lib/metadati";

export const metadata = metadatiPagina({
  titolo: "Manifesto",
  descrizione:
    "Perché l’università italiana si è fermata e cosa fa Rethink per cambiarla dal basso: il manifesto, con i dati e le fonti.",
  percorso: "/manifesto",
});

// Il testo vive in content/manifesto.md, con le note sulle fonti in fondo
// ([^nome]): si modifica lì, come un articolo. Viene letto in fase di build.
const corpo = htmlDaMarkdown(
  fs.readFileSync(path.join(process.cwd(), "content", "manifesto.md"), "utf8"),
);

export default function Manifesto() {
  return (
    <>
      <section className="bg-[#1A1814] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#FFBF00] text-sm font-semibold uppercase tracking-widest mb-4">Manifesto</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Ripensiamo l&rsquo;università.<br />Costruiamo il futuro.
          </h1>
          <p className="text-gray-400 text-sm mt-4">Rethink · novembre 2026</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="articolo-corpo max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: corpo }} />
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#1A1814] text-white text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Questo spazio è anche tuo
        </h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Rethink prende la forma di chi decide di costruirla.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/unisciti" className="bg-[#FFBF00] text-[#1A1814] px-6 py-3 rounded-md font-bold hover:bg-[#E6AC00] transition-colors">
            Unisciti a Rethink
          </Link>
          <Link href="/chi-siamo" className="border border-gray-500 text-white px-6 py-3 rounded-md font-semibold hover:border-white transition-colors">
            Missione, visione e valori
          </Link>
        </div>
      </section>
    </>
  );
}
