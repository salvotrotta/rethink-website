import { Award, FlaskConical, Rocket, Sprout, type LucideIcon } from "lucide-react";

/**
 * Icone dei valori (src/data/valori.json, campo "icona"): a linea e
 * gialle, come quelle del menu. Per un valore nuovo basta aggiungere qui
 * l'icona lucide-react con lo stesso nome usato nel JSON.
 */
const ICONE: Record<string, LucideIcon> = { Award, FlaskConical, Rocket, Sprout };

export default function IconaValore({ nome, className }: { nome: string; className?: string }) {
  const Icona = ICONE[nome];
  if (!Icona) throw new Error(`IconaValore: icona "${nome}" non registrata`);
  return <Icona aria-hidden className={className} strokeWidth={1.75} />;
}
