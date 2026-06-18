import Link from "next/link";
import valori from "@/data/valori.json";

export const metadata = {
  title: "Chi siamo – ReThink",
  description: "Il Manifesto e i valori di ReThink: competenza, merito, razionalità, pragmatismo, sostenibilità, innovazione.",
};

export default function ChiSiamo() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[#292929] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#FFD957] text-sm font-semibold uppercase tracking-widest mb-4">Chi siamo</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            Ripensiamo l&apos;università.<br />Costruiamo il futuro.
          </h1>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif" }}>Il Manifesto</h2>

          <h3 className="text-lg font-bold mb-3 text-[#292929]">Chi siamo</h3>
          <p className="text-[#4A4A4A] leading-relaxed mb-6">
            ReThink è un&apos;associazione apartitica di giovani, studenti e ricercatori. Crede nell&apos;università non solo come luogo dove si acquisiscono titoli, ma come spazio dove si impara a leggere il presente, immaginare e costruire il futuro.
          </p>

          <h3 className="text-lg font-bold mb-3 text-[#292929]">Cosa vediamo</h3>
          <p className="text-[#4A4A4A] leading-relaxed mb-6">
            Le grandi sfide del nostro tempo — crisi demografica, declino economico strutturale, transizione ecologica e digitale — meritano analisi rigorose e dati, non slogan. L&apos;università è uno dei pochi spazi dove questo dibattito può avvenire con serietà.
          </p>

          <h3 className="text-lg font-bold mb-3 text-[#292929]">Cosa vogliamo</h3>
          <p className="text-[#4A4A4A] leading-relaxed mb-3">
            ReThink vuole restituire agli studenti un protagonismo intellettuale autentico — non decorativo né strumentale. Promuove un&apos;università che:
          </p>
          <ul className="list-disc list-inside text-[#4A4A4A] space-y-1 mb-6 ml-4">
            <li>guardi oltre i confini disciplinari</li>
            <li>metta in dialogo facoltà, atenei ed esperienze diverse</li>
            <li>coltivi il pensiero critico come competenza fondamentale</li>
            <li>affronti i temi del futuro con rigore e senza pregiudizi ideologici</li>
          </ul>

          <h3 className="text-lg font-bold mb-3 text-[#292929]">Come lo facciamo</h3>
          <ul className="list-disc list-inside text-[#4A4A4A] space-y-1 mb-6 ml-4">
            <li>Organizzazione di convegni, workshop, dibattiti</li>
            <li>Costruzione di ponti tra studenti e professionisti, accademia e società civile, atenei italiani ed europei</li>
            <li>Promozione della formazione</li>
            <li>Apertura a chiunque condivida il metodo, indipendentemente dall&apos;orientamento politico</li>
          </ul>

          <div className="border-l-4 border-[#292929] pl-6 py-2 my-8 bg-white rounded-r-lg">
            <p className="text-xl italic leading-relaxed" style={{ fontFamily: "Playfair Display, serif" }}>
              &quot;ReThink non prende posizione su destra o sinistra, ma sulla qualità del ragionamento e sull&apos;evidenza.&quot;
            </p>
          </div>

          <h3 className="text-lg font-bold mb-3 text-[#292929]">Cosa non siamo</h3>
          <p className="text-[#4A4A4A] leading-relaxed mb-6">
            Non siamo un partito, né una corrente ideologica. Non siamo decorativi né strumentali. Non diamo risposte preconfezionate — facciamo le domande giuste. Chiediamo pazienza, metodo e la volontà di trasformare la critica in proposta.
          </p>

          <blockquote className="bg-[#292929] text-white rounded-lg p-8 text-xl italic leading-relaxed" style={{ fontFamily: "Playfair Display, serif" }}>
            &quot;L&apos;università italiana ha tutto il potenziale per cambiare questo Paese. Noi siamo qui per non sprecarlo.&quot;
            <footer className="text-gray-400 text-sm mt-3 not-italic">— Manifesto ReThink</footer>
          </blockquote>
        </div>
      </section>

      {/* VALORI */}
      <section className="py-16 px-4 sm:px-6 bg-[#EBEBEB]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-10 text-center" style={{ fontFamily: "Playfair Display, serif" }}>
            I sei valori fondamentali
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valori.map((v) => (
              <div key={v.nome} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-3">{v.icona}</div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "Playfair Display, serif" }}>{v.nome}</h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed mb-3">{v.breve}</p>
                <p className="text-[#4A4A4A] text-sm leading-relaxed text-xs border-t border-gray-100 pt-3">{v.esteso}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7] text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
          Condividi il metodo?
        </h2>
        <p className="text-[#4A4A4A] mb-6">ReThink è aperta a chiunque porti argomenti anziché verità già scritte.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/unisciti" className="bg-[#292929] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#111111] transition-colors">
            Unisciti a ReThink
          </Link>
          <Link href="/statuto" className="border border-[#292929] text-[#292929] px-6 py-3 rounded-md font-semibold hover:bg-[#292929] hover:text-white transition-colors">
            Leggi lo Statuto
          </Link>
        </div>
      </section>
    </>
  );
}
