import Link from "next/link";
import { Network, Newspaper, Presentation, type LucideIcon } from "lucide-react";

import { IconaInstagram } from "@/components/social";
import { metadatiPagina } from "@/lib/metadati";

export const metadata = metadatiPagina({
  titolo: "Cosa facciamo",
  descrizione:
    "Panel, seminari e tavole rotonde negli atenei, divulgazione fondata sui dati e una rete nazionale di studenti: cosa fa Rethink.",
  percorso: "/cosa-facciamo",
});

// Le tre attività descritte nel manifesto ("Cosa facciamo").
const attivita: { icona: LucideIcon; titolo: string; testo: string; link?: { href: string; testo: string } }[] = [
  {
    icona: Presentation,
    titolo: "Confronto negli atenei",
    testo:
      "Trasformiamo gli atenei in spazi di confronto aperto e rigoroso, organizzando panel, seminari e tavole rotonde che mettono in dialogo studenti, accademici, imprenditori e società civile, abbattendo le barriere tra facoltà per affrontare insieme le grandi sfide scientifiche, sociali e culturali del presente.",
  },
  {
    icona: Newspaper,
    titolo: "Divulgazione",
    testo:
      "Agli incontri affianchiamo un lavoro continuo di divulgazione, che traduce temi complessi in articoli e format accessibili ma realizzati con spirito critico e fondati sull’evidenza empirica.",
    link: { href: "/articoli", testo: "Leggi gli articoli →" },
  },
  {
    icona: Network,
    titolo: "Una rete nazionale",
    testo:
      "Tutto prende forma dentro una rete nazionale che connette studenti di discipline e città diverse: è lì che nascono la contaminazione di competenze e le relazioni da cui partono le idee e le iniziative.",
    link: { href: "/sedi", testo: "Le sedi →" },
  },
];

export default function CosaFacciamo() {
  return (
    <>
      <section className="bg-[#1A1814] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#FFBF00] text-sm font-semibold uppercase tracking-widest mb-4">Cosa facciamo</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Costruire dal basso l&rsquo;ecosistema che manca
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Il confronto tra discipline e il dialogo con la società e le imprese non si generano per decreto. Rethink sceglie di non attendere le riforme e di cominciare a costruirli dal basso, con chi l&rsquo;università la vive.
          </p>
        </div>
      </section>

      {/* ATTIVITÀ */}
      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {attivita.map((a) => (
              <div key={a.titolo} className="bg-white rounded-lg p-6 shadow-sm border border-[#EBEBEB] flex flex-col">
                <div className="w-11 h-11 rounded-full bg-[#1A1814] flex items-center justify-center mb-4">
                  <a.icona aria-hidden className="w-5 h-5 text-[#FFBF00]" strokeWidth={1.75} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{a.titolo}</h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">{a.testo}</p>
                {a.link && (
                  <Link href={a.link.href} className="mt-4 self-start text-[#1A1814] text-sm font-bold hover:underline border-b-2 border-[#FFBF00]">
                    {a.link.testo}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INIZIATIVE */}
      <section className="py-16 px-4 sm:px-6 bg-[#EBEBEB]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#1A1814] text-sm font-bold uppercase tracking-widest mb-3 bg-[#FFBF00] inline-block px-2 py-0.5">Iniziative</p>
          <h2 className="text-2xl font-bold mt-2 mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Le nostre proposte
          </h2>
          <p className="text-[#4A4A4A] leading-relaxed">
            Stiamo raccogliendo le nostre proposte di policy — dalla costruzione dei campus universitari ai temi che riguardano studenti e giovani ricercatori. Questa sezione arriverà presto.
          </p>
        </div>
      </section>

      {/* METODO */}
      <section className="py-16 px-4 sm:px-6 bg-[#EBEBEB]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Il nostro metodo
          </h2>
          <p className="text-[#4A4A4A] leading-relaxed mb-4">
            Affrontiamo ogni tema con metodo scientifico, partendo dai dati e dall&rsquo;evidenza empirica. Ogni evento, ogni pubblicazione, ogni attività è valutata in base all&apos;evidenza che porta sul tavolo, non all&apos;appartenenza di chi la propone.
          </p>
          <p className="text-[#4A4A4A] leading-relaxed mb-4">
            Rifiutiamo le risposte ideologiche e preconfezionate e siamo pronti a cambiare idea quando le prove lo richiedono.
          </p>
          <div className="border-l-4 border-[#1A1814] pl-6 py-2 mt-6">
            <p className="text-lg italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              &ldquo;Cerchiamo studenti curiosi ed esigenti, che preferiscono i dati agli slogan.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* PER PROFESSORI */}
      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-3xl mx-auto bg-[#1A1814] text-white rounded-lg p-8">
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Sei un professore o un professionista?
          </h2>
          <p className="text-gray-300 leading-relaxed mb-5">
            Collaboriamo con docenti, ricercatori e professionisti che vogliono portare la loro esperienza agli studenti. Se vuoi partecipare a un evento, ospitare un workshop o avviare una collaborazione, scrivici.
          </p>
          <a
            href="https://www.instagram.com/Rethink_uni"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#1A1814] px-5 py-2.5 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-block text-sm"
          >
            Scrivici in direct su Instagram
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6 bg-[#F9F9F7] text-center">
        <a
          href="https://www.instagram.com/Rethink_uni"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1A1814] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#111111] transition-colors inline-flex items-center gap-2"
        >
          <IconaInstagram className="w-[18px] h-[18px]" />
          Seguici per i prossimi eventi
        </a>
      </section>
    </>
  );
}
