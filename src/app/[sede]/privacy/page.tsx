import Link from "next/link";
import { notFound } from "next/navigation";

import sedi from "@/data/sedi.json";
import { INFORMATIVE } from "@/data/informative";

// Esistono solo le pagine delle sedi presenti in INFORMATIVE: ogni altro
// slug dà 404 invece di essere generato al volo.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(INFORMATIVE).map((sede) => ({ sede }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sede: string }>;
}) {
  const { sede } = await params;
  const dati = INFORMATIVE[sede];
  const haNewsletter = Boolean(sedi.find((x) => x.slug === sede)?.newsletter);

  return {
    // Il nome del titolare, non la città: a Roma ci sono due sedi. Il
    // titolo resta quello di sempre finché la sede non raccoglie anche
    // iscrizioni alla newsletter: non va cambiato sulle pagine già
    // stampate in locandina se lì non cambia nulla.
    title: haNewsletter
      ? `Informativa privacy – ${dati?.titolare ?? "Rethink"}`
      : `Informativa foto e riprese eventi – ${dati?.titolare ?? "Rethink"}`,
    description: haNewsletter
      ? "Informativa sul trattamento dei dati personali per foto e riprese eventi e per l'iscrizione alla newsletter, ai sensi dell'art. 13 del Regolamento UE 2016/679."
      : "Informativa sul trattamento dei dati personali per foto e riprese durante gli eventi, ai sensi dell'art. 13 del Regolamento UE 2016/679.",
    // Pagina di servizio: il link vive sulle locandine, non deve comparire
    // nei risultati di ricerca né essere seguita dai crawler.
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function InformativaEventi({
  params,
}: {
  params: Promise<{ sede: string }>;
}) {
  const { sede } = await params;
  const dati = INFORMATIVE[sede];
  const s = sedi.find((x) => x.slug === sede);
  if (!dati || !s) notFound();

  const haNewsletter = Boolean(s.newsletter);

  const introEventi = (
    <p className="text-[#4A4A4A] text-sm italic leading-relaxed border-l-4 border-[#FFBF00] bg-[#F9F9F7] px-5 py-4 mb-10">
      La presente informativa è resa disponibile in fase di iscrizione
      all&rsquo;evento. Iscrivendosi e/o partecipando all&rsquo;evento,
      l&rsquo;interessato dichiara di aver preso visione della presente
      informativa. Il consenso alle riprese, ove richiesto, è raccolto
      tramite apposita casella di spunta nel modulo di iscrizione online e/o
      secondo le modalità descritte al paragrafo &ldquo;Base
      giuridica&rdquo;.
    </p>
  );

  return (
    <article className="px-4 sm:px-6 py-14 sm:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Intestazione */}
        <header className="text-center border-b border-[#E0E0E0] pb-8 mb-10">
          <p className="text-[#4A4A4A] text-xs font-semibold uppercase tracking-[0.14em] mb-4">
            {dati.titolare}
          </p>
          <h1
            className="text-3xl sm:text-4xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {haNewsletter ? "Informativa privacy" : "Foto e riprese eventi"}
          </h1>
          <p className="text-[#4A4A4A] text-sm italic mt-4 leading-relaxed">
            Informativa sul trattamento dei dati personali ai sensi dell&rsquo;art. 13
            Regolamento UE 2016/679
          </p>
        </header>

        {!haNewsletter && introEventi}

        <Sezione titolo="Titolare del trattamento">
          <p>
            Il Titolare del trattamento è <strong>{dati.titolare}</strong>,
            associazione non riconosciuta
            {dati.rappresentante ? (
              <>
                , nella persona del suo legale rappresentante{" "}
                <strong>{dati.rappresentante}</strong>, contattabile
              </>
            ) : (
              <>, contattabile</>
            )}{" "}
            all&rsquo;indirizzo e-mail{" "}
            <a
              href={`mailto:${dati.email}`}
              className="font-semibold text-[#1A1814] underline underline-offset-2 break-all"
            >
              {dati.email}
            </a>
            .
          </p>
        </Sezione>

        {dati.contattoPrivacy && (
          <Sezione titolo="Contatti per la protezione dei dati">
            <p>
              Per qualsiasi questione relativa al trattamento dei dati
              personali, comprese le richieste di cui al paragrafo
              &ldquo;Diritti dell&rsquo;interessato&rdquo;,{" "}
              {dati.contattoPrivacy.ruolo.toLowerCase()}{" "}
              è contattabile all&rsquo;indirizzo e-mail{" "}
              <a
                href={`mailto:${dati.contattoPrivacy.email}`}
                className="font-semibold text-[#1A1814] underline underline-offset-2 break-all"
              >
                {dati.contattoPrivacy.email}
              </a>
              .
            </p>
          </Sezione>
        )}

        {/* Titolare e contatti valgono per tutti i trattamenti e restano in
            cima. Quando la pagina ne copre più d'uno, ogni blocco ha la sua
            etichetta: senza, "Finalità del trattamento" qui sotto
            sembrerebbe valere anche per la newsletter. */}
        {haNewsletter && (
          <>
            <Titolo>Foto e riprese eventi</Titolo>
            {introEventi}
          </>
        )}

        <Sezione titolo="Finalità del trattamento e conferimento dei dati">
          <p>
            Il trattamento dei dati consiste nella realizzazione di riprese
            audiovisive, fotografie e registrazioni audio dei soggetti che
            partecipano all&rsquo;evento aperto al pubblico organizzato
            dall&rsquo;Associazione e persegue le seguenti finalità:
          </p>
          <Elenco>
            <li>
              realizzazione di video e materiale multimediale da utilizzare come
              strumento informativo sull&rsquo;attività dell&rsquo;Associazione,
              nonché di promozione di altri eventi o incontri organizzati
              dall&rsquo;Associazione stessa;
            </li>
            <li>
              pubblicazione delle fotografie, dei video e dei materiali
              multimediali sulle piattaforme social, anche non direttamente
              gestite dall&rsquo;Associazione, nonché trasmissione ai media con
              finalità di cronaca o promozione dell&rsquo;attività
              dell&rsquo;Associazione.
            </li>
          </Elenco>
        </Sezione>

        <Sezione titolo="Base giuridica">
          <Elenco>
            <li>
              Legittimo interesse dell&rsquo;Associazione a promuovere i propri
              eventi e far conoscere le proprie attività di carattere culturale,
              civico, formativo e ricreativo, ai sensi del Reg. UE 2016/679 art.
              6 par. 1 lett. f);
            </li>
            <li>
              Consenso dell&rsquo;interessato, ai sensi del Reg. UE 2016/679 art.
              6 par. 1 lett. a):
              <Elenco annidato>
                <li>
                  in fase di iscrizione online all&rsquo;evento (ad esempio
                  tramite piattaforma Luma o analoghe), attraverso la spunta
                  dell&rsquo;apposita casella di consenso alle riprese
                  fotografiche e video;
                </li>
                <li>
                  in occasione di eventi aperti al pubblico e liberamente
                  accessibili organizzati dall&rsquo;Associazione, attraverso
                  l&rsquo;atto volontario dell&rsquo;interessato di recarsi
                  presso spazi (ad esempio aule universitarie, sale convegni,
                  spazi di eventi, ecc.) nei quali è stato attivato un servizio
                  di riprese fotografiche o video;
                </li>
                <li>
                  in tutti gli altri casi, attraverso la compilazione di apposito
                  modulo da parte dei soggetti direttamente coinvolti nella
                  ripresa/registrazione.
                </li>
              </Elenco>
            </li>
          </Elenco>
          <p>
            Qualora durante le riprese audiovisive vengano spontaneamente
            dichiarate opinioni politiche, convinzioni religiose o filosofiche,
            appartenenza sindacale, dati relativi alla salute o alla vita
            sessuale o altri dati particolari di cui all&rsquo;art. 9 GDPR, il
            trattamento di tali dati avviene esclusivamente sulla base della
            manifestazione di intento dell&rsquo;interessato di rendere
            manifestamente pubblici tali dati, ai sensi dell&rsquo;art. 9 par. 2
            lett. e) GDPR.
          </p>
          <p>Tale manifestazione di intento è espressa:</p>
          <Elenco>
            <li>
              attraverso la libera scelta di dichiarare spontaneamente tali
              opinioni in un contesto pubblico ripreso;
            </li>
            <li>
              ovvero, tramite l&rsquo;accettazione della presente informativa e/o
              la spunta della casella di consenso in fase di iscrizione.
            </li>
          </Elenco>
        </Sezione>

        <Sezione titolo="Interessati">
          <p>
            Le telecamere sono orientate in modo tale da inquadrare una parte del
            pubblico presente nella sala (localizzato nelle zone espressamente
            specificate), oltre che le persone presenti sul palco. Chi non
            desideri essere ripreso dovrà pertanto avere l&rsquo;accortezza di
            porsi nelle zone al di fuori della ripresa delle telecamere, oppure
            potrà avvisare direttamente i volontari presenti e farsi indicare i
            posti esclusi dal raggio degli strumenti di ripresa delle immagini.
          </p>
        </Sezione>

        <Sezione titolo="Categorie di destinatari dei dati">
          <p>
            I dati potranno essere trasmessi a soggetti terzi, di cui
            l&rsquo;Associazione si avvale come responsabili del trattamento, e
            potranno altresì essere diffusi su piattaforme social (ad esempio
            Facebook, Instagram, YouTube, TikTok), gestite anche non direttamente
            dall&rsquo;Associazione, nonché trasmessi ai media (ad esempio organi
            di stampa locali o nazionali, testate giornalistiche online) per fini
            informativi, divulgativi e promozionali nell&rsquo;ambito delle
            attività di comunicazione dell&rsquo;Associazione.
          </p>
        </Sezione>

        <Sezione titolo="Tipologie e origine dei dati trattati">
          <p>
            I dati trattati sono le riprese audiovisive, le immagini e le
            registrazioni audio.
          </p>
        </Sezione>

        <Sezione titolo="Soggetti autorizzati al trattamento">
          <p>
            I dati saranno trattati da soggetti specificatamente designati dal
            Titolare, debitamente autorizzati ed istruiti con le modalità
            ritenute da esso più opportune ai sensi dell&rsquo;art.
            2-quaterdecies D.lgs. 101/2018.
          </p>
        </Sezione>

        <Sezione titolo="Trasferimento dati personali in Paesi extra UE">
          <p>
            Non è previsto il trasferimento di dati in Paesi extra-europei.
            Qualora si rendesse necessario il trasferimento di dati in Paesi
            extra-UE, ad esempio per la pubblicazione su piattaforme social con
            sede extra-UE, il Titolare assicura che tale trasferimento avverrà in
            conformità alle disposizioni di legge applicabili, stipulando, se
            necessario, accordi che garantiscano un livello di protezione
            adeguato e/o adottando le clausole contrattuali standard previste
            dall&rsquo;Unione Europea.
          </p>
        </Sezione>

        <Sezione titolo="Periodo di conservazione">
          <p>
            I dati personali raccolti saranno conservati per il periodo di 1 anno
            dal conseguimento delle finalità previste, dopodiché saranno
            cancellati.
          </p>
          <p>
            In ogni caso, il trattamento potrebbe proseguire ad opera delle
            piattaforme di condivisione, dei canali social, nonché dei soggetti
            terzi che potrebbero aver acquisito e/o comunicato o diffuso a loro
            volta i dati personali oggetto di trattamento.
          </p>
        </Sezione>

        <Sezione titolo="Profilazione">
          <p>
            Il Titolare non adotta processi decisionali automatizzati, compresa
            la profilazione, di cui all&rsquo;articolo 22, paragrafi 1 e 4, del
            Regolamento UE n. 679/2016.
          </p>
        </Sezione>

        {haNewsletter && (
          <>
            <Titolo>Iscrizione alla newsletter</Titolo>

            <p className="text-[#4A4A4A] text-sm italic leading-relaxed border-l-4 border-[#FFBF00] bg-[#F9F9F7] px-5 py-4 mb-10">
              La presente sezione si applica a chi si iscrive alla
              newsletter della sede tramite il modulo pubblicato alla
              pagina{" "}
              <Link
                href={`/${sede}`}
                className="font-semibold underline underline-offset-2"
              >
                rethinkuni.it/{sede}
              </Link>
              . L&rsquo;iscrizione diventa efficace solo dopo la conferma
              tramite il link ricevuto via e-mail (procedura di doppia
              conferma, o &ldquo;double opt-in&rdquo;).
            </p>

            <Sezione titolo="Finalità del trattamento">
              <Elenco>
                <li>
                  Invio di comunicazioni periodiche (newsletter) relative
                  alle attività, agli eventi e alle iniziative della sede
                  e, più in generale, dell&rsquo;Associazione, a partire
                  da un&rsquo;e-mail di benvenuto con le informazioni per
                  associarsi;
                </li>
                <li>
                  solo se l&rsquo;interessato lo richiede con
                  l&rsquo;apposita casella del modulo, invio via e-mail
                  del link per chiedere di entrare nel gruppo WhatsApp
                  della sede. Il numero di telefono indicato nel modulo
                  serve agli amministratori del gruppo per riconoscere chi
                  chiede di entrare e approvare la richiesta.
                </li>
              </Elenco>
            </Sezione>

            <Sezione titolo="Base giuridica">
              <p>
                Consenso dell&rsquo;interessato, ai sensi del Reg. UE
                2016/679 art. 6 par. 1 lett. a), espresso con due caselle
                distinte del modulo: una, obbligatoria per iscriversi, per
                la newsletter; l&rsquo;altra, facoltativa, per il gruppo
                WhatsApp. Il consenso alla newsletter è confermato con la
                procedura di doppia conferma descritta sopra.
              </p>
              <p>
                Il conferimento dei dati è facoltativo, ma quelli indicati
                come obbligatori nel modulo sono necessari per ricevere la
                newsletter. Il consenso può essere revocato in qualsiasi
                momento, senza pregiudicare la liceità del trattamento
                svolto prima della revoca: per la newsletter con il link
                di cancellazione in calce a ogni comunicazione, per il
                gruppo uscendo dal gruppo stesso, e in ogni caso scrivendo
                ai recapiti indicati in questa informativa.
              </p>
            </Sezione>

            <Sezione titolo="Tipologie di dati trattati">
              <p>
                Nome, cognome, indirizzo e-mail, profilo dichiarato (ad
                esempio studente universitario, dottorando, lavoratore) e
                indicazione dell&rsquo;eventuale iscrizione
                all&rsquo;Associazione. Solo per chi chiede di entrare nel
                gruppo WhatsApp, anche il numero di telefono.
              </p>
            </Sezione>

            <Sezione titolo="Categorie di destinatari dei dati">
              <p>
                Per la raccolta delle iscrizioni e l&rsquo;invio delle
                comunicazioni il Titolare si avvale di Brevo SAS, con sede
                legale in Francia, quale responsabile del trattamento ai
                sensi dell&rsquo;art. 28 del Regolamento UE 2016/679.
                Qualora, nell&rsquo;ambito dell&rsquo;erogazione del
                servizio, si rendesse necessario un trasferimento di dati
                verso Paesi extra-UE, il fornitore garantisce
                l&rsquo;adozione di clausole contrattuali standard o di
                altre garanzie adeguate previste dalla normativa europea.
              </p>
              <p>
                Per chi entra nel gruppo WhatsApp, il numero di telefono e
                il nome del profilo WhatsApp sono visibili agli
                amministratori e agli altri partecipanti al gruppo. Il
                servizio è fornito da WhatsApp Ireland Limited, che tratta
                i dati come autonomo titolare secondo la propria
                informativa e può trasferirli verso Paesi extra-UE sulla
                base delle garanzie previste dalla normativa europea.
              </p>
            </Sezione>

            <Sezione titolo="Periodo di conservazione">
              <p>
                I dati sono conservati per tutta la durata
                dell&rsquo;iscrizione e cancellati in caso di revoca del
                consenso o di cancellazione dalla lista, salvo il tempo
                necessario a dare seguito alla richiesta. La
                partecipazione al gruppo WhatsApp dura finché
                l&rsquo;interessato non ne esce o non chiede di esserne
                rimosso.
              </p>
            </Sezione>
          </>
        )}

        {haNewsletter && <Titolo>Per entrambi i trattamenti</Titolo>}

        <Sezione titolo="Diritti dell'interessato">
          <p>
            L&rsquo;interessato potrà far valere, in qualsiasi momento e ove
            possibile, nei casi previsti dalla legge, i suoi diritti, in
            particolare con riferimento al diritto di accesso ai suoi dati
            personali, al diritto di ottenerne la rettifica, l&rsquo;aggiornamento
            e la cancellazione, nonché con riferimento al diritto di portabilità
            dei dati e al diritto di limitazione e opposizione al trattamento. I
            diritti potranno essere esercitati rivolgendosi al Titolare ai
            riferimenti sopra indicati.
          </p>
          <p>
            L&rsquo;interessato ha il diritto di proporre reclamo
            all&rsquo;Autorità di controllo competente nello Stato membro in cui
            risiede abitualmente o lavora, o dello Stato in cui si è verificata
            la presunta violazione.
          </p>
          <p>
            In caso di trattamenti di dati effettuati dietro prestazione di
            consenso da parte dell&rsquo;interessato, questi ha il diritto di
            revocare il consenso in qualsiasi momento senza pregiudicare la
            liceità del trattamento basata sul consenso prestato prima della
            revoca.
          </p>
          <p>
            I dati di contatto dell&rsquo;Autorità nazionale Garante per la
            protezione dei dati personali sono disponibili all&rsquo;indirizzo{" "}
            <a
              href="https://www.garanteprivacy.it/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1814] font-semibold underline underline-offset-2 break-all"
            >
              www.garanteprivacy.it
            </a>
            .
          </p>
        </Sezione>

        <footer className="mt-12 pt-6 border-t border-[#E0E0E0]">
          <Link
            href={`/${sede}`}
            className="text-[#4A4A4A] text-sm hover:text-[#1A1814] transition-colors"
          >
            ← {dati.titolare}
          </Link>
        </footer>
      </div>
    </article>
  );
}

/**
 * Etichetta di un gruppo di sezioni, quando la pagina copre più di una
 * finalità di trattamento (es. foto eventi + newsletter): segna dove
 * inizia l'uno e dove l'altro, con un peso visivo maggiore delle Sezioni
 * che contiene.
 */
function Titolo({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xl font-bold mb-6 pt-8 border-t border-[#E0E0E0] text-[#1A1814]"
      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
    >
      {children}
    </h2>
  );
}

function Sezione({
  titolo,
  children,
}: {
  titolo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-9">
      <h2
        className="text-lg font-bold mb-3 text-[#1A1814]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {titolo}
      </h2>
      <div className="text-[#4A4A4A] leading-relaxed space-y-3 text-[0.95rem]">
        {children}
      </div>
    </section>
  );
}

function Elenco({
  children,
  annidato = false,
}: {
  children: React.ReactNode;
  annidato?: boolean;
}) {
  return (
    <ul
      className={
        annidato
          ? "list-[circle] list-outside pl-5 mt-2 space-y-2"
          : "list-disc list-outside pl-5 space-y-2"
      }
    >
      {children}
    </ul>
  );
}
