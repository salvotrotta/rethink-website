import sedi from "@/data/sedi.json";
import { INFORMATIVE } from "@/data/informative";

type Sede = (typeof sedi)[number];

/**
 * Email di una sede da mostrare sul sito, oppure null.
 *
 * Su indicazione del legale (agosto 2026) un indirizzo email si pubblica
 * solo se c'è un titolare del trattamento a cui ricondurlo. Per le sedi
 * questo vuol dire: sede fondata, con la sua informativa privacy attiva
 * (una voce in src/data/informative.ts, che genera /<sede>/privacy).
 * Il campo "email" di sedi.json da solo non basta: senza informativa
 * l'indirizzo resta nascosto, così non si pubblica per sbaglio.
 * Eccezione: una sede in fondazione con informativa può mostrarla lo
 * stesso se la sua voce ha emailInFondazione: true.
 * Il nazionale non ha ancora un titolare, quindi niente email nazionale.
 */
export function emailPubblica(sede: Sede): string | null {
  if (!sede.email) return null;
  const informativa = INFORMATIVE[sede.slug];
  if (!informativa) return null;
  if (sede.stato !== "fondata" && !informativa.emailInFondazione) return null;
  return sede.email;
}
