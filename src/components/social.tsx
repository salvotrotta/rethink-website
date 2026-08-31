/**
 * Icone social inline: niente librerie né richieste esterne.
 *
 * Per aggiungere un social nuovo servono due cose:
 *  1. una voce in SOCIAL qui sotto, con etichetta e icona
 *  2. un campo con lo stesso nome nelle sedi di src/data/sedi.json
 * Il resto (pulsanti nella pagina sede, link nelle schede) si adegua da solo.
 */

type PropsIcona = { className?: string };

export function IconaInstagram({ className = "w-4 h-4" }: PropsIcona) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.7" cy="6.3" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconaLinkedIn({ className = "w-4 h-4" }: PropsIcona) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export const SOCIAL = {
  instagram: { label: "Instagram", Icona: IconaInstagram },
  linkedin: { label: "LinkedIn", Icona: IconaLinkedIn },
} as const;

export type ChiaveSocial = keyof typeof SOCIAL;

/** Ordine in cui i social compaiono ovunque nel sito. */
export const SOCIAL_ORDINE: ChiaveSocial[] = ["instagram", "linkedin"];

/** Canali del nazionale, usati anche come ripiego per le sedi che non
 *  hanno ancora un profilo proprio: meglio del nulla. */
export const SOCIAL_NAZIONALE = {
  instagram: "https://www.instagram.com/Rethink_uni",
  linkedin: "https://www.linkedin.com/company/rethink-uni/",
  linktree: "https://linktr.ee/Rethink_uni",
} as const;
