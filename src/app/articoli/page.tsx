import IntestazioneArticoli from "@/components/IntestazioneArticoli";
import { ElencoArticoli } from "@/components/articoli";
import { articoli } from "@/lib/articoli";

export const metadata = {
  title: "Articoli – Rethink",
  description:
    "Analisi e proposte di studenti e ricercatori di Rethink su università, ricerca e lavoro, con dati e fonti.",
};

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
