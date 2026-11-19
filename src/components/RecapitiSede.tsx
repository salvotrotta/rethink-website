import { Mail } from "lucide-react";

import sedi from "@/data/sedi.json";
import { SOCIAL, SOCIAL_ORDINE } from "@/components/social";
import { emailPubblica } from "@/lib/email-sedi";

type Sede = (typeof sedi)[number];

/**
 * Recapiti di una sede: email cliccabile e icone dei social presenti.
 * Usato in home, elenco sedi e ovunque serva la stessa scheda, così le
 * tre viste non divergono quando si aggiunge un canale.
 */
export default function RecapitiSede({ sede }: { sede: Sede }) {
  const social = SOCIAL_ORDINE.filter((chiave) => sede[chiave]);
  const email = emailPubblica(sede);
  if (social.length === 0 && !email) return null;

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {email && (
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-1.5 text-xs text-[#4A4A4A] hover:text-[#1A1814] transition-colors break-all"
        >
          <Mail aria-hidden className="w-[17px] h-[17px] shrink-0" />
          {email}
        </a>
      )}
      {social.map((chiave) => {
        const { label, Icona } = SOCIAL[chiave];
        return (
          <a
            key={chiave}
            href={sede[chiave]!}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} di Rethink ${sede.citta}`}
            className="text-[#4A4A4A] hover:text-[#1A1814] transition-colors"
          >
            <Icona className="w-[17px] h-[17px]" />
          </a>
        );
      })}
    </div>
  );
}
