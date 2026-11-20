import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";

import type { Evento } from "@/lib/eventi";
import { IconaLuma } from "@/components/social";

function dataEvento(e: Evento) {
  const inizio = new Date(e.inizio);
  const opz = { timeZone: e.fuso } as const;
  const giorno = new Intl.DateTimeFormat("it-IT", {
    ...opz,
    weekday: "short",
    day: "numeric",
    month: "long",
  }).format(inizio);
  const ora = new Intl.DateTimeFormat("it-IT", { ...opz, hour: "2-digit", minute: "2-digit" }).format(inizio);
  // Per il riquadro con giorno e mese sopra la copertina.
  const num = new Intl.DateTimeFormat("it-IT", { ...opz, day: "numeric" }).format(inizio);
  const mese = new Intl.DateTimeFormat("it-IT", { ...opz, month: "short" }).format(inizio).replace(".", "");
  return { giorno, ora, num, mese };
}

/** Scheda di un evento: porta alla pagina Luma, dove ci si iscrive. */
export function SchedaEvento({ evento, passato = false }: { evento: Evento; passato?: boolean }) {
  const { giorno, ora, num, mese } = dataEvento(evento);
  const org = evento.organizzatore;

  return (
    <article className="group relative flex flex-col bg-white rounded-lg overflow-hidden border border-[#E0E0E0] hover:border-[#1A1814] transition-colors">
      <div className="relative aspect-[16/9] bg-[#1A1814]">
        {evento.copertina ? (
          <Image
            src={evento.copertina}
            alt=""
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className={`object-cover ${passato ? "grayscale" : ""}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <IconaLuma className="w-12 h-12 text-[#FFBF00]/40" />
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white rounded-md px-2.5 py-1 text-center shadow-sm leading-none">
          <p className="text-xl font-bold text-[#1A1814]">{num}</p>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#4A4A4A] mt-1">{mese}</p>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <p className="flex items-center gap-1.5 text-sm text-[#4A4A4A]">
          <CalendarDays aria-hidden className="w-4 h-4 shrink-0 text-[#1A1814]" />
          <span className="first-letter:uppercase">{giorno}</span> · {ora}
        </p>
        <h3 className="text-lg font-bold leading-snug mt-2 mb-3 text-[#1A1814]">
          {/* Il link copre tutta la scheda (after:inset-0), ma il nome della
              sede sotto resta cliccabile perché sta sopra (relative z-10). */}
          <a
            href={evento.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group-hover:underline underline-offset-4 after:absolute after:inset-0"
          >
            {evento.titolo}
          </a>
        </h3>
        <div className="mt-auto space-y-1 text-sm text-[#4A4A4A]">
          {evento.luogo && (
            <p className="flex items-center gap-1.5">
              <MapPin aria-hidden className="w-4 h-4 shrink-0 text-[#1A1814]" />
              {evento.luogo}
            </p>
          )}
          {org && (
            <p>
              Organizza{" "}
              {org.sede ? (
                <Link href={`/${org.sede}`} className="relative z-10 font-semibold text-[#1A1814] hover:underline">
                  {org.nome}
                </Link>
              ) : (
                <span className="font-semibold text-[#1A1814]">{org.nome}</span>
              )}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export function GrigliaEventi({ eventi, passati = false }: { eventi: Evento[]; passati?: boolean }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {eventi.map((e) => (
        <SchedaEvento key={e.id} evento={e} passato={passati} />
      ))}
    </div>
  );
}
