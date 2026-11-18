import { notFound } from "next/navigation";

import IntestazioneArticoli from "@/components/IntestazioneArticoli";
import { ElencoArticoli } from "@/components/articoli";
import { CATEGORIE, categoria } from "@/data/categorie";
import { articoli } from "@/lib/articoli";
import { metadatiPagina } from "@/lib/metadati";

export const dynamicParams = false;

// Tutte le categorie hanno la loro pagina, anche se ancora vuote: i
// filtri in testata ci puntano sempre.
export function generateStaticParams() {
  return CATEGORIE.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const c = categoria((await params).categoria);
  if (!c) return {};
  return metadatiPagina({
    titolo: `${c.nome} – Articoli`,
    descrizione: `Gli articoli di Rethink sul tema ${c.nome.toLowerCase()}.`,
    percorso: `/articoli/categoria/${c.slug}`,
  });
}

export default async function Categoria({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const c = categoria((await params).categoria);
  if (!c) notFound();

  return (
    <>
      <IntestazioneArticoli sopratitolo="Articoli" titolo={c.nome} attiva={c.slug} />
      <section className="py-14 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-6xl mx-auto">
          <ElencoArticoli
            articoli={articoli().filter((a) => a.categoria.slug === c.slug)}
            vuoto="Non ci sono ancora articoli in questa categoria."
          />
        </div>
      </section>
    </>
  );
}
