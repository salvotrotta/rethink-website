import IntestazioneArticoli from "@/components/IntestazioneArticoli";
import { ElencoArticoli } from "@/components/articoli";
import { articoli } from "@/lib/articoli";
import { metadatiPagina } from "@/lib/metadati";

export const metadata = metadatiPagina({
  titolo: "Articoli",
  descrizione:
    "Analisi e proposte di giovani, studenti e dottorandi di Rethink su università, ricerca e lavoro, con dati e fonti.",
  percorso: "/articoli",
});

export default function Articoli() {
  return (
    <>
      <IntestazioneArticoli
        sopratitolo="Articoli"
        titolo="Idee, dati e proposte"
        attiva={null}
      />
      <section className="py-14 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-6xl mx-auto">
          <ElencoArticoli articoli={articoli()} />
        </div>
      </section>
    </>
  );
}
