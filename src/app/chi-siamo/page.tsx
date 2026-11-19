import Link from "next/link";

import IconaValore from "@/components/IconaValore";
import { COSA_VEDIAMO } from "@/data/cosa-vediamo";
import valori from "@/data/valori.json";
import { metadatiPagina } from "@/lib/metadati";

export const metadata = metadatiPagina({
  titolo: "Chi siamo",
  descrizione:
    "Rethink è una rete nazionale di giovani, studenti e dottorandi, nata negli atenei italiani. Missione, visione, valori e i dati da cui partiamo.",
  percorso: "/chi-siamo",
});

const playfair = { fontFamily: "var(--font-playfair), Georgia, serif" };

export default function ChiSiamo() {
  return (
    <>
      {/* HERO: il "chi siamo" sintetico del documento definitivo */}
      <section className="bg-[#1A1814] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#FFBF00] text-sm font-semibold uppercase tracking-widest mb-4">Chi siamo</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" style={playfair}>
            Ripensiamo l&rsquo;università.<br />Costruiamo il futuro.
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Rethink è una rete nazionale di giovani, studenti e dottorandi, nata negli atenei italiani. Crediamo che
            dall&rsquo;università dipendano l&rsquo;innovazione, la crescita dei salari e il benessere del Paese, e che
            debba essere uno spazio in cui si impara a leggere il presente e a costruire il futuro, non una fabbrica di
            titoli. Per questo non aspettiamo le riforme, cerchiamo di coltivare negli atenei il confronto tra discipline
            coinvolgendo accademici, imprese e società civile.
          </p>
        </div>
      </section>

      {/* MISSIONE E VISIONE */}
      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-lg p-8 border-t-4 border-[#FFBF00] shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-[#1A1814] mb-3">Missione</p>
            <p className="text-[#4A4A4A] leading-relaxed">
              Rethink costruisce, dal basso e da subito, l&rsquo;ecosistema che oggi manca negli atenei italiani. Porta
              nelle università il confronto aperto e rigoroso tra studenti, docenti, imprese e società civile, fa
              divulgazione fondata sui dati e collega in una rete nazionale studenti di discipline e città diverse,
              perché le idee nate in un ateneo possano crescere in un altro. Non intendiamo attendere le riforme, il
              cambiamento deve partire dal basso.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8 border-t-4 border-[#1A1814] shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-[#1A1814] mb-3">Visione</p>
            <p className="text-[#4A4A4A] leading-relaxed">
              Un&rsquo;università italiana che torni a essere il motore dell&rsquo;innovazione e dell&rsquo;ascensore
              sociale del Paese: un luogo in cui ricerca, didattica e società si incontrano, in cui le discipline
              dialogano tra loro e con il mondo produttivo, e da cui i giovani non devono andarsene per vedere
              riconosciuto il proprio valore.
            </p>
          </div>
        </div>
      </section>

      {/* VALORI */}
      <section id="valori" className="scroll-mt-16 py-16 px-4 sm:px-6 bg-[#EBEBEB]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center" style={playfair}>I nostri valori</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {valori.map((v) => (
              <div key={v.nome} className="bg-white rounded-lg p-6 shadow-sm flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#1A1814] flex items-center justify-center">
                  <IconaValore nome={v.icona} className="w-6 h-6 text-[#FFBF00]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={playfair}>{v.nome}</h3>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed">{v.esteso}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COSA VEDIAMO */}
      <section id="cosa-vediamo" className="scroll-mt-16 py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-3" style={playfair}>Cosa vediamo</h2>
            <p className="text-[#4A4A4A]">
              Da dove partiamo, in otto numeri. Il ragionamento completo, con le fonti, è nel{" "}
              <Link href="/manifesto" className="underline underline-offset-2 font-semibold text-[#1A1814]">manifesto</Link>.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {COSA_VEDIAMO.map((p) => (
              <div key={p.titolo} className="bg-white rounded-lg p-6 border border-[#EBEBEB] flex flex-col">
                <p className="text-3xl font-bold text-[#1A1814] mb-1" style={playfair}>{p.numero}</p>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1814] mb-3 border-b-2 border-[#FFBF00] pb-2 self-start">
                  {p.titolo}
                </h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">{p.testo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 bg-[#1A1814] text-white text-center">
        <h2 className="text-2xl font-bold mb-4" style={playfair}>Non aspettiamo le riforme</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Cerchiamo studenti curiosi ed esigenti, che preferiscono i dati agli slogan.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/manifesto" className="bg-[#FFBF00] text-[#1A1814] px-6 py-3 rounded-md font-bold hover:bg-[#E6AC00] transition-colors">
            Leggi il manifesto
          </Link>
          <Link href="/unisciti" className="border border-gray-500 text-white px-6 py-3 rounded-md font-semibold hover:border-white transition-colors">
            Unisciti a Rethink
          </Link>
        </div>
      </section>
    </>
  );
}
