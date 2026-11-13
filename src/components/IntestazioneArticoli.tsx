import Link from "next/link";

import { CATEGORIE } from "@/data/categorie";

/**
 * Testata nera comune a /articoli e alle pagine di categoria, con i
 * filtri per categoria. `attiva` è lo slug della categoria aperta, o
 * null per "Tutti".
 */
export default function IntestazioneArticoli({
  titolo,
  sopratitolo,
  attiva,
}: {
  titolo: string;
  sopratitolo: string;
  attiva: string | null;
}) {
  const filtro = (attivo: boolean) =>
    attivo
      ? "bg-[#FFBF00] text-[#1A1814] border-[#FFBF00]"
      : "border-gray-500 text-gray-200 hover:border-white hover:text-white";

  return (
    <section className="bg-[#1A1814] text-white pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#FFBF00] text-sm font-semibold uppercase tracking-widest mb-4">
          {sopratitolo}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">{titolo}</h1>

        <nav aria-label="Categorie" className="flex flex-wrap gap-2 mt-8">
          <Link
            href="/articoli"
            aria-current={attiva === null ? "page" : undefined}
            className={`border rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${filtro(attiva === null)}`}
          >
            Tutti
          </Link>
          {CATEGORIE.map((c) => (
            <Link
              key={c.slug}
              href={`/articoli/categoria/${c.slug}`}
              aria-current={attiva === c.slug ? "page" : undefined}
              className={`border rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${filtro(attiva === c.slug)}`}
            >
              {c.nome}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
