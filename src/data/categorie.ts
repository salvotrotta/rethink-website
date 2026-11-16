/**
 * Categorie degli articoli: un elenco chiuso, deciso dal nazionale.
 * L'ordine qui è quello in cui compaiono come filtri in /articoli, dove
 * si vedono solo le categorie che hanno almeno un articolo.
 * Per aggiungerne una basta una riga; lo slug finisce nell'indirizzo
 * (rethinkuni.it/articoli/categoria/<slug>), quindi una volta pubblicato
 * non va più cambiato.
 */
export const CATEGORIE = [
  { slug: "geopolitica", nome: "Geopolitica" },
  { slug: "energia", nome: "Energia" },
  { slug: "universita", nome: "Università" },
  { slug: "ricerca", nome: "Ricerca" },
  { slug: "lavoro", nome: "Lavoro" },
  { slug: "innovazione", nome: "Innovazione" },
  { slug: "politiche-pubbliche", nome: "Politiche pubbliche" },
] as const;

export type SlugCategoria = (typeof CATEGORIE)[number]["slug"];

export function categoria(slug: string) {
  return CATEGORIE.find((c) => c.slug === slug);
}
