import Link from "next/link";
import { notFound } from "next/navigation";

import sedi from "@/data/sedi.json";
import { AvatarAutore, ElencoArticoli } from "@/components/articoli";
import { SOCIAL } from "@/components/social";
import { autore, autori, articoliDi } from "@/lib/articoli";
import { metadatiPagina } from "@/lib/metadati";

export const dynamicParams = false;

export function generateStaticParams() {
  return autori().map((a) => ({ autore: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ autore: string }>;
}) {
  const a = autore((await params).autore);
  if (!a) return {};
  return metadatiPagina({
    titolo: `${a.nome} – Autori`,
    descrizione: a.bio ?? `Gli articoli di ${a.nome} per Rethink.`,
    percorso: `/autori/${a.slug}`,
    titoloCondivisione: a.nome,
    openGraph: { type: "profile" },
  });
}

export default async function PaginaAutore({
  params,
}: {
  params: Promise<{ autore: string }>;
}) {
  const a = autore((await params).autore);
  if (!a) notFound();

  const sede = a.sede ? sedi.find((s) => s.slug === a.sede && s.pagina) : undefined;
  const social = (["linkedin", "instagram"] as const).filter((k) => a[k]);

  return (
    <>
      <section className="bg-[#1A1814] text-white py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/autori" className="text-gray-400 text-sm hover:text-white transition-colors">
            ← Tutti gli autori
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-8">
            <AvatarAutore autore={a} dimensione={112} />
            <div>
              <p className="text-[#FFBF00] text-sm font-semibold uppercase tracking-widest">
                {a.ospite ? "Autore ospite" : "Autore"}
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mt-2">{a.nome}</h1>
              {(a.ruolo || a.ateneo) && (
                <p className="text-gray-300 mt-2">
                  {[a.ruolo, a.ateneo].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
          </div>

          {a.bio && (
            <p className="text-gray-200 text-lg leading-relaxed mt-8 max-w-2xl">{a.bio}</p>
          )}

          {(social.length > 0 || sede) && (
            <div className="flex flex-wrap gap-3 mt-8">
              {social.map((k) => {
                const { label, Icona } = SOCIAL[k];
                return (
                  <a
                    key={k}
                    href={a[k]!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-gray-500 text-white px-5 py-2.5 rounded-md font-semibold hover:border-white hover:bg-white/5 transition-colors"
                  >
                    <Icona className="w-[18px] h-[18px]" />
                    {label}
                  </a>
                );
              })}
              {sede && (
                <Link
                  href={`/${sede.slug}`}
                  className="flex items-center border border-gray-500 text-white px-5 py-2.5 rounded-md font-semibold hover:border-white hover:bg-white/5 transition-colors"
                >
                  Sede di {sede.citta}
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Articoli</h2>
          <ElencoArticoli
            articoli={articoliDi(a.slug)}
            vuoto="Nessun articolo pubblicato, per ora."
          />
        </div>
      </section>
    </>
  );
}
