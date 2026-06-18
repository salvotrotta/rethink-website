import Link from "next/link";

export const metadata = {
  title: "Eventi – ReThink",
  description: "I prossimi eventi ReThink nelle università italiane: convegni, workshop e dibattiti.",
};

const eventiProssimi = [
  {
    titolo: "L'università che vogliamo: modelli a confronto",
    data: "Ottobre 2026",
    sede: "Sapienza – Roma",
    descrizione: "Una tavola rotonda con professori, studenti e professionisti su come riformare il sistema universitario italiano partendo dai dati.",
    tipo: "Tavola rotonda",
  },
  {
    titolo: "Pensiero critico nell'era dell'informazione",
    data: "Novembre 2026",
    sede: "UniMi – Milano",
    descrizione: "Workshop pratico sugli strumenti del pensiero critico: come valutare le fonti, costruire un argomento, smontare una falsa dicotomia.",
    tipo: "Workshop",
  },
];

const eventiPassati = [
  {
    titolo: "Fondazione ReThink – Kick-off nazionale",
    data: "Maggio 2025",
    sede: "Roma",
    descrizione: "L'evento di fondazione dell'associazione, con la presentazione del Manifesto e dello Statuto.",
    tipo: "Evento fondativo",
  },
];

export default function Eventi() {
  return (
    <>
      <section className="bg-[#0A0A0A] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#4A90D9] text-sm font-semibold uppercase tracking-widest mb-4">Eventi</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            Dove ci trovi
          </h1>
          <p className="text-gray-300 mt-4 text-lg">
            Convegni, workshop e dibattiti nelle università italiane.
          </p>
        </div>
      </section>

      {/* PROSSIMI */}
      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
            Prossimi eventi
          </h2>
          <div className="space-y-5">
            {eventiProssimi.map((e) => (
              <div key={e.titolo} className="bg-white border border-[#EBEBEB] rounded-lg p-6 shadow-sm flex flex-col sm:flex-row gap-6">
                <div className="sm:w-28 shrink-0">
                  <span className="bg-[#1C3564] text-white text-xs font-semibold px-3 py-1 rounded-full">{e.tipo}</span>
                  <p className="text-sm font-semibold mt-3 text-[#1C3564]">{e.data}</p>
                  <p className="text-xs text-[#4A4A4A] mt-1">{e.sede}</p>
                </div>
                <div>
                  <h3 className="font-bold text-base mb-2" style={{ fontFamily: "Playfair Display, serif" }}>{e.titolo}</h3>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed">{e.descrizione}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PASSATI */}
      <section className="py-16 px-4 sm:px-6 bg-[#EBEBEB]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
            Archivio eventi
          </h2>
          <div className="space-y-5">
            {eventiPassati.map((e) => (
              <div key={e.titolo} className="bg-white border border-[#EBEBEB] rounded-lg p-6 shadow-sm flex flex-col sm:flex-row gap-6 opacity-80">
                <div className="sm:w-28 shrink-0">
                  <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">{e.tipo}</span>
                  <p className="text-sm font-semibold mt-3 text-[#4A4A4A]">{e.data}</p>
                  <p className="text-xs text-[#4A4A4A] mt-1">{e.sede}</p>
                </div>
                <div>
                  <h3 className="font-bold text-base mb-2" style={{ fontFamily: "Playfair Display, serif" }}>{e.titolo}</h3>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed">{e.descrizione}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6 bg-[#1C3564] text-white text-center">
        <p className="text-blue-200 mb-4">Vuoi organizzare un evento ReThink nel tuo ateneo?</p>
        <Link href="/unisciti" className="bg-white text-[#1C3564] px-6 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors inline-block">
          Scopri come →
        </Link>
      </section>
    </>
  );
}
