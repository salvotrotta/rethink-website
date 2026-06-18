export const metadata = {
  title: "Statuto – ReThink",
  description: "Lo Statuto dell'associazione ReThink: struttura giuridica, scopo, associati e organi.",
};

const articoli = [
  {
    num: "Art. 1",
    titolo: "Natura giuridica",
    testo: "ReThink è un'associazione non riconosciuta, apartitica, aconfessionale, senza scopo di lucro, costituita ai sensi degli artt. 36 e ss. del Codice civile. Opera a livello nazionale e internazionale con durata illimitata.",
  },
  {
    num: "Art. 2",
    titolo: "Marchio e segni distintivi",
    testo: "Il marchio \"Rethink\" è di titolarità esclusiva dell'associazione. Può essere concesso in uso ad altri enti tramite un Accordo di Affiliazione scritto, approvato dal Consiglio Direttivo. La revoca è possibile in qualsiasi momento con motivazione.",
  },
  {
    num: "Art. 3",
    titolo: "Scopo",
    testo: "Finalità civiche, solidaristiche e di utilità sociale. L'associazione promuove: merito e competenza, razionalità e uso dell'evidenza scientifica, pragmatismo nella formulazione di proposte, libertà individuale, economia di mercato e concorrenza, trasparenza decisionale e solidarietà.",
  },
  {
    num: "Art. 4",
    titolo: "Attività",
    testo: "L'associazione può organizzare corsi, seminari, convegni e dibattiti; collaborare con università per borse di studio e programmi di scambio; sviluppare e finanziare progetti di ricerca; pubblicare riviste, opuscoli e materiali digitali; partecipare alle elezioni degli organi di rappresentanza studentesca.",
  },
  {
    num: "Artt. 5–8",
    titolo: "Associati",
    testo: "Possono aderire persone fisiche under 36 che condividano valori e finalità. Gli associati hanno diritto di voto, di essere informati di tutte le attività e di esaminare i libri sociali. Hanno il dovere di versare annualmente la quota e rispettare Statuto e regolamenti.",
  },
  {
    num: "Artt. 9–10",
    titolo: "Risorse economiche",
    testo: "Le fonti sono: quote associative, donazioni, contributi pubblici e privati, proventi commerciali marginali. Il fondo comune non è mai ripartibile tra i soci. L'esercizio sociale va dal 1° settembre al 31 agosto.",
  },
  {
    num: "Art. 12",
    titolo: "Assemblea Nazionale",
    testo: "Organo sovrano dell'associazione. Composta da Referenti eletti dagli associati. Approva il rendiconto, elegge gli organi, approva i regolamenti. Si riunisce almeno una volta l'anno.",
  },
  {
    num: "Art. 13",
    titolo: "Consiglio Direttivo",
    testo: "Eletto dall'Assemblea Nazionale, composto da un numero dispari tra 7 e 21 membri. Gestisce l'associazione, delibera sulle ammissioni, determina la quota associativa e approva gli Accordi di Affiliazione.",
  },
  {
    num: "Art. 14",
    titolo: "Presidente Nazionale",
    testo: "Legale rappresentante dell'associazione. Presiede il Consiglio Direttivo, firma atti e documenti, istituisce le strutture territoriali.",
  },
  {
    num: "Art. 15",
    titolo: "Consiglio di Garanzia",
    testo: "Composto da 3 a 7 membri, è l'organo di controllo, interpretazione e disciplina. Verifica la regolarità delle elezioni, delibera provvedimenti disciplinari e decide sui ricorsi.",
  },
  {
    num: "Art. 18",
    titolo: "Scioglimento",
    testo: "Richiede il voto favorevole di almeno 3/4 degli associati aventi diritto di voto in Assemblea straordinaria. Il patrimonio residuo viene devoluto ad associazioni con finalità analoghe o a fini di pubblica utilità.",
  },
];

export default function Statuto() {
  return (
    <>
      <section className="bg-[#0A0A0A] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#4A90D9] text-sm font-semibold uppercase tracking-widest mb-4">Documento ufficiale</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            Statuto dell&apos;Associazione
          </h1>
          <p className="text-gray-400 text-sm mt-4">Bozza 1 – 2025 · Versione sintetica per il web</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-10 text-sm text-[#1C3564]">
            Questa è una versione sintetica e leggibile dello Statuto. Per il testo integrale ufficiale, contattaci a{" "}
            <a href="mailto:info@rethink-uni.it" className="font-semibold hover:underline">info@rethink-uni.it</a>.
          </div>

          <div className="space-y-6">
            {articoli.map((a) => (
              <div key={a.num} className="bg-white border border-[#EBEBEB] rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="text-xs font-bold text-[#1C3564] bg-blue-50 px-2 py-1 rounded shrink-0 mt-0.5">
                    {a.num}
                  </span>
                  <div>
                    <h3 className="font-bold mb-2" style={{ fontFamily: "Playfair Display, serif" }}>{a.titolo}</h3>
                    <p className="text-[#4A4A4A] text-sm leading-relaxed">{a.testo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
