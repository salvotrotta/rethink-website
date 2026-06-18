import Link from "next/link";
import sedi from "@/data/sedi.json";
import valori from "@/data/valori.json";

const sediFondate = sedi.filter((s) => s.stato === "fondata");

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[#0A0A0A] text-white py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#4A90D9] text-sm font-semibold uppercase tracking-widest mb-4">
            Associazione studentesca apartitica
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
            Pensare con rigore.<br />Costruire con coraggio.
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            ReThink è un&apos;associazione di studenti e ricercatori che crede nell&apos;università come spazio dove si impara a leggere il presente, immaginare e costruire il futuro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chi-siamo"
              className="bg-[#1C3564] hover:bg-[#243f7a] text-white px-8 py-3 rounded-md font-semibold transition-colors"
            >
              Scopri chi siamo
            </Link>
            <Link
              href="/sedi"
              className="border border-gray-600 hover:border-white text-white px-8 py-3 rounded-md font-semibold transition-colors"
            >
              Trova la tua sede
            </Link>
          </div>
        </div>
      </section>

      {/* COUNTER STRIP */}
      <section className="bg-[#1C3564] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>5</p>
            <p className="text-sm text-blue-200 mt-1">Sedi fondate</p>
          </div>
          <div>
            <p className="text-3xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>27</p>
            <p className="text-sm text-blue-200 mt-1">Atenei monitorati</p>
          </div>
          <div>
            <p className="text-3xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>160+</p>
            <p className="text-sm text-blue-200 mt-1">Studenti coinvolti</p>
          </div>
        </div>
      </section>

      {/* CHI SIAMO */}
      <section className="py-20 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#1C3564] text-sm font-semibold uppercase tracking-widest mb-3">Chi siamo</p>
            <h2 className="text-3xl font-bold mb-5" style={{ fontFamily: "Playfair Display, serif" }}>
              Un&apos;associazione nata dalle domande, non dalle risposte
            </h2>
            <p className="text-[#4A4A4A] leading-relaxed mb-4">
              ReThink nasce da persone riunite attorno alle stesse domande. Crediamo che le grandi sfide del nostro tempo — crisi demografica, declino economico, transizione ecologica e digitale — meritino analisi rigorose e dati, non slogan.
            </p>
            <p className="text-[#4A4A4A] leading-relaxed mb-6">
              Non prendiamo posizione su destra o sinistra, ma sulla qualità del ragionamento e sull&apos;evidenza. Siamo aperti a chiunque porti argomenti anziché &quot;verità già scritte&quot;.
            </p>
            <Link href="/chi-siamo" className="text-[#1C3564] font-semibold hover:underline">
              Leggi il Manifesto →
            </Link>
          </div>
          <div className="bg-[#0A0A0A] text-white rounded-lg p-8">
            <blockquote className="text-xl leading-relaxed italic" style={{ fontFamily: "Playfair Display, serif" }}>
              &quot;L&apos;università italiana ha tutto il potenziale per cambiare questo Paese. Noi siamo qui per non sprecarlo.&quot;
            </blockquote>
            <p className="text-gray-400 text-sm mt-4">— Manifesto ReThink</p>
          </div>
        </div>
      </section>

      {/* VALORI */}
      <section className="py-20 px-4 sm:px-6 bg-[#EBEBEB]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#1C3564] text-sm font-semibold uppercase tracking-widest mb-3">I nostri valori</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
              Sei principi che guidano ogni nostra azione
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valori.map((v) => (
              <div key={v.nome} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-3">{v.icona}</div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                  {v.nome}
                </h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">{v.breve}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEDI */}
      <section className="py-20 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#1C3564] text-sm font-semibold uppercase tracking-widest mb-3">Le nostre sedi</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
              Presenti in tutta Italia
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {sediFondate.map((s) => (
              <div key={s.slug} className="bg-white border border-[#EBEBEB] rounded-lg p-5 flex items-start gap-3">
                <span className="mt-1 w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{s.nome}</p>
                  <p className="text-[#4A4A4A] text-xs mt-0.5">{s.citta} · {s.regione}</p>
                  {s.instagram && (
                    <a href={s.instagram} target="_blank" rel="noopener noreferrer" className="text-[#1C3564] text-xs hover:underline mt-1 inline-block">
                      Instagram →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sedi" className="bg-[#1C3564] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#243f7a] transition-colors">
              Vedi tutte le sedi
            </Link>
            <Link href="/unisciti" className="border border-[#1C3564] text-[#1C3564] px-6 py-3 rounded-md font-semibold hover:bg-[#1C3564] hover:text-white transition-colors">
              Apri ReThink nella tua università
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="bg-[#1C3564] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-5" style={{ fontFamily: "Playfair Display, serif" }}>
            Vuoi portare ReThink nella tua università?
          </h2>
          <p className="text-blue-200 text-lg mb-8 leading-relaxed">
            Che tu voglia fondare una nuova sede o entrare in una già esistente, siamo qui per aiutarti. Chiede pazienza, metodo e la volontà di trasformare la critica in proposta.
          </p>
          <Link
            href="/unisciti"
            className="bg-white text-[#1C3564] px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors inline-block"
          >
            Scopri come fare
          </Link>
        </div>
      </section>
    </>
  );
}
