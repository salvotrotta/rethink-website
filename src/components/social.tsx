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

/** Marchio di Luma (la stella a quattro punte), preso dal loro sito. */
export function IconaLuma({ className = "w-4 h-4" }: PropsIcona) {
  return (
    <svg
      viewBox="0 0 133 134"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M133 67C96.282 67 66.5 36.994 66.5 0c0 36.994-29.782 67-66.5 67 36.718 0 66.5 30.006 66.5 67 0-36.994 29.782-67 66.5-67" />
    </svg>
  );
}

/** Marchio di WhatsApp: i gruppi di sede si raggiungono da lì. */
export function IconaWhatsApp({ className = "w-4 h-4" }: PropsIcona) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export const SOCIAL = {
  instagram: { label: "Instagram", Icona: IconaInstagram },
  linkedin: { label: "LinkedIn", Icona: IconaLinkedIn },
  whatsapp: { label: "Gruppo WhatsApp", Icona: IconaWhatsApp },
} as const;

export type ChiaveSocial = keyof typeof SOCIAL;

/** Ordine in cui i social compaiono ovunque nel sito. */
export const SOCIAL_ORDINE: ChiaveSocial[] = [
  "instagram",
  "linkedin",
  "whatsapp",
];

/** Canali del nazionale, usati anche come ripiego per le sedi che non
 *  hanno ancora un profilo proprio: meglio del nulla. */
export const SOCIAL_NAZIONALE = {
  instagram: "https://www.instagram.com/Rethink_uni",
  linkedin: "https://www.linkedin.com/company/rethink-uni/",
  linktree: "https://linktr.ee/Rethink_uni",
} as const;

/**
 * Recapito nazionale di un canale, se esiste: il nazionale non ha un
 * gruppo WhatsApp, quindi per quel canale non c'è ripiego e chi chiama
 * deve saltarlo invece di mostrare un pulsante che non porta da nessuna parte.
 */
export function urlNazionale(chiave: ChiaveSocial): string | undefined {
  return (SOCIAL_NAZIONALE as Partial<Record<ChiaveSocial, string>>)[chiave];
}
