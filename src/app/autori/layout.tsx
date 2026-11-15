import { SEZIONE_PUBBLICA } from "@/data/sezioni";

// Finché la sezione non è lanciata, nessuna pagina qui sotto va sui
// motori di ricerca (vedi src/data/sezioni.ts).
export const metadata = SEZIONE_PUBBLICA
  ? {}
  : { robots: { index: false, follow: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
