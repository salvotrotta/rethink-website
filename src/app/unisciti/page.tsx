import Link from "next/link";

export const metadata = {
  title: "Unisciti – ReThink",
  description: "Entra in ReThink o fondane una sede nella tua università. Guida pratica passo per passo.",
};

const steps = [
  {
    n: "01",
    titolo: "Trova un referente locale",
    testo: "Ogni sede nasce da un referente universitario iscritto all'ateneo di destinazione. Questa persona coordina il gruppo e fa da punto di contatto con il nazionale.",
  },
  {
    n: "02",
    titolo: "Leggi il regolamento del tuo ateneo",
    testo: "Ogni università ha regole diverse: finestre temporali di fondazione, numero minimo di firmatari, obbligo di statuto registrato. Contattaci e ti aiutiamo a orientarti.",
  },
  {
    n: "03",
    titolo: "Raccogli i firmatari",
    testo: "In media servono tra 15 e 50 studenti iscritti all'ateneo che firmino per la costituzione. Crea un gruppo WhatsApp locale e inizia a costruire la community.",
  },
  {
    n: "04",
    titolo: "Registra l'associazione",
    testo: "Redigi Statuto e Atto Costitutivo (abbiamo template già pronti) e, dove richiesto, registrali all'Agenzia delle Entrate. Alcuni atenei lo richiedono, altri no.",
  },
  {
    n: "05",
    titolo: "Iscriviti all'albo delle associazioni",
    testo: "Presenta la documentazione all'ufficio studenti o all'ufficio orientamento del tuo ateneo nei tempi del bando. Da quel momento puoi prenotare aule e partecipare ai bandi di finanziamento.",
  },
];

export default function Unisciti() {
  return (
    <>
      <section className="bg-[#0A0A0A] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#4A90D9] text-sm font-semibold uppercase tracking-widest mb-4">Unisciti</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Porta ReThink nella tua università
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
            Se la tua università ha già una sede ReThink, contatta il referente locale via Instagram o email. Partecipa agli eventi, contribuisci alle attività e, se vuoi, diventa socio versando la quota annuale.
          </p>
          <Link href="/sedi" className="bg-[#1C3564] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#243f7a] transition-colors inline-block">
            Trova la tua sede →
          </Link>
        </div>
      </section>

      {/* OPZIONE 2 – fonda */}
      <section className="py-16 px-4 sm:px-6 bg-[#EBEBEB]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
            Fonda ReThink nel tuo ateneo
          </h2>
          <p className="text-[#4A4A4A] leading-relaxed mb-10">
            Il percorso richiede qualche mese di lavoro, ma non sei solo: il team nazionale ti supporta in ogni step.
          </p>

          <div className="space-y-6">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-5 items-start bg-white rounded-lg p-6 shadow-sm">
                <span className="text-3xl font-bold text-[#EBEBEB] shrink-0 w-10 text-right" style={{ fontFamily: "Playfair Display, serif" }}>
                  {s.n}
                </span>
                <div>
                  <h3 className="font-bold mb-1">{s.titolo}</h3>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed">{s.testo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATTA */}
      <section className="py-16 px-4 sm:px-6 bg-[#1C3564] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Pronto a iniziare?
          </h2>
          <p className="text-blue-200 mb-8 leading-relaxed">
            Scrivi al team nazionale: ti mettiamo in contatto con chi segue il tuo territorio e ti forniremo tutta la documentazione necessaria.
          </p>
          <a
            href="mailto:info@rethink-uni.it?subject=Voglio fondare ReThink nella mia università"
            className="bg-white text-[#1C3564] px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors inline-block"
          >
            Scrivici una mail
          </a>
        </div>
      </section>
    </>
  );
}
