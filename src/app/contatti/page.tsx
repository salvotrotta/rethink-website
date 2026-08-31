import Link from "next/link";

import sedi from "@/data/sedi.json";
import RecapitiSede from "@/components/RecapitiSede";

export const metadata = {
  title: "Contatti – Rethink",
  description: "Contatta Rethink: team nazionale, sedi locali e canali social.",
};

// Una sede compare qui se ha almeno un profilo social pubblico, anche se
// è ancora in formazione: chi cerca un contatto locale lo vuole comunque.
const sediContattabili = sedi.filter((s) => s.instagram || s.linkedin);

export default function Contatti() {
  return (
    <>
      <section className="bg-[#1A1814] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#FFBF00] text-sm font-semibold uppercase tracking-widest mb-4">Contatti</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Parliamo
          </h1>
          <p className="text-gray-300 mt-4 text-lg">
            Per qualsiasi domanda, proposta di collaborazione o informazioni sulle sedi.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Nazionale */}
          <div className="bg-white border border-[#EBEBEB] rounded-lg p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Team Nazionale
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-1">Instagram</p>
                <a href="https://www.instagram.com/Rethink_uni" target="_blank" rel="noopener noreferrer" className="text-[#1A1814] font-semibold hover:underline">
                  @Rethink_uni
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-1">LinkedIn</p>
                <a href="https://www.linkedin.com/company/rethink-uni/" target="_blank" rel="noopener noreferrer" className="text-[#1A1814] font-semibold hover:underline">
                  Rethink
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-1">Tutti i link</p>
                <a href="https://linktr.ee/Rethink_uni" target="_blank" rel="noopener noreferrer" className="text-[#1A1814] font-semibold hover:underline">
                  linktr.ee/Rethink_uni
                </a>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                href="/unisciti"
                className="block w-full bg-[#1A1814] text-white px-5 py-3 rounded-md font-semibold text-center hover:bg-[#111111] transition-colors text-sm"
              >
                Voglio fondare una sede
              </Link>
              <a
                href="https://www.instagram.com/Rethink_uni"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border border-[#1A1814] text-[#1A1814] px-5 py-3 rounded-md font-semibold text-center hover:bg-[#1A1814] hover:text-white transition-colors text-sm"
              >
                Scrivici in direct su Instagram
              </a>
            </div>
          </div>

          {/* Sedi locali */}
          <div className="bg-white border border-[#EBEBEB] rounded-lg p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Sedi locali
            </h2>
            <p className="text-[#4A4A4A] text-sm mb-5">
              Segui la sede della tua università e scrivile in direct dai suoi social.
            </p>
            <div className="space-y-4">
              {sediContattabili.map((s) => (
                <div
                  key={s.slug}
                  className="p-3 border border-[#EBEBEB] rounded-lg hover:border-[#1A1814] transition-colors"
                >
                  <p className="font-semibold text-sm">{s.nome}</p>
                  <p className="text-xs text-[#4A4A4A] mb-2">{s.citta}</p>
                  <RecapitiSede sede={s} />
                </div>
              ))}
            </div>
            <p className="text-xs text-[#4A4A4A] mt-4">
              Non trovi la tua università?{" "}
              <Link href="/unisciti" className="text-[#1A1814] hover:underline font-semibold">
                Scopri come fondare una sede →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
