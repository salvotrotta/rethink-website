import Link from "next/link";
import { notFound } from "next/navigation";

import sedi from "@/data/sedi.json";
import { SOCIAL, SOCIAL_ORDINE, urlNazionale, IconaLuma } from "@/components/social";
import NewsletterForm from "@/components/NewsletterForm";
import { INFORMATIVE } from "@/data/informative";
import { SchedaArticolo } from "@/components/articoli";
import { articoliInVetrina } from "@/lib/articoli";
import { metadatiPagina } from "@/lib/metadati";
import { emailPubblica } from "@/lib/email-sedi";
import { Mail } from "lucide-react";
import { GrigliaEventi } from "@/components/eventi";
import { eventiLuma } from "@/lib/eventi";

// Hanno una pagina le sedi con "pagina": true in sedi.json. Di norma sono
// le fondate, ma anche una sede in formazione può averne bisogno: UniBs ha
// un'informativa privacy da stampare sulle locandine, e quella rimanda qui.
// Quando si fonda una sede nuova, il flag va messo insieme allo stato.
// Qualsiasi altro slug dà 404 invece di essere generato al volo.
const conPagina = sedi.filter((s) => s.pagina);

export const dynamicParams = false;

// Rigenera al massimo ogni 15 minuti, per i prossimi eventi Luma della sede.
export const revalidate = 900;

export function generateStaticParams() {
  return conPagina.map((s) => ({ sede: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sede: string }>;
}) {
  const { sede } = await params;
  const s = conPagina.find((x) => x.slug === sede);
  if (!s) return {};

  return metadatiPagina({
    titolo: s.nome,
    descrizione:
      s.stato === "fondata"
        ? `La sede Rethink presso ${s.nome}, a ${s.citta}. Come seguirla e come partecipare alle attività.`
        : `Rethink sta nascendo presso ${s.nome}, a ${s.citta}. Come seguire la fondazione della sede e come darci una mano.`,
    percorso: `/${s.slug}`,
  });
}

export default async function SedePage({
  params,
}: {
  params: Promise<{ sede: string }>;
}) {
  const { sede } = await params;
  const s = conPagina.find((x) => x.slug === sede);
  if (!s) notFound();

  const inFormazione = s.stato !== "fondata";

  // Se la sede non ha ancora profili propri, la pagina rimanda al nazionale:
  // meglio di un vicolo cieco senza nessun modo per farsi sentire.
  const propri = SOCIAL_ORDINE.filter((c) => s[c]);
  const haCanaliPropri = propri.length > 0;
  const canali = haCanaliPropri
    ? propri.map((c) => ({ chiave: c, url: s[c]! }))
    : SOCIAL_ORDINE.flatMap((c) => {
        const url = urlNazionale(c);
        return url ? [{ chiave: c, url }] : [];
      });

  // Dove la sede non è ancora fondata, il gruppo WhatsApp è il posto dove
  // si sta organizzando: cambia il tono dell'invito, non solo il pulsante.
  const haGruppo = Boolean(s.whatsapp);
  // Email della sede, solo se pubblicabile (sede fondata con informativa
  // privacy). L'oggetto precompilato aiuta chi la riceve a smistare.
  const email = emailPubblica(s);
  const mailtoPartecipa = email
    ? `mailto:${email}?subject=${encodeURIComponent(`Voglio partecipare a ${INFORMATIVE[s.slug]?.titolare ?? `Rethink ${s.citta}`}`)}`
    : "";

  // La newsletter raccoglie dati personali: il modulo compare solo se la
  // sede ha anche un'informativa pubblicata a cui rimandare.
  const informativa = INFORMATIVE[s.slug];
  const newsletter = s.newsletter && informativa ? s.newsletter : null;

  const articoliSede = articoliInVetrina().filter((a) => a.sede === s.slug).slice(0, 3);

  // Eventi della sede: quelli del suo calendario Luma (campo "luma" in
  // sedi.json) e quelli del nazionale che organizza lei.
  const tuttiEventi = s.luma ? await eventiLuma() : { prossimi: [], passati: [] };
  const diSede = (e: { organizzatore: { sede: string | null } | null }) =>
    e.organizzatore?.sede === s.slug;
  const eventiSede = tuttiEventi.prossimi.filter(diSede).slice(0, 6);
  const eventiPassatiSede = tuttiEventi.passati.filter(diSede).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="bg-[#1A1814] text-white py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/sedi"
            className="text-gray-400 text-sm hover:text-white transition-colors"
          >
            ← Tutte le sedi
          </Link>
          <p className="text-[#FFBF00] text-sm font-semibold uppercase tracking-widest mt-6 mb-3">
            {inFormazione ? `Sede in formazione · ${s.citta}` : `Sede di ${s.citta}`}
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {s.nome}
          </h1>
          <p className="text-gray-300 mt-4">
            {s.citta} · {s.regione}
            {s.dataFondazione && ` · Fondata il ${s.dataFondazione}`}
          </p>

          {inFormazione && (
            <p className="text-gray-300 mt-5 max-w-2xl leading-relaxed">
              La sede presso {s.nome}{" "}
              non è ancora fondata: un gruppo di
              studenti la sta mettendo in piedi. Se studi qui e vuoi esserci
              dall&rsquo;inizio, questo è il momento buono per farti avanti.
            </p>
          )}

          <div className="flex flex-wrap gap-3 mt-8">
            {canali.map(({ chiave, url }, i) => {
              const { label, Icona } = SOCIAL[chiave];
              // Il primo canale disponibile fa da azione principale.
              const primario = i === 0;

              return (
                <a
                  key={chiave}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    primario
                      ? "flex items-center gap-2 bg-[#FFBF00] text-[#1A1814] px-6 py-3 rounded-md font-bold hover:bg-[#E6AC00] transition-colors"
                      : "flex items-center gap-2 border border-gray-500 text-white px-6 py-3 rounded-md font-semibold hover:border-white hover:bg-white/5 transition-colors"
                  }
                >
                  <Icona className="w-[18px] h-[18px]" />
                  {haCanaliPropri ? label : `${label} Rethink`}
                </a>
              );
            })}
          </div>

          {email && (
            <p className="text-gray-300 text-sm mt-4">
              Oppure scrivici a{" "}
              <a href={mailtoPartecipa} className="text-[#FFBF00] font-semibold hover:underline">
                {email}
              </a>
            </p>
          )}

          {!haCanaliPropri && (
            <p className="text-gray-400 text-sm mt-4">
              La sede di {s.citta} non ha ancora profili propri: per ora
              scrivi ai canali nazionali.
            </p>
          )}
        </div>
      </section>

      {/* EVENTI (Luma) */}
      {/* Niente calendario incorporato: un iframe verso luma.com verrebbe
          bloccato dalla CSP e, soprattutto, farebbe partire una richiesta a
          un servizio USA all'apertura della pagina, senza che il visitatore
          abbia cliccato nulla. Gli eventi della sede li legge il nostro
          server da Luma (src/lib/eventi.ts); se non ce ne sono resta il
          link al calendario. */}
      {s.luma && (
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Prossimi eventi
            </h2>
            {eventiSede.length > 0 ? (
              <div className="my-6">
                <GrigliaEventi eventi={eventiSede} />
              </div>
            ) : (
              <p className="text-[#4A4A4A] leading-relaxed mb-6 max-w-2xl">
                Il calendario della sede di {s.citta} è su Luma: lì trovi le date
                dei prossimi incontri e ti iscrivi con un clic.
              </p>
            )}
            <a
              href={s.luma}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#1A1814] text-white px-6 py-3 rounded-md font-bold hover:bg-[#111111] transition-colors"
            >
              <IconaLuma className="w-[18px] h-[18px] text-[#FFBF00]" />
              Vedi gli eventi su Luma
            </a>

            {eventiPassatiSede.length > 0 && (
              <>
                <h3
                  className="text-xl font-bold mt-14 mb-6"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Eventi passati
                </h3>
                <GrigliaEventi eventi={eventiPassatiSede} passati />
              </>
            )}
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      {/* id per i link diretti (rethinkuni.it/unipv#newsletter) da
          locandine e social; scroll-mt pari all'altezza della navbar
          sticky, che altrimenti coprirebbe l'inizio della sezione. */}
      {newsletter && informativa && (
        <section
          id="newsletter"
          className="scroll-mt-16 py-16 px-4 sm:px-6 bg-[#F9F9F7]"
        >
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Newsletter
            </h2>
            <p className="text-[#4A4A4A] leading-relaxed mb-8">
              Una email quando c&rsquo;è un nuovo evento della sede di{" "}
              {s.citta}. Niente spam, ti disiscrivi con un clic.
            </p>
            <NewsletterForm
              action={newsletter.action}
              titolare={informativa.titolare}
              slug={s.slug}
            />
          </div>
        </section>
      )}

      {/* ARTICOLI DELLA SEDE */}
      {articoliSede.length > 0 && (
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-2xl font-bold mb-8"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Articoli da {s.citta}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articoliSede.map((a) => (
                <SchedaArticolo key={a.slug} articolo={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTATTO */}
      {/* id per i link diretti (rethinkuni.it/unipv#partecipa). Se la sede
          ha un'email pubblicabile (vedi emailPubblica) è lei l'azione
          principale: chi vuole entrare o iscriversi scrive lì. */}
      <section id="partecipa" className="scroll-mt-16 py-16 px-4 sm:px-6 bg-[#EBEBEB]">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {inFormazione ? "Vuoi fondarla con noi?" : "Vuoi partecipare?"}
          </h2>
          <p className="text-[#4A4A4A] leading-relaxed mb-8">
            {email
              ? `Se vuoi partecipare all’associazione o iscriverti, scrivici via email: ti raccontiamo cosa stiamo organizzando a ${s.citta} e come diventare socio.`
              : haGruppo
              ? `Il gruppo WhatsApp è il posto dove ci si organizza: entra e presentati. ${inFormazione ? `Lì trovi chi sta fondando la sede di ${s.citta}.` : `Lì trovi la sede di ${s.citta} e le prossime iniziative.`}`
              : haCanaliPropri
                ? `Mandaci un messaggio in direct sui social della sede di ${s.citta}: ti raccontiamo ${inFormazione ? "a che punto siamo" : "cosa stiamo organizzando"} e come dare una mano.`
                : `Mandaci un messaggio in direct sui canali nazionali di Rethink: ti mettiamo in contatto con chi ${inFormazione ? "sta fondando" : "segue"} la sede di ${s.citta}.`}{" "}
            Non serve alcuna esperienza pregressa, solo la voglia di esserci.
          </p>

          {email && (
            <a
              href={mailtoPartecipa}
              className="inline-flex items-center gap-2 bg-[#FFBF00] text-[#1A1814] px-8 py-3 rounded-md font-bold hover:bg-[#E6AC00] transition-colors mb-3"
            >
              <Mail aria-hidden className="w-[18px] h-[18px]" />
              Scrivici a {email}
            </a>
          )}

          <div className="flex flex-wrap gap-3 justify-center">
            {canali.map(({ chiave, url }) => {
              const { label, Icona } = SOCIAL[chiave];

              return (
                <a
                  key={chiave}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    email
                      ? "flex items-center gap-2 border border-[#1A1814] text-[#1A1814] px-6 py-2.5 rounded-md font-semibold hover:bg-[#1A1814] hover:text-white transition-colors"
                      : "flex items-center gap-2 bg-[#1A1814] text-white px-8 py-3 rounded-md font-bold hover:bg-[#111111] transition-colors"
                  }
                >
                  <Icona className="w-[18px] h-[18px]" />
                  {label}
                </a>
              );
            })}
          </div>

          <p className="text-[#4A4A4A] text-xs mt-6">
            Vuoi aprire una sede nel tuo ateneo?{" "}
            <Link href="/unisciti" className="font-semibold hover:underline">
              Scopri come fare
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
