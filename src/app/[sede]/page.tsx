import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import sedi from "@/data/sedi.json";
import { SOCIAL, SOCIAL_ORDINE } from "@/components/social";

type Sede = (typeof sedi)[number];
type Referente = Sede["referenti"][number];

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
    description: `La sede Rethink presso ${s.nome}, a ${s.citta}. Contatti dei referenti e informazioni per partecipare.`,
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
            {SOCIAL_ORDINE.map((chiave, i) => {
              const url = s[chiave];
              if (!url) return null;
              const { label, Icona } = SOCIAL[chiave];
              // Il primo social disponibile fa da azione principale.
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
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* REFERENTI */}
      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Chi contattare
          </h2>
          <p className="text-[#4A4A4A] text-sm mb-8">
            Le persone che coordinano Rethink a {s.citta}.
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            {s.referenti.map((r, i) => (
              <SchedaReferente key={i} referente={r} />
            ))}
          </div>
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
            Scrivi alla sede di {s.citta} sui social: ti raccontiamo cosa stiamo
            organizzando e come dare una mano. Non serve alcuna esperienza
            pregressa, solo la voglia di esserci.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            {SOCIAL_ORDINE.map((chiave) => {
              const url = s[chiave];
              if (!url) return null;
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
              Compila il modulo
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

function SchedaReferente({ referente }: { referente: Referente }) {
  return (
    <div className="bg-white border border-[#EBEBEB] rounded-lg p-6 shadow-sm flex gap-4 items-start">
      <Avatar nome={referente.nome} foto={referente.foto} />

      <div className="min-w-0">
        <p className="font-bold text-sm">{referente.nome}</p>
        <p className="text-[#4A4A4A] text-xs mb-2">{referente.ruolo}</p>

        <div className="flex gap-3 mt-2">
          {SOCIAL_ORDINE.map((chiave) => {
            const url = referente[chiave];
            if (!url) return null;
            const { label, Icona } = SOCIAL[chiave];

            return (
              <a
                key={chiave}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} di ${referente.nome}`}
                className="text-[#4A4A4A] hover:text-[#1A1814] transition-colors"
              >
                <Icona className="w-[18px] h-[18px]" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Finché non c'è una foto vera mostra le iniziali su fondo giallo:
 * niente immagini finte da sostituire, e nessun file da caricare per
 * mandare online la pagina.
 */
function Avatar({ nome, foto }: { nome: string; foto: string | null }) {
  if (foto) {
    return (
      <Image
        src={foto}
        alt={nome}
        width={64}
        height={64}
        className="w-16 h-16 rounded-full object-cover shrink-0"
      />
    );
  }

  const iniziali =
    nome
      .replace(/[[\]]/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase() || "R";

  return (
    <div
      aria-hidden="true"
      className="w-16 h-16 rounded-full bg-[#FFBF00] text-[#1A1814] shrink-0 flex items-center justify-center font-bold text-lg"
      style={{ fontFamily: "Playfair Display, serif" }}
    >
      {iniziali}
    </div>
  );
}
