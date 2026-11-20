import { GrigliaEventi } from "@/components/eventi";
import { IconaLuma } from "@/components/social";
import { eventiLuma, LUMA_NAZIONALE } from "@/lib/eventi";
import { metadatiPagina } from "@/lib/metadati";

// La pagina è statica e si rigenera al massimo ogni 15 minuti
// (AGGIORNAMENTO in src/lib/eventi.ts): un nuovo evento su Luma compare
// qui entro mezz'ora, senza rifare il deploy.
export const revalidate = 900;

export const metadata = metadatiPagina({
  titolo: "Eventi",
  descrizione:
    "Incontri, dibattiti e iniziative delle sedi Rethink in tutta Italia, in un unico calendario.",
  percorso: "/eventi",
});

export default async function EventiPage() {
  const { prossimi, passati } = await eventiLuma();
  const recenti = passati.slice(0, 6);

  return (
    <>
      <section className="bg-[#1A1814] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#FFBF00] text-sm font-semibold uppercase tracking-widest mb-4">Eventi</p>
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Dove ci incontriamo
          </h1>
          <p className="text-gray-300 mt-4 text-lg">
            Gli eventi di tutte le sedi Rethink, in un unico calendario. Per
            iscriverti apri l&rsquo;evento: la registrazione è su Luma.
          </p>
          <a
            href={LUMA_NAZIONALE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 mt-8 bg-[#FFBF00] text-[#1A1814] px-6 py-3 rounded-md font-bold hover:bg-[#E6AC00] transition-colors"
          >
            <IconaLuma className="w-[18px] h-[18px]" />
            Segui il calendario su Luma
          </a>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-2xl font-bold mb-8"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Prossimi eventi
          </h2>
          {prossimi.length > 0 ? (
            <GrigliaEventi eventi={prossimi} />
          ) : (
            <div className="bg-white border border-[#E0E0E0] rounded-lg p-8 max-w-2xl">
              <p className="text-[#1A1814] font-semibold">Nessun evento in calendario, per ora.</p>
              <p className="text-[#4A4A4A] mt-2 leading-relaxed">
                Segui il calendario Rethink su Luma: ti avvisa quando una sede
                pubblica un nuovo appuntamento.
              </p>
            </div>
          )}
        </div>
      </section>

      {recenti.length > 0 && (
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-2xl font-bold mb-8"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Eventi passati
            </h2>
            <GrigliaEventi eventi={recenti} passati />
          </div>
        </section>
      )}

      {/* Per le sedi: come far comparire qui un evento. */}
      <section className="py-12 px-4 sm:px-6 bg-[#EBEBEB]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#4A4A4A] text-sm leading-relaxed">
            <strong className="text-[#1A1814]">Organizzi un evento per la tua sede?</strong>{" "}
            Crealo sul Luma della sede e aggiungi{" "}
            <a href={LUMA_NAZIONALE} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1A1814] underline">
              luma.com/rethink_uni
            </a>{" "}
            come co-organizzatore: entro mezz&rsquo;ora compare anche qui.
          </p>
        </div>
      </section>
    </>
  );
}
