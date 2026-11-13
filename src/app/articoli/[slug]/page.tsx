import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import sedi from "@/data/sedi.json";
import { AvatarAutore, MetaArticolo, SchedaArticolo } from "@/components/articoli";
import {
  AVVERTENZA,
  articoli,
  articolo,
  dataEstesa,
  nomiAutori,
} from "@/lib/articoli";

export const dynamicParams = false;

export function generateStaticParams() {
  return articoli().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const a = articolo((await params).slug);
  if (!a) return {};

  const descrizione = a.sottotitolo ?? `Un articolo di ${nomiAutori(a.autori)} per Rethink.`;
  return {
    title: `${a.titolo} – Rethink`,
    description: descrizione,
    authors: a.autori.map((x) => ({ name: x.nome, url: `/autori/${x.slug}` })),
    alternates: { canonical: `/articoli/${a.slug}` },
    // La copertina fa anche da anteprima quando si condivide il link.
    openGraph: {
      type: "article",
      title: a.titolo,
      description: descrizione,
      publishedTime: a.data,
      authors: a.autori.map((x) => x.nome),
      section: a.categoria.nome,
      images: [{ url: a.copertina, alt: a.copertinaAlt }],
    },
  };
}

export default async function PaginaArticolo({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const a = articolo((await params).slug);
  if (!a) notFound();

  const sede = a.sede ? sedi.find((s) => s.slug === a.sede && s.pagina) : undefined;
  const correlati = articoli()
    .filter((x) => x.slug !== a.slug && x.categoria.slug === a.categoria.slug)
    .slice(0, 3);

  // Dati strutturati per i motori di ricerca (schema.org/Article).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titolo,
    description: a.sottotitolo ?? undefined,
    datePublished: a.data,
    image: [`https://rethinkuni.it${a.copertina}`],
    author: a.autori.map((x) => ({
      "@type": "Person",
      name: x.nome,
      url: `https://rethinkuni.it/autori/${x.slug}`,
    })),
    publisher: { "@type": "Organization", name: "Rethink", url: "https://rethinkuni.it" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <article>
        <header className="bg-white pt-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <Link href="/articoli" className="text-sm text-[#6B6B6B] hover:text-[#1A1814]">
              ← Tutti gli articoli
            </Link>
            <div className="mt-8">
              <MetaArticolo articolo={a} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-[#1A1814] mt-4">
              {a.titolo}
            </h1>
            {a.sottotitolo && (
              <p className="text-xl text-[#4A4A4A] leading-relaxed mt-5">{a.sottotitolo}</p>
            )}

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8">
              {a.autori.map((x) => (
                <Link
                  key={x.slug}
                  href={`/autori/${x.slug}`}
                  className="flex items-center gap-3 group"
                >
                  <AvatarAutore autore={x} dimensione={44} />
                  <span>
                    <span className="block font-semibold text-[#1A1814] group-hover:underline">
                      {x.nome}
                    </span>
                    <span className="block text-sm text-[#6B6B6B]">{x.ruolo}</span>
                  </span>
                </Link>
              ))}
              {sede && (
                <Link
                  href={`/${sede.slug}`}
                  className="text-sm font-semibold text-[#2F49B9] hover:underline"
                >
                  Sede di {sede.citta}
                </Link>
              )}
            </div>
            {a.bozza && (
              <p className="mt-6 inline-block bg-[#FDECEC] text-[#8A1C1C] text-sm font-bold px-3 py-1 rounded">
                Bozza: visibile solo in sviluppo, non sul sito pubblicato
              </p>
            )}
          </div>
        </header>

        <figure className="bg-white px-4 sm:px-6 pt-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[16/9] bg-[#EBEBEB] rounded-lg overflow-hidden">
              <Image
                src={a.copertina}
                alt={a.copertinaAlt}
                fill
                priority
                sizes="(min-width: 896px) 896px, 100vw"
                className="object-cover"
              />
            </div>
            {a.copertinaCredito && (
              <figcaption className="text-xs text-[#6B6B6B] mt-2">{a.copertinaCredito}</figcaption>
            )}
          </div>
        </figure>

        <div className="bg-white px-4 sm:px-6 pt-10 pb-16">
          <div
            className="articolo-corpo max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: a.html }}
          />

          {a.avvertenza && (
            <p className="max-w-3xl mx-auto mt-10 text-sm italic text-[#6B6B6B] border-l-4 border-[#E0E0E0] pl-4">
              {AVVERTENZA}
            </p>
          )}
        </div>

        {/* AUTORI */}
        <section className="bg-[#F9F9F7] px-4 sm:px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-6">
              {a.autori.length > 1 ? "Gli autori" : "L'autore"}
            </h2>
            <div className="space-y-6">
              {a.autori.map((x) => (
                <div key={x.slug} className="flex gap-4">
                  <AvatarAutore autore={x} dimensione={64} />
                  <div>
                    <Link
                      href={`/autori/${x.slug}`}
                      className="font-bold text-[#1A1814] hover:underline"
                    >
                      {x.nome}
                    </Link>
                    <p className="text-sm text-[#6B6B6B]">
                      {x.ruolo}
                      {x.ospite && " · Autore ospite"}
                    </p>
                    <p className="text-[#4A4A4A] leading-relaxed mt-2">{x.bio}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#6B6B6B] mt-8">
              Pubblicato il <time dateTime={a.data}>{dataEstesa(a.data)}</time>
            </p>
          </div>
        </section>
      </article>

      {correlati.length > 0 && (
        <section className="px-4 sm:px-6 py-14 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Altri articoli su {a.categoria.nome.toLowerCase()}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {correlati.map((x) => (
                <SchedaArticolo key={x.slug} articolo={x} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
