import { IconaInstagram } from "@/components/social";

export const metadata = {
  title: "Cosa facciamo – Rethink",
  description: "Le attività di Rethink: convegni, workshop, dibattiti, ricerca e ponti tra studenti e professionisti.",
};

const attivita = [
  {
    icona: "🎤",
    titolo: "Convegni",
    testo: "Organizziamo eventi con professori ed esperti sui temi dell'attualità, dell'economia, della politica, dell'università, del lavoro e dei giovani, come occasioni di approfondimento.",
  },
  {
    icona: "💬",
    titolo: "Dibattiti",
    testo: "Siamo convinti che il confronto tra idee diverse sia il modo migliore per mettere alla prova le proprie analisi e proposte. Per questo promuoviamo e organizziamo occasioni di dibattito e confronto.",
  },
  {
    icona: "📄",
    titolo: "Ricerca e pubblicazioni",
    testo: "Crediamo che la conoscenza non debba essere soltanto acquisita, ma anche prodotta e condivisa. Attraverso la ricerca e la pubblicazione contribuiamo al dibattito con analisi e proposte fondate su evidenze, metodo e approfondimento. Il rigore metodologico rappresenta il requisito essenziale di ogni nostro lavoro.",
  },
  {
    icona: "🤝",
    titolo: "Networking tra atenei",
    testo: "Costruiamo ponti tra studenti di università diverse. Un'idea nata a Torino può crescere a Roma, un progetto di ricerca a Milano può trovare collaboratori a Udine.",
  },
];

export default function CosaFacciamo() {
  return (
    <>
      <section className="bg-[#1A1814] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#FFBF00] text-sm font-semibold uppercase tracking-widest mb-4">Cosa facciamo</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Dall&apos;analisi all&apos;azione
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Rethink non si limita a discutere — costruisce spazi dove il pensiero critico si trasforma in proposta.
          </p>
        </div>
      </section>

      {/* ATTIVITÀ */}
      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {attivita.map((a) => (
              <div key={a.titolo} className="bg-white rounded-lg p-6 shadow-sm border border-[#EBEBEB] hover:border-[#1A1814] hover:shadow-md transition-all cursor-pointer">
                <div className="text-3xl mb-3">{a.icona}</div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{a.titolo}</h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">{a.testo}</p>
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
            Rethink opera in modo apartitico: non prendiamo posizione su destra o sinistra, ma sulla qualità del ragionamento. Ogni evento, ogni pubblicazione, ogni attività è valutata in base all&apos;evidenza che porta sul tavolo, non all&apos;appartenenza di chi la propone.
          </p>
          <p className="text-[#4A4A4A] leading-relaxed mb-4">
            Questo non significa neutralità: significa rigore. Siamo disposti a prendere posizioni scomode, purché siano fondate su dati e argomentazioni verificabili.
          </p>
          <div className="border-l-4 border-[#1A1814] pl-6 py-2 mt-6">
            <p className="text-lg italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              &quot;Chiediamo pazienza, metodo e la volontà di trasformare la critica in proposta.&quot;
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
