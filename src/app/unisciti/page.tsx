import Link from "next/link";

import { IconaInstagram } from "@/components/social";

export const metadata = {
  title: "Unisciti – Rethink",
  description: "Entra in Rethink o fondane una sede nella tua università. Guida pratica passo per passo.",
};

export default function Unisciti() {
  return (
    <>
      <section className="bg-[#1A1814] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#FFBF00] text-sm font-semibold uppercase tracking-widest mb-4">Unisciti</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Porta Rethink nella tua università
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Che tu voglia entrare in una sede esistente o fondarne una nuova, il processo è più semplice di quanto sembri.
          </p>
        </div>
      </section>

      {/* OPZIONE 1 – entra */}
      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Entra in una sede esistente
          </h2>
          <p className="text-[#4A4A4A] leading-relaxed mb-6">
            Se la tua università ha già una sede Rethink, scrivi in direct alla sede sui suoi social. Partecipa agli eventi, diventa socio e contribuisci alle attività locali e nazionali.
          </p>
          <Link href="/sedi" className="bg-[#1A1814] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#111111] transition-colors inline-block">
            Trova la tua sede →
          </Link>
        </div>
      </section>

      {/* OPZIONE 2 – fonda */}
      <section className="py-16 px-4 sm:px-6 bg-[#EBEBEB]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Non c&apos;è Rethink nella tua università? Aiutaci a fondarla.
          </h2>
          <p className="text-[#4A4A4A] leading-relaxed mb-2">
            Facciamo questo passo insieme.
          </p>
          <p className="text-[#4A4A4A] leading-relaxed mb-2">
            Se nel tuo ateneo non c&apos;è ancora Rethink, mandaci un messaggio in
            direct su Instagram e ti metteremo in contatto con altri studenti
            della tua università per fondare l&apos;associazione.
          </p>
          <p className="text-[#4A4A4A] leading-relaxed mb-10">
            Non sei solo, ti supporteremo in ogni passo.
          </p>

          <a
            href="https://www.instagram.com/Rethink_uni"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1A1814] text-white px-8 py-3 rounded-md font-bold hover:bg-[#111111] transition-colors"
          >
            <IconaInstagram className="w-[18px] h-[18px]" />
            Scrivici in direct su Instagram
          </a>
        </div>
      </section>

      {/* CONTATTA */}
      <section className="py-16 px-4 sm:px-6 bg-[#1A1814] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Pronto a iniziare?
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Hai altre domande? Mandaci un messaggio in direct su Instagram: il team nazionale ti mette in contatto con chi segue il tuo territorio.
          </p>
          <a
            href="https://www.instagram.com/Rethink_uni"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#1A1814] px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors inline-block"
          >
            Scrivici in direct su Instagram
          </a>
        </div>
      </section>
    </>
  );
}
