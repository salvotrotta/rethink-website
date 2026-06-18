import Link from "next/link";

export const metadata = {
  title: "Cosa facciamo – ReThink",
  description: "Le attività di ReThink: convegni, workshop, dibattiti, ricerca e ponti tra studenti e professionisti.",
};

const attivita = [
  {
    icona: "🎤",
    titolo: "Convegni e dibattiti",
    testo: "Organizziamo eventi aperti su temi di economia, politica, università e futuro del lavoro. Non cerchiamo il consenso — cerchiamo il confronto tra posizioni diverse, sostenute da argomenti.",
  },
  {
    icona: "🔬",
    titolo: "Workshop e formazione",
    testo: "Sessioni pratiche su pensiero critico, analisi dei dati, scrittura argomentativa e public speaking. Competenze che l'università spesso non insegna, ma che fanno la differenza.",
  },
  {
    icona: "🤝",
    titolo: "Networking tra atenei",
    testo: "Costruiamo ponti tra studenti di università diverse. Un'idea nata a Torino può crescere a Roma, un progetto di ricerca a Milano può trovare collaboratori a Udine.",
  },
  {
    icona: "📄",
    titolo: "Ricerca e pubblicazioni",
    testo: "Supportiamo progetti di ricerca studentesca e pubblichiamo analisi su temi di policy, economia e innovazione. Il rigore metodologico è il nostro standard minimo.",
  },
  {
    icona: "🏛",
    titolo: "Rappresentanza studentesca",
    testo: "Dove le condizioni lo permettono, partecipiamo alle elezioni degli organi di rappresentanza universitaria per portare una voce basata sui fatti, non sull'appartenenza.",
  },
  {
    icona: "🌍",
    titolo: "Collaborazioni internazionali",
    testo: "Lavoriamo per connettere gli atenei italiani con esperienze europee e internazionali, da programmi di scambio a partnership con associazioni studentesche di altri paesi.",
  },
];

export default function CosaFacciamo() {
  return (
    <>
      <section className="bg-[#0A0A0A] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#4A90D9] text-sm font-semibold uppercase tracking-widest mb-4">Cosa facciamo</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Dall&apos;analisi all&apos;azione
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            ReThink non si limita a discutere — costruisce spazi concreti dove il pensiero critico si trasforma in proposta.
          </p>
        </div>
      </section>

      {/* ATTIVITÀ */}
      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {attivita.map((a) => (
              <div key={a.titolo} className="bg-white rounded-lg p-6 shadow-sm border border-[#EBEBEB]">
                <div className="text-3xl mb-3">{a.icona}</div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: "Playfair Display, serif" }}>{a.titolo}</h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">{a.testo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METODO */}
      <section className="py-16 px-4 sm:px-6 bg-[#EBEBEB]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
            Il nostro metodo
          </h2>
          <p className="text-[#4A4A4A] leading-relaxed mb-4">
            ReThink opera in modo apartitico: non prendiamo posizione su destra o sinistra, ma sulla qualità del ragionamento. Ogni evento, ogni pubblicazione, ogni attività è valutata in base all&apos;evidenza che porta sul tavolo, non all&apos;appartenenza di chi la propone.
          </p>
          <p className="text-[#4A4A4A] leading-relaxed mb-4">
            Questo non significa neutralità: significa rigore. Siamo disposti a prendere posizioni scomode, purché siano fondate su dati e argomentazioni verificabili.
          </p>
          <div className="border-l-4 border-[#1C3564] pl-6 py-2 mt-6">
            <p className="text-lg italic" style={{ fontFamily: "Playfair Display, serif" }}>
              &quot;Chiediamo pazienza, metodo e la volontà di trasformare la critica in proposta.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* PER PROFESSORI */}
      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-3xl mx-auto bg-[#1C3564] text-white rounded-lg p-8">
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
            Sei un professore o un professionista?
          </h2>
          <p className="text-blue-200 leading-relaxed mb-5">
            Collaboriamo con docenti, ricercatori e professionisti che vogliono portare la loro esperienza agli studenti. Se vuoi partecipare a un evento, ospitare un workshop o avviare una collaborazione, scrivici.
          </p>
          <a
            href="mailto:info@rethink-uni.it?subject=Proposta di collaborazione"
            className="bg-white text-[#1C3564] px-5 py-2.5 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-block text-sm"
          >
            Contattaci
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6 bg-[#F9F9F7] text-center">
        <Link href="/eventi" className="bg-[#1C3564] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#243f7a] transition-colors inline-block">
          Vedi i prossimi eventi →
        </Link>
      </section>
    </>
  );
}
