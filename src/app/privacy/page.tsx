export const metadata = {
  title: "Privacy – Rethink",
  description:
    "Come Rethink tratta i dati personali raccolti tramite il sito e il modulo di contatto.",
};

// NOTA PER CHI CURA IL SITO
// I segnaposto fra parentesi quadre vanno compilati con i dati reali
// dell'associazione prima di pubblicare. Non sono opzionali: senza titolare
// identificabile l'informativa non assolve al suo scopo.

export default function Privacy() {
  return (
    <>
      <section className="bg-[#1A1814] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#FFBF00] text-sm font-semibold uppercase tracking-widest mb-4">
            Privacy
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Come trattiamo i tuoi dati
          </h1>
          <p className="text-gray-300 mt-4 text-lg leading-relaxed">
            In breve: raccogliamo solo quello che ci scrivi nel modulo di contatto,
            e lo usiamo solo per risponderti.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-3xl mx-auto">
          <Blocco titolo="Chi tratta i dati">
            <p>
              Il titolare del trattamento è{" "}
              <strong>[DENOMINAZIONE COMPLETA DELL&apos;ASSOCIAZIONE]</strong>, con
              sede in <strong>[INDIRIZZO SEDE LEGALE]</strong>
              <strong>[, iscritta al RUNTS con il numero …]</strong>.
            </p>
            <p>
              Per qualsiasi questione relativa ai tuoi dati puoi scrivere a{" "}
              <a
                href="mailto:info@rethinkuni.it"
                className="font-semibold border-b border-[#FFBF00] hover:text-[#1A1814]"
              >
                info@rethinkuni.it
              </a>
              .
            </p>
          </Blocco>

          <Blocco titolo="Quali dati raccogliamo">
            <p>
              Solo quelli che inserisci nel modulo della pagina{" "}
              <em>Unisciti</em>: nome e cognome, indirizzo email, università e, se
              scegli di compilarli, corso di studi e messaggio libero.
            </p>
            <p>
              Non usiamo cookie di profilazione e non ti tracciamo mentre navighi
              il sito.
            </p>
          </Blocco>

          <Blocco titolo="Perché li trattiamo">
            <p>
              Per leggere la tua richiesta e risponderti, e per metterti in
              contatto con altre persone della tua università se ci hai chiesto di
              fondare una sede.
            </p>
            <p>
              La base giuridica è il nostro legittimo interesse a dare seguito a
              una richiesta che ci hai rivolto tu, insieme alle misure
              precontrattuali necessarie per un&apos;eventuale adesione
              all&apos;associazione.
            </p>
          </Blocco>

          <Blocco titolo="Chi altro li vede">
            <p>
              Il modulo genera un&apos;email. Nel percorso intervengono due
              fornitori, entrambi soggetti al GDPR:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong>Brevo</strong> (Sendinblue SAS, Francia) — trasporta il
                messaggio dal sito alla nostra casella.
              </li>
              <li>
                <strong>Google</strong> — ospita la casella su cui riceviamo la
                posta.
              </li>
            </ul>
            <p>
              Non vendiamo i tuoi dati, non li cediamo a terzi per finalità
              pubblicitarie e non li trasferiamo a nessun altro.
            </p>
          </Blocco>

          <Blocco titolo="Per quanto tempo">
            <p>
              Conserviamo i messaggi ricevuti per{" "}
              <strong>[INDICARE UN PERIODO — es. 24 mesi]</strong> dalla tua
              richiesta, poi li cancelliamo. Se diventi socio, i dati necessari al
              rapporto associativo sono conservati per il tempo previsto dagli
              obblighi di legge.
            </p>
          </Blocco>

          <Blocco titolo="I tuoi diritti">
            <p>
              Puoi chiederci in ogni momento di accedere ai tuoi dati, correggerli,
              cancellarli, limitarne il trattamento od opporti ad esso. È
              sufficiente scrivere a{" "}
              <a
                href="mailto:info@rethinkuni.it"
                className="font-semibold border-b border-[#FFBF00] hover:text-[#1A1814]"
              >
                info@rethinkuni.it
              </a>
              : ti rispondiamo entro un mese.
            </p>
            <p>
              Se ritieni che il trattamento violi il Regolamento, puoi presentare
              reclamo al Garante per la protezione dei dati personali
              (garanteprivacy.it).
            </p>
          </Blocco>

          <p className="text-[#4A4A4A] text-xs mt-10 pt-6 border-t border-[#E0E0E0]">
            Ultimo aggiornamento: [DATA]. Se cambieremo qualcosa di rilevante,
            aggiorneremo questa pagina.
          </p>
        </div>
      </section>
    </>
  );
}

function Blocco({
  titolo,
  children,
}: {
  titolo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2
        className="text-xl font-bold mb-3 text-[#1A1814]"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        {titolo}
      </h2>
      <div className="text-[#4A4A4A] leading-relaxed space-y-3">{children}</div>
    </div>
  );
}
