import Link from "next/link";
import { notFound } from "next/navigation";

import sedi from "@/data/sedi.json";
import { SOCIAL, SOCIAL_ORDINE, SOCIAL_NAZIONALE } from "@/components/social";

const fondate = sedi.filter((s) => s.stato === "fondata");

// Solo le sedi fondate hanno una pagina: qualsiasi altro slug dà 404
// invece di essere generato al volo.
export const dynamicParams = false;

export function generateStaticParams() {
  return fondate.map((s) => ({ sede: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sede: string }>;
}) {
  const { sede } = await params;
  const s = fondate.find((x) => x.slug === sede);
  if (!s) return {};

  return {
    title: `${s.nome} – Rethink`,
    description: `La sede Rethink presso ${s.nome}, a ${s.citta}. Come seguirla e come partecipare alle attività.`,
  };
}

export default async function SedePage({
  params,
}: {
  params: Promise<{ sede: string }>;
}) {
  const { sede } = await params;
  const s = fondate.find((x) => x.slug === sede);
  if (!s) notFound();

  // Se la sede non ha ancora profili propri, la pagina rimanda al nazionale:
  // meglio di un vicolo cieco senza nessun modo per farsi sentire.
  const propri = SOCIAL_ORDINE.filter((c) => s[c]);
  const haCanaliPropri = propri.length > 0;
  const canali = haCanaliPropri
    ? propri.map((c) => ({ chiave: c, url: s[c]! }))
    : SOCIAL_ORDINE.map((c) => ({ chiave: c, url: SOCIAL_NAZIONALE[c] }));

  return (
    <>
      {/* HERO */}
      <section className="bg-[#1A1814] text-white py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/sedi"
            className="text-gray-400 text-sm hover:text-white transition-colors"
          >
            ← Tutte le sedi
          </Link>
          <p className="text-[#FFBF00] text-sm font-semibold uppercase tracking-widest mt-6 mb-3">
            Sede di {s.citta}
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {s.nome}
          </h1>
          <p className="text-gray-300 mt-4">
            {s.citta} · {s.regione}
            {s.dataFondazione && ` · Fondata il ${s.dataFondazione}`}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {canali.map(({ chiave, url }, i) => {
              const { label, Icona } = SOCIAL[chiave];
              // Il primo canale disponibile fa da azione principale.
              const primario = i === 0;

              return (
                <a
                  key={chiave}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    primario
                      ? "flex items-center gap-2 bg-[#FFBF00] text-[#1A1814] px-6 py-3 rounded-md font-bold hover:bg-[#E6AC00] transition-colors"
                      : "flex items-center gap-2 border border-gray-500 text-white px-6 py-3 rounded-md font-semibold hover:border-white hover:bg-white/5 transition-colors"
                  }
                >
                  <Icona className="w-[18px] h-[18px]" />
                  {haCanaliPropri ? label : `${label} Rethink`}
                </a>
              );
            })}
          </div>

          {!haCanaliPropri && (
            <p className="text-gray-400 text-sm mt-4">
              La sede di {s.citta} non ha ancora profili propri: per ora
              scrivi ai canali nazionali.
            </p>
          )}
        </div>
      </section>

      {/* EVENTI (Luma) */}
      {(s.lumaEmbed || s.luma) && (
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Prossimi eventi
            </h2>
            <p className="text-[#4A4A4A] text-sm mb-6">
              Gli appuntamenti della sede di {s.citta}.
            </p>

            {s.lumaEmbed ? (
              <iframe
                src={s.lumaEmbed}
                title={`Calendario eventi Rethink ${s.citta}`}
                loading="lazy"
                className="w-full h-[450px] rounded-lg border border-[#E0E0E0]"
              />
            ) : null}

            {s.luma && (
              <a
                href={s.luma}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-5 text-[#1A1814] font-bold hover:underline border-b-2 border-[#FFBF00] pb-0.5"
              >
                Vedi il calendario completo →
              </a>
            )}
          </div>
        </section>
      )}

      {/* CONTATTO */}
      <section className="py-16 px-4 sm:px-6 bg-[#EBEBEB]">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Vuoi partecipare?
          </h2>
          <p className="text-[#4A4A4A] leading-relaxed mb-8">
            {haCanaliPropri
              ? `Mandaci un messaggio in direct sui social della sede di ${s.citta}: ti raccontiamo cosa stiamo organizzando e come dare una mano.`
              : `Mandaci un messaggio in direct sui canali nazionali di Rethink: ti mettiamo in contatto con chi segue la sede di ${s.citta}.`}{" "}
            Non serve alcuna esperienza pregressa, solo la voglia di esserci.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            {canali.map(({ chiave, url }) => {
              const { label, Icona } = SOCIAL[chiave];

              return (
                <a
                  key={chiave}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1A1814] text-white px-8 py-3 rounded-md font-bold hover:bg-[#111111] transition-colors"
                >
                  <Icona className="w-[18px] h-[18px]" />
                  {label}
                </a>
              );
            })}
          </div>

          <p className="text-[#4A4A4A] text-xs mt-6">
            Vuoi aprire una sede nel tuo ateneo?{" "}
            <Link href="/unisciti" className="font-semibold hover:underline">
              Scopri come fare
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
