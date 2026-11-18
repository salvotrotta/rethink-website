import Link from "next/link";

import { AvatarAutore } from "@/components/articoli";
import { autori, articoliDi } from "@/lib/articoli";
import { metadatiPagina } from "@/lib/metadati";

export const metadata = metadatiPagina({
  titolo: "Autori",
  descrizione:
    "Studenti, ricercatori e ospiti che scrivono per Rethink.",
  percorso: "/autori",
});

export default function Autori() {
  // Prima chi ha scritto di più, poi in ordine alfabetico.
  const elenco = autori()
    .map((a) => ({ ...a, quanti: articoliDi(a.slug).length }))
    .sort((x, y) => y.quanti - x.quanti || x.nome.localeCompare(y.nome, "it"));

  return (
    <>
      <section className="bg-[#1A1814] text-white py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#FFBF00] text-sm font-semibold uppercase tracking-widest mb-4">
            Autori
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">Chi scrive per Rethink</h1>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {elenco.map((a) => (
            <Link
              key={a.slug}
              href={`/autori/${a.slug}`}
              className="flex gap-4 bg-white border border-[#E0E0E0] hover:border-[#1A1814] rounded-lg p-6 transition-colors"
            >
              <AvatarAutore autore={a} dimensione={64} />
              <div>
                <p className="font-bold text-lg text-[#1A1814]">{a.nome}</p>
                {(a.ruolo || a.ospite) && (
                  <p className="text-sm text-[#6B6B6B]">
                    {[a.ruolo, a.ospite && "Ospite"].filter(Boolean).join(" · ")}
                  </p>
                )}
                <p className="text-sm text-[#2F49B9] font-semibold mt-2">
                  {a.quanti === 1 ? "1 articolo" : `${a.quanti} articoli`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
