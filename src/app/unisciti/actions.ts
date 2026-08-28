"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { getTransporter, readMailConfig } from "@/lib/mail";

// Nota: un file "use server" può esportare SOLO funzioni async.
// Il tipo qui sotto sparisce in compilazione, quindi va bene; lo stato
// iniziale invece vive nel client component, non qui.
export type FondaFormState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

const schema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, { error: "Inserisci il tuo nome e cognome." })
    .max(120, { error: "Nome troppo lungo." }),
  email: z
    .email({ error: "Inserisci un indirizzo email valido." })
    .max(200, { error: "Email troppo lunga." }),
  ateneo: z
    .string()
    .trim()
    .min(2, { error: "Indica la tua università." })
    .max(160, { error: "Nome dell'ateneo troppo lungo." }),
  corso: z.string().trim().max(160, { error: "Testo troppo lungo." }).optional(),
  messaggio: z
    .string()
    .trim()
    .max(2000, { error: "Il messaggio non può superare i 2000 caratteri." })
    .optional(),
  privacy: z.literal("on", {
    error: "Devi acconsentire al trattamento dei dati per inviare la richiesta.",
  }),
});

// Rate limit in memoria: sufficiente con un solo container.
// Se un giorno il sito gira su più repliche, va spostato su storage condiviso.
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Pulizia opportunistica per non far crescere la mappa all'infinito.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

export async function inviaRichiestaFondazione(
  _prevState: FondaFormState,
  formData: FormData,
): Promise<FondaFormState> {
  // Honeypot: i bot compilano tutti i campi, le persone non vedono questo.
  if (formData.get("sito")) {
    return { ok: true, message: "Richiesta inviata. Ti risponderemo presto." };
  }

  const parsed = schema.safeParse({
    nome: formData.get("nome"),
    email: formData.get("email"),
    ateneo: formData.get("ateneo"),
    corso: formData.get("corso") || undefined,
    messaggio: formData.get("messaggio") || undefined,
    privacy: formData.get("privacy"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Controlla i campi evidenziati.",
      errors: z.flattenError(parsed.error).fieldErrors as Record<string, string[]>,
    };
  }

  if (isRateLimited(await clientIp())) {
    return {
      ok: false,
      message: "Hai già inviato diverse richieste. Riprova tra qualche minuto.",
    };
  }

  const config = readMailConfig();

  if (!config) {
    console.error("SMTP non configurato: richiesta di fondazione non inviata.");
    return {
      ok: false,
      message:
        "Il modulo non è ancora attivo. Scrivici direttamente a info@rethinkuni.it.",
    };
  }

  const { nome, email, ateneo, corso, messaggio } = parsed.data;

  const testo = [
    `Nome: ${nome}`,
    `Email: ${email}`,
    `Ateneo: ${ateneo}`,
    corso ? `Corso e anno: ${corso}` : null,
    "",
    messaggio ? `Messaggio:\n${messaggio}` : "(nessun messaggio)",
  ]
    .filter((r) => r !== null)
    .join("\n");

  try {
    await getTransporter(config).sendMail({
      from: config.from,
      to: config.to,
      replyTo: email,
      subject: `Nuova richiesta di fondazione — ${ateneo}`,
      text: testo,
    });
  } catch (error) {
    console.error("Invio email fallito:", error);
    return {
      ok: false,
      message:
        "Non siamo riusciti a inviare la richiesta. Riprova o scrivici a info@rethinkuni.it.",
    };
  }

  return {
    ok: true,
    message: "Richiesta inviata. Ti risponderemo all'indirizzo che ci hai lasciato.",
  };
}
