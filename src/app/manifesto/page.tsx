import valori from "@/data/valori.json";

export const metadata = {
  title: "Manifesto – ReThink",
  description: "Il documento fondativo di ReThink: identità, visione e valori dell'associazione.",
};

export default function Manifesto() {
  return (
    <>
      <section className="bg-[#292929] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#FFD957] text-sm font-semibold uppercase tracking-widest mb-4">Documento fondativo</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            Manifesto ReThink
          </h1>
          <p className="text-gray-400 text-sm mt-4">Bozza 1 – 2025</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-3xl mx-auto prose prose-lg max-w-none">

          <h2 style={{ fontFamily: "Playfair Display, serif" }} className="text-2xl font-bold text-[#292929] mb-4">Chi siamo</h2>
          <p className="text-[#4A4A4A] leading-relaxed mb-8">
            ReThink è un&apos;associazione apartitica di giovani, studenti e ricercatori. Crede nell&apos;università non solo come luogo dove si acquisiscono titoli, ma come spazio dove si impara a leggere il presente, immaginare e costruire il futuro.
          </p>

          <h2 style={{ fontFamily: "Playfair Display, serif" }} className="text-2xl font-bold text-[#292929] mb-4">Cosa vediamo</h2>
          <p className="text-[#4A4A4A] leading-relaxed mb-8">
            Il nostro tempo è segnato da sfide reali: crisi demografica, declino economico strutturale, transizione ecologica e digitale. Queste sfide meritano analisi rigorose e dati, non slogan. L&apos;università è uno dei pochi spazi dove questo dibattito può avvenire con serietà — e noi vogliamo che lo faccia.
          </p>

          <h2 style={{ fontFamily: "Playfair Display, serif" }} className="text-2xl font-bold text-[#292929] mb-4">Cosa vogliamo</h2>
          <p className="text-[#4A4A4A] leading-relaxed mb-4">
            ReThink vuole restituire agli studenti un protagonismo intellettuale autentico — non decorativo né strumentale. Promuoviamo un&apos;università che:
          </p>
          <ul className="text-[#4A4A4A] space-y-2 mb-8 ml-4 list-disc list-inside">
            <li>guardi oltre i confini disciplinari</li>
            <li>metta in dialogo facoltà, atenei ed esperienze diverse</li>
            <li>coltivi il pensiero critico come competenza fondamentale</li>
            <li>affronti i temi del futuro con rigore e senza pregiudizi ideologici</li>
          </ul>

          <h2 style={{ fontFamily: "Playfair Display, serif" }} className="text-2xl font-bold text-[#292929] mb-4">Come lo facciamo</h2>
          <ul className="text-[#4A4A4A] space-y-2 mb-8 ml-4 list-disc list-inside">
            <li>Organizzazione di convegni, workshop, dibattiti</li>
            <li>Costruzione di ponti tra studenti e professionisti, accademia e società civile, atenei italiani ed europei</li>
            <li>Promozione della formazione e del pensiero critico</li>
            <li>Apertura a chiunque condivida il metodo, indipendentemente dall&apos;orientamento politico</li>
          </ul>

          <h2 style={{ fontFamily: "Playfair Display, serif" }} className="text-2xl font-bold text-[#292929] mb-6">In cosa crediamo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {valori.map((v) => (
              <div key={v.nome} className="bg-white border border-[#EBEBEB] rounded-lg p-4 flex gap-3">
                <span className="text-2xl shrink-0">{v.icona}</span>
                <div>
                  <p className="font-bold text-sm">{v.nome}</p>
                  <p className="text-[#4A4A4A] text-sm mt-0.5">{v.breve}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: "Playfair Display, serif" }} className="text-2xl font-bold text-[#292929] mb-4">A chi si rivolge</h2>
          <p className="text-[#4A4A4A] leading-relaxed mb-4">
            ReThink nasce da persone riunite attorno alle stesse domande, non allo stesso tavolo. È uno spazio di aggregazione tenuto insieme non dall&apos;ottimismo, ma dalla convinzione che valga la pena provarci.
          </p>
          <p className="text-[#4A4A4A] leading-relaxed mb-8">
            Non prendiamo posizione su destra o sinistra, ma sulla qualità del ragionamento e sull&apos;evidenza. Chiediamo pazienza, metodo e la volontà di trasformare la critica in proposta.
          </p>

          <blockquote className="bg-[#292929] text-white rounded-lg p-8 text-xl italic leading-relaxed" style={{ fontFamily: "Playfair Display, serif" }}>
            &quot;L&apos;università italiana ha tutto il potenziale per cambiare questo Paese. Noi siamo qui per non sprecarlo.&quot;
          </blockquote>
        </div>
      </section>
    </>
  );
}
