import Link from "next/link";
import sedi from "@/data/sedi.json";

export const metadata = {
  title: "Sedi – ReThink",
  description: "Tutte le sedi di ReThink nelle università italiane. Trova la tua sede o scopri come fondarne una.",
};

export default function Sedi() {
  const fondate = sedi.filter((s) => s.stato === "fondata");
  const inFormazione = sedi.filter((s) => s.stato === "in-formazione");

  return (
    <>
      <section className="bg-[#0A0A0A] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#4A90D9] text-sm font-semibold uppercase tracking-widest mb-4">Le nostre sedi</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            ReThink in tutta Italia
          </h1>
          <p className="text-gray-300 mt-4 text-lg">
            {fondate.length} sedi fondate · {sedi.length} atenei monitorati
          </p>
        </div>
      </section>

      {/* FONDATE */}
      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <h2 className="text-2xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
              Sedi fondate
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fondate.map((s) => (
              <div key={s.slug} className="bg-white border border-[#EBEBEB] rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                    Fondata
                  </span>
                  <span className="text-xs text-[#4A4A4A]">{s.dataFondazione}</span>
                </div>
                <h3 className="font-bold text-sm mb-1">{s.nome}</h3>
                <p className="text-[#4A4A4A] text-xs mb-3">{s.citta} · {s.regione}</p>
                {s.instagram && (
                  <a
                    href={s.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1C3564] text-xs font-semibold hover:underline"
                  >
                    Seguici su Instagram →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IN FORMAZIONE */}
      <section className="py-16 px-4 sm:px-6 bg-[#EBEBEB]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <h2 className="text-2xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
              Sedi in formazione
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {inFormazione.map((s) => (
              <div key={s.slug} className="bg-white border border-[#EBEBEB] rounded-lg p-6 shadow-sm opacity-90">
                <div className="mb-3">
                  <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full">
                    In formazione
                  </span>
                </div>
                <h3 className="font-bold text-sm mb-1">{s.nome}</h3>
                <p className="text-[#4A4A4A] text-xs mb-3">{s.citta} · {s.regione}</p>
                {s.instagram && (
                  <a
                    href={s.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1C3564] text-xs font-semibold hover:underline"
                  >
                    Seguici su Instagram →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 bg-[#1C3564] text-white text-center">
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
          Non trovi la tua università?
        </h2>
        <p className="text-blue-200 mb-6">Potresti essere tu a fondare ReThink nel tuo ateneo.</p>
        <Link href="/unisciti" className="bg-white text-[#1C3564] px-6 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors inline-block">
          Scopri come fare
        </Link>
      </section>
    </>
  );
}
