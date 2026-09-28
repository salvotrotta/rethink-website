/**
 * Titolari delle informative "Foto e riprese eventi", una per sede.
 *
 * Il testo dell'informativa è identico per tutte le sedi e vive nella
 * pagina; qui stanno solo i dati che cambiano. Per pubblicare quella di
 * un'altra sede basta aggiungere una voce con il suo slug: la pagina
 * /<slug>/privacy viene generata da sola.
 *
 * Senza una voce qui, /<slug>/privacy risponde 404.
 */
export type TitolareInformativa = {
  /** Denominazione del titolare, come indicata nell'informativa. */
  titolare: string;
  /** Legale rappresentante. */
  rappresentante: string;
  /** Email di contatto per l'esercizio dei diritti. */
  email: string;
};

export const INFORMATIVE: Record<string, TitolareInformativa> = {
  sapienza: {
    titolare: "Rethink Sapienza",
    rappresentante: "Oscar Michele Norelli",
    email: "norelli.2046721@studenti.uniroma1.it",
  },
};
