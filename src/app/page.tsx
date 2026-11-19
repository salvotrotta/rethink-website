import Link from "next/link";
import sedi from "@/data/sedi.json";
import valori from "@/data/valori.json";
import RecapitiSede from "@/components/RecapitiSede";
import { SchedaArticolo } from "@/components/articoli";
import { articoliInVetrina } from "@/lib/articoli";
import IconaValore from "@/components/IconaValore";
import { COSA_VEDIAMO } from "@/data/cosa-vediamo";

const sediFondate = sedi.filter((s) => s.stato === "fondata");

export default function Home() {
  const ultimi = articoliInVetrina().slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="bg-[#1A1814] text-white py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#FFBF00] text-sm font-semibold uppercase tracking-widest mb-4">
            Rete nazionale di giovani, studenti e dottorandi
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Ripensiamo l&rsquo;università.<br />Costruiamo il futuro.
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Rethink è una rete nazionale di giovani, studenti e dottorandi, nata negli atenei italiani. Crediamo che dall&rsquo;università dipendano l&rsquo;innovazione, la crescita dei salari e il benessere del Paese.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chi-siamo"
              className="bg-[#FFBF00] hover:bg-[#E6AC00] text-[#1A1814] px-8 py-3 rounded-md font-bold transition-colors"
            >
              Scopri chi siamo
            </Link>
            <Link
              href="/sedi"
              className="border border-gray-500 hover:border-white text-white px-8 py-3 rounded-md font-semibold transition-colors"
            >
              Trova la tua sede
            </Link>
          </div>
        </div>
      </section>

      {/* COUNTER STRIP */}
      <section className="bg-[#FFBF00] py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center text-[#1A1814]">
          <div>
            <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{sediFondate.length}</p>
            <p className="text-sm font-medium mt-1">Sedi fondate</p>
          </div>
          <div>
            <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{sedi.length}</p>
            <p className="text-sm font-medium mt-1">Atenei monitorati</p>
          </div>
          <div>
            <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>160+</p>
            <p className="text-sm font-medium mt-1">Studenti coinvolti</p>
          </div>
        </div>
      </section>

      {/* CHI SIAMO */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#FFBF00] text-sm font-bold uppercase tracking-widest mb-3 bg-[#1A1814] inline-block px-2 py-0.5">Chi siamo</p>
            <h2 className="text-3xl font-bold mb-5 mt-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Non aspettiamo le riforme
            </h2>
            <p className="text-[#5A5A5A] leading-relaxed mb-4">
              Crediamo che l&rsquo;università debba essere uno spazio in cui si impara a leggere il presente e a costruire il futuro, non una fabbrica di titoli.
            </p>
            <p className="text-[#5A5A5A] leading-relaxed mb-6">
              Per questo cerchiamo di coltivare negli atenei il confronto tra discipline, coinvolgendo accademici, imprese e società civile: panel e seminari, divulgazione fondata sui dati e una rete che collega studenti di città diverse.
            </p>
            <Link href="/manifesto" className="text-[#1A1814] font-bold hover:underline border-b-2 border-[#FFBF00] pb-0.5">
              Leggi il manifesto →
            </Link>
          </div>
          <div className="bg-[#1A1814] text-white rounded-lg p-8">
            <blockquote className="text-xl leading-relaxed italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              &ldquo;Rethink sceglie di non attendere che quelle condizioni si realizzino e di cominciare a costruirle dal basso, con chi l&rsquo;università la vive.&rdquo;
            </blockquote>
            <p className="text-[#FFBF00] text-sm mt-4 font-semibold">— Manifesto Rethink</p>
          </div>
        </div>
      </section>

      {/* COSA VEDIAMO: quattro numeri; gli otto completi sono in /chi-siamo */}
      <section className="py-20 px-4 sm:px-6 bg-[#1A1814] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#1A1814] text-sm font-bold uppercase tracking-widest mb-3 bg-[#FFBF00] inline-block px-2 py-0.5">Cosa vediamo</p>
            <h2 className="text-3xl font-bold mt-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Un&rsquo;università che si è fermata
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {COSA_VEDIAMO.filter((p) => p.home).map((p) => (
              <div key={p.titolo} className="border-t-2 border-[#FFBF00] pt-4">
                <p className="text-4xl font-bold text-[#FFBF00]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{p.numero}</p>
                <p className="text-gray-300 text-sm leading-relaxed mt-2">{p.etichetta}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/chi-siamo#cosa-vediamo" className="text-white font-bold hover:underline border-b-2 border-[#FFBF00] pb-0.5">
              Tutti i dati →
            </Link>
          </div>
        </div>
      </section>

      {/* VALORI */}
      <section className="py-20 px-4 sm:px-6 bg-[#F2F2F2]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#FFBF00] text-sm font-bold uppercase tracking-widest mb-3 bg-[#1A1814] inline-block px-2 py-0.5">I nostri valori</p>
            <h2 className="text-3xl font-bold mt-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Quattro principi che guidano ogni nostra azione
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valori.map((v) => (
              <div key={v.nome} className="bg-white rounded-lg p-6 shadow-sm border-t-4 border-[#FFBF00]">
                <div className="w-11 h-11 rounded-full bg-[#1A1814] flex items-center justify-center mb-4">
                  <IconaValore nome={v.icona} className="w-5 h-5 text-[#FFBF00]" />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {v.nome}
                </h3>
                <p className="text-[#5A5A5A] text-sm leading-relaxed">{v.breve}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEDI */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#FFBF00] text-sm font-bold uppercase tracking-widest mb-3 bg-[#1A1814] inline-block px-2 py-0.5">Le nostre sedi</p>
            <h2 className="text-3xl font-bold mt-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Presenti in tutta Italia
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {sediFondate.map((s) => (
              <div key={s.slug} className="border border-[#E0E0E0] rounded-lg p-5 flex items-start gap-3 hover:border-[#1A1814] transition-colors">
                <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                <div className="min-w-0">
                  <Link href={`/${s.slug}`} className="group">
                    <p className="font-semibold text-sm group-hover:underline">{s.nome}</p>
                    <p className="text-[#5A5A5A] text-xs mt-0.5 mb-2">{s.citta} · {s.regione}</p>
                  </Link>
                  <RecapitiSede sede={s} />
                  <Link
                    href={`/${s.slug}`}
                    className="inline-block mt-2 text-[#1A1814] text-xs font-bold hover:underline border-b border-[#FFBF00]"
                  >
                    Scopri la sede →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sedi" className="bg-[#1A1814] text-white px-6 py-3 rounded-md font-semibold hover:bg-black transition-colors">
              Vedi tutte le sedi
            </Link>
            <Link href="/unisciti" className="border-2 border-[#1A1814] text-[#1A1814] px-6 py-3 rounded-md font-semibold hover:bg-[#1A1814] hover:text-white transition-colors">
              Apri Rethink nella tua università
            </Link>
          </div>
        </div>
      </section>

      {/* ULTIMI ARTICOLI: la sezione compare solo quando c'è qualcosa da leggere. */}
      {ultimi.length > 0 && (
        <section className="py-20 px-4 sm:px-6 bg-[#F9F9F7]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <p className="text-[#FFBF00] text-sm font-bold uppercase tracking-widest mb-3 bg-[#1A1814] inline-block px-2 py-0.5">Articoli</p>
                <h2 className="text-3xl font-bold mt-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  Idee, dati e proposte
                </h2>
              </div>
              <Link href="/articoli" className="text-[#1A1814] font-bold hover:underline border-b-2 border-[#FFBF00] self-start sm:self-auto">
                Tutti gli articoli →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ultimi.map((a) => (
                <SchedaArticolo key={a.slug} articolo={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA FINALE */}
      <section className="bg-[#1A1814] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-5" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Vuoi portare Rethink nella tua università?
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Che tu voglia fondare una nuova sede o entrare in una già esistente, siamo qui per aiutarti. Rethink prende la forma di chi decide di costruirla.
          </p>
          <Link
            href="/unisciti"
            className="bg-[#FFBF00] text-[#1A1814] px-8 py-3 rounded-md font-bold hover:bg-[#E6AC00] transition-colors inline-block"
          >
            Scopri come fare
          </Link>
        </div>
      </section>
    </>
  );
}
