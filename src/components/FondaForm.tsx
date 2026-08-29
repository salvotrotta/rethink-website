"use client";

import { useActionState, useId } from "react";

import {
  inviaRichiestaFondazione,
  type FondaFormState,
} from "@/app/unisciti/actions";

const initialFondaFormState: FondaFormState = { ok: false, message: "" };

const inputClass =
  "w-full rounded-md border border-[#E0E0E0] bg-white px-3 py-2.5 text-sm text-[#1A1814] placeholder:text-[#8A8A8A] focus:border-[#1A1814] focus:outline-none focus:ring-2 focus:ring-[#FFBF00]";

function Errore({ messaggi }: { messaggi?: string[] }) {
  if (!messaggi?.length) return null;
  return (
    <p className="mt-1 text-xs font-medium text-[#B3261E]">{messaggi[0]}</p>
  );
}

export default function FondaForm() {
  const [state, formAction, pending] = useActionState(
    inviaRichiestaFondazione,
    initialFondaFormState,
  );
  const id = useId();

  if (state.ok) {
    return (
      <div
        className="rounded-lg border-l-4 border-[#FFBF00] bg-white p-6 text-left shadow-sm"
        role="status"
        aria-live="polite"
      >
        <p className="font-bold text-[#1A1814]">Grazie, ci siamo.</p>
        <p className="mt-2 text-sm leading-relaxed text-[#4A4A4A]">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="text-left" noValidate>
      {/* Honeypot antispam: nascosto alle persone, non ai bot. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-sito`}>Non compilare questo campo</label>
        <input id={`${id}-sito`} type="text" name="sito" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-nome`} className="mb-1 block text-sm font-semibold">
            Nome e cognome <span className="text-[#B3261E]">*</span>
          </label>
          <input
            id={`${id}-nome`}
            name="nome"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            aria-describedby={state.errors?.nome ? `${id}-nome-err` : undefined}
          />
          <span id={`${id}-nome-err`}>
            <Errore messaggi={state.errors?.nome} />
          </span>
        </div>

        <div>
          <label htmlFor={`${id}-email`} className="mb-1 block text-sm font-semibold">
            Email <span className="text-[#B3261E]">*</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            aria-describedby={state.errors?.email ? `${id}-email-err` : undefined}
          />
          <span id={`${id}-email-err`}>
            <Errore messaggi={state.errors?.email} />
          </span>
        </div>

        <div>
          <label htmlFor={`${id}-ateneo`} className="mb-1 block text-sm font-semibold">
            La tua università <span className="text-[#B3261E]">*</span>
          </label>
          <input
            id={`${id}-ateneo`}
            name="ateneo"
            type="text"
            required
            placeholder="es. Università di Bologna"
            className={inputClass}
            aria-describedby={state.errors?.ateneo ? `${id}-ateneo-err` : undefined}
          />
          <span id={`${id}-ateneo-err`}>
            <Errore messaggi={state.errors?.ateneo} />
          </span>
        </div>

        <div>
          <label htmlFor={`${id}-corso`} className="mb-1 block text-sm font-semibold">
            Corso e anno
          </label>
          <input
            id={`${id}-corso`}
            name="corso"
            type="text"
            placeholder="es. Giurisprudenza, secondo anno"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`${id}-messaggio`} className="mb-1 block text-sm font-semibold">
          Raccontaci qualcosa di te
        </label>
        <textarea
          id={`${id}-messaggio`}
          name="messaggio"
          rows={4}
          className={inputClass}
          placeholder="Perché vuoi fondare Rethink nel tuo ateneo? Conosci già altri studenti interessati?"
        />
        <Errore messaggi={state.errors?.messaggio} />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-[#4A4A4A]">
        Quello che scrivi arriva come email alla casella di Rethink e lo usiamo
        solo per risponderti.{" "}
        <a href="/privacy" className="font-semibold underline hover:text-[#1A1814]">
          Come trattiamo i dati
        </a>
        .
      </p>

      {state.message && !state.ok && (
        <p className="mt-4 text-sm font-medium text-[#B3261E]" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-block rounded-md bg-[#1A1814] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#111111] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Invio in corso…" : "Invia la richiesta"}
      </button>
    </form>
  );
}
