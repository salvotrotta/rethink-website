"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Iscrizione alla newsletter di una sede, inviata direttamente a Brevo.
 *
 * Il modulo è nostro (grafica, testi), ma i dati vanno dal browser a
 * Brevo senza passare dal nostro server: niente chiavi da custodire,
 * niente dati personali sulla VPS. Brevo accetta richieste da
 * rethinkuni.it (CORS) e risponde con {"success": true|false}.
 *
 * I nomi dei campi (NOME, COGNOME, EMAIL, PROFILO, SOCIO_RETHINK,
 * WHATSAPP, CONSENSO_WHATSAPP, OPT_IN) sono gli attributi del modulo
 * Brevo: se una sede crea il suo modulo, deve usare gli stessi, e qui
 * basta l'URL in sedi.json. Niente script di Brevo né reCAPTCHA di
 * Google: la trappola anti-bot è il campo nascosto email_address_check,
 * lo stesso del modulo originale.
 */

const PROFILI = [
  { valore: "2", etichetta: "Studente universitario" },
  { valore: "6", etichetta: "Dottorando / ricercatore" },
  { valore: "1", etichetta: "Studente delle superiori" },
  { valore: "3", etichetta: "Lavoratore" },
  { valore: "4", etichetta: "Professionista" },
  { valore: "5", etichetta: "Altro" },
];

// I prefissi più probabili tra chi studia in Italia; l'Italia per prima.
const PREFISSI = [
  ["+39", "IT"], ["+41", "CH"], ["+378", "SM"], ["+33", "FR"],
  ["+49", "DE"], ["+43", "AT"], ["+34", "ES"], ["+351", "PT"],
  ["+44", "GB"], ["+353", "IE"], ["+31", "NL"], ["+32", "BE"],
  ["+48", "PL"], ["+40", "RO"], ["+30", "GR"], ["+355", "AL"],
  ["+380", "UA"], ["+90", "TR"], ["+212", "MA"], ["+20", "EG"],
  ["+98", "IR"], ["+91", "IN"], ["+92", "PK"], ["+86", "CN"],
  ["+55", "BR"], ["+54", "AR"], ["+1", "US/CA"],
];

type Stato =
  | { tipo: "pronto" }
  | { tipo: "invio" }
  | { tipo: "fatto" }
  | { tipo: "errore"; messaggio: string };

export default function NewsletterForm({
  action,
  titolare,
  slug,
}: {
  /** URL "serve" del modulo Brevo, da sedi.json. */
  action: string;
  /** Es. "Rethink UniPv": compare nei testi di consenso. */
  titolare: string;
  /** Per il link all'informativa della sede. */
  slug: string;
}) {
  const [stato, setStato] = useState<Stato>({ tipo: "pronto" });
  const [vuoleGruppo, setVuoleGruppo] = useState(false);

  async function invia(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStato({ tipo: "invio" });

    // Brevo vuole solo cifre nel numero: gli spazi che la gente mette per
    // leggibilità li togliamo qui, invece di rifiutare il modulo.
    const dati = new FormData(e.currentTarget);
    const numero = dati.get("WHATSAPP");
    if (typeof numero === "string") dati.set("WHATSAPP", numero.replace(/\D/g, ""));

    try {
      const risposta = await fetch(action, { method: "POST", body: dati });
      const corpo = await risposta.json().catch(() => null);

      if (risposta.ok && corpo?.success) {
        setStato({ tipo: "fatto" });
      } else {
        // I messaggi di Brevo sono tecnici e in inglese: non servono a
        // chi compila. Restano nella console per chi deve capire cosa
        // non va.
        console.error("Iscrizione newsletter rifiutata da Brevo", corpo);
        setStato({
          tipo: "errore",
          messaggio:
            "Non siamo riusciti a registrare l'iscrizione. Controlla i dati e riprova tra qualche minuto.",
        });
      }
    } catch {
      setStato({
        tipo: "errore",
        messaggio:
          "Connessione non riuscita. Controlla di essere online e riprova.",
      });
    }
  }

  if (stato.tipo === "fatto") {
    return (
      <div
        role="status"
        className="border-l-4 border-[#FFBF00] bg-white px-6 py-5 text-left"
      >
        <p className="font-bold text-[#1A1814] mb-1">Ci sei quasi!</p>
        <p className="text-[#4A4A4A] leading-relaxed">
          Ti abbiamo mandato un&rsquo;email: clicca sul link di conferma per
          completare l&rsquo;iscrizione. Se non la trovi, guarda in spam e
          promozioni.
        </p>
      </div>
    );
  }

  const campo =
    "w-full border border-[#C9C4BA] rounded-md px-3 py-2.5 bg-white text-[#1A1814] focus:outline-none focus:border-[#1A1814] focus:ring-1 focus:ring-[#1A1814]";
  const etichetta = "block text-sm font-semibold text-[#1A1814] mb-1.5";
  const aiuto = "text-xs text-[#6B6B6B] mt-1";

  return (
    <form
      action={action}
      method="POST"
      onSubmit={invia}
      className="space-y-5 text-left"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nl-nome" className={etichetta}>
            Nome
          </label>
          <input
            id="nl-nome"
            name="NOME"
            type="text"
            required
            maxLength={200}
            autoComplete="given-name"
            className={campo}
          />
        </div>
        <div>
          <label htmlFor="nl-cognome" className={etichetta}>
            Cognome
          </label>
          <input
            id="nl-cognome"
            name="COGNOME"
            type="text"
            required
            maxLength={200}
            autoComplete="family-name"
            className={campo}
          />
        </div>
      </div>

      <div>
        <label htmlFor="nl-email" className={etichetta}>
          Email
        </label>
        <input
          id="nl-email"
          name="EMAIL"
          type="email"
          required
          autoComplete="email"
          className={campo}
        />
        <p className={aiuto}>Va bene anche l&rsquo;email di ateneo.</p>
      </div>

      <fieldset>
        <legend className={etichetta}>Chi sei?</legend>
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-2">
          {PROFILI.map(({ valore, etichetta: testo }) => (
            <label key={valore} className="flex items-center gap-2 text-[#1A1814]">
              <input
                type="radio"
                name="PROFILO"
                value={valore}
                required
                className="accent-[#1A1814]"
              />
              {testo}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={etichetta}>Sei già socio di {titolare}?</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <label className="flex items-center gap-2 text-[#1A1814]">
            <input
              type="radio"
              name="SOCIO_RETHINK"
              value="1"
              required
              className="accent-[#1A1814]"
            />
            Sì, sono socio
          </label>
          <label className="flex items-center gap-2 text-[#1A1814]">
            <input
              type="radio"
              name="SOCIO_RETHINK"
              value="2"
              required
              className="accent-[#1A1814]"
            />
            No, non ancora
          </label>
        </div>
      </fieldset>

      {/* Il numero si chiede solo a chi vuole entrare nel gruppo: senza
          la spunta il campo non esiste e non viene spedito nulla. */}
      <div className="border-t border-[#E0E0E0] pt-5">
        <label className="flex items-start gap-2.5 text-[#1A1814]">
          <input
            type="checkbox"
            name="CONSENSO_WHATSAPP"
            value="1"
            checked={vuoleGruppo}
            onChange={(e) => setVuoleGruppo(e.target.checked)}
            className="mt-1 accent-[#1A1814]"
          />
          <span>
            Voglio entrare anche nel gruppo WhatsApp di {titolare}{" "}
            <span className="text-[#6B6B6B]">(facoltativo)</span>
          </span>
        </label>

        {vuoleGruppo && (
          <div className="mt-4 pl-7">
            <label htmlFor="nl-whatsapp" className={etichetta}>
              Numero WhatsApp
            </label>
            <div className="flex gap-2">
              <select
                name="WHATSAPP__COUNTRY_CODE"
                defaultValue="+39"
                aria-label="Prefisso internazionale"
                className="border border-[#C9C4BA] rounded-md px-2 py-2.5 bg-white text-[#1A1814]"
              >
                {PREFISSI.map(([prefisso, paese]) => (
                  <option key={`${prefisso}-${paese}`} value={prefisso}>
                    {prefisso} {paese}
                  </option>
                ))}
              </select>
              <input
                id="nl-whatsapp"
                name="WHATSAPP"
                type="tel"
                required
                inputMode="numeric"
                pattern="[0-9 ]{6,15}"
                autoComplete="tel-national"
                placeholder="3xx xxx xxxx"
                className={campo}
              />
            </div>
            <p className={aiuto}>
              Ti mandiamo per email il link per entrare. Il numero ci serve
              per riconoscerti quando chiedi l&rsquo;accesso; nel gruppo sarà
              visibile agli altri partecipanti. Puoi uscire quando vuoi.
            </p>
          </div>
        )}
      </div>

      <label className="flex items-start gap-2.5 text-[#1A1814]">
        <input
          type="checkbox"
          name="OPT_IN"
          value="1"
          required
          className="mt-1 accent-[#1A1814]"
        />
        <span>
          Acconsento a ricevere da {titolare}{" "}
          la newsletter su eventi e
          attività dell&rsquo;associazione.
        </span>
      </label>

      <p className="text-xs text-[#6B6B6B] leading-relaxed">
        Usiamo questi dati solo per mandarti la newsletter e, se lo chiedi,
        per farti entrare nel gruppo WhatsApp, sulla base del tuo consenso. Ti
        disiscrivi quando vuoi dal link in fondo a ogni email. Tutti i
        dettagli sono nell&rsquo;
        <Link
          href={`/${slug}/privacy`}
          className="underline underline-offset-2 hover:text-[#1A1814]"
        >
          informativa privacy
        </Link>
        .
      </p>

      {/* Trappola per i bot, come nel modulo Brevo originale: un umano non
          lo vede e lo lascia vuoto, un bot spesso lo riempie. */}
      <input
        type="text"
        name="email_address_check"
        defaultValue=""
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] w-px h-px overflow-hidden"
      />
      <input type="hidden" name="locale" value="it" />

      {stato.tipo === "errore" && (
        <p role="alert" className="text-sm text-[#8A1C1C] bg-[#FDECEC] rounded-md px-4 py-3">
          {stato.messaggio}
        </p>
      )}

      <button
        type="submit"
        disabled={stato.tipo === "invio"}
        className="bg-[#1A1814] text-white px-8 py-3 rounded-md font-bold hover:bg-[#111111] transition-colors disabled:opacity-60 disabled:cursor-wait"
      >
        {stato.tipo === "invio" ? "Invio in corso…" : "Iscriviti"}
      </button>
    </form>
  );
}
