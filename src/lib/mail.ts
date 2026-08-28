import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

/**
 * Configurazione SMTP letta dall'ambiente.
 * Volutamente letta a ogni chiamata (non a import time) così il build
 * non fallisce quando le variabili non ci sono ancora.
 */
export type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

export function readMailConfig(): MailConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 587);

  return {
    host,
    port,
    // 465 = TLS implicito; 587 = STARTTLS
    secure: port === 465,
    user,
    pass,
    from: process.env.SMTP_FROM ?? user,
    to: process.env.CONTACT_TO ?? "info@rethinkuni.it",
  };
}

let cached: Transporter | null = null;

export function getTransporter(config: MailConfig): Transporter {
  if (cached) return cached;

  cached = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });

  return cached;
}
