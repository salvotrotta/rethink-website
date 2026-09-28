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
  /**
   * Legale rappresentante. Facoltativo: l'art. 13 richiede identità e
   * recapito del titolare, non il nome della persona fisica. Se manca,
   * la frase si adatta invece di lasciare un buco.
   */
  rappresentante?: string;
  /** Email di contatto per l'esercizio dei diritti. */
  email: string;
  /**
   * Recapito a cui rivolgersi per le questioni sui dati personali.
   * Volutamente NON è un Responsabile della protezione dei dati: l'art. 37
   * non lo rende obbligatorio per un'associazione come questa, designarlo
   * imporrebbe di comunicarlo al Garante e il coordinatore sarebbe in
   * conflitto di interessi (art. 38 par. 6), perché è la stessa persona
   * che decide finalità e mezzi dei trattamenti.
   */
  contattoPrivacy?: {
    /** Chi risponde, es. "Il coordinatore dell'associazione". */
    ruolo: string;
    email: string;
  };
};

export const INFORMATIVE: Record<string, TitolareInformativa> = {
  sapienza: {
    titolare: "Rethink Sapienza",
    rappresentante: "Oscar Michele Norelli",
    email: "norelli.2046721@studenti.uniroma1.it",
  },
  unipv: {
    titolare: "Rethink UniPv",
    email: "unipv@rethinkuni.it",
    contattoPrivacy: {
      ruolo: "Il coordinatore dell'associazione",
      email: "unipv@rethinkuni.it",
    },
  },
};
