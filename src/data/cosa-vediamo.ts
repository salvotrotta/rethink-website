/**
 * "Cosa vediamo" in sintesi: gli otto punti del documento definitivo
 * (Andrea e Giulia, novembre 2026). Il testo completo, con le fonti, è nel
 * manifesto (content/manifesto.md): se cambia un numero qui, va cambiato
 * anche là.
 *
 * `numero` ed `etichetta` servono alle schede compatte; `home: true` sceglie
 * le quattro che compaiono in home.
 */
export type PuntoCosaVediamo = {
  titolo: string;
  testo: string;
  numero: string;
  etichetta: string;
  home?: boolean;
};

export const COSA_VEDIAMO: PuntoCosaVediamo[] = [
  {
    titolo: "Investiamo poco",
    testo:
      "L’Italia destina all’università tra lo 0,3% e lo 0,4% del PIL, meno della metà della media europea, e alla ricerca l’1,4% contro il 2,2%.",
    numero: "0,3–0,4%",
    etichetta: "del PIL all’università, meno della metà della media europea",
    home: true,
  },
  {
    titolo: "Assenza di merito",
    testo:
      "Il 70% dei fondi agli atenei dipende dal costo standard per studente e dalla spesa storica, non dalla qualità. Il Regno Unito spende per la ricerca quanto noi per docente, ma concentra i fondi sui migliori: ha 25 università tra le prime 200 al mondo, noi quattro, nessuna nella top 100.",
    numero: "4",
    etichetta: "università italiane tra le prime 200 al mondo, 25 quelle britanniche",
  },
  {
    titolo: "Assenza di innovazione",
    testo:
      "Fondare un’impresa partendo dalla ricerca è difficile e poco riconosciuto. I nostri uffici di trasferimento tecnologico generano in media 1,5 nuove imprese (spin-off e start-up) all’anno ciascuno, contro le 15,2 europee.",
    numero: "1,5",
    etichetta: "nuove imprese all’anno per ufficio di trasferimento tecnologico, contro 15,2",
  },
  {
    titolo: "Skill mismatch",
    testo: "Un lavoratore su tre ha competenze che non corrispondono al suo lavoro.",
    numero: "1 su 3",
    etichetta: "lavoratori con competenze che non corrispondono al loro lavoro",
  },
  {
    titolo: "Ascensore sociale fermo",
    testo:
      "Si laurea il 63% dei figli di laureati, ma solo il 15% di chi ha genitori con al massimo la licenza media.",
    numero: "15%",
    etichetta: "si laurea se i genitori hanno al massimo la licenza media, contro il 63%",
    home: true,
  },
  {
    titolo: "Salari fermi e bassi",
    testo:
      "Dal 2000 al 2025 i salari reali sono cresciuti del 20,6% nei Paesi avanzati e calati del 2,9% in Italia, perché senza innovazione la produttività resta ferma.",
    numero: "−2,9%",
    etichetta: "salari reali in Italia dal 2000 al 2025, +20,6% nei Paesi avanzati",
    home: true,
  },
  {
    titolo: "I giovani non sono la priorità",
    testo:
      "La spesa per le pensioni è salita dal 9,5% del PIL nel 1975 al 16,2% del 2023, mentre quella per l’istruzione è scesa dal 4,4% del 1995 al 3,5% del 2023. Dal 1991 al 2022 la quota di ricchezza delle famiglie under 36 è crollata dal 13% al 4%, mentre quella degli over 65 è quasi raddoppiata.",
    numero: "13% → 4%",
    etichetta: "quota di ricchezza delle famiglie under 36, dal 1991 al 2022",
  },
  {
    titolo: "Emigrazione di massa",
    testo:
      "Tra il 2011 e il 2024 oltre 630.000 giovani hanno lasciato l’Italia, portando all’estero un investimento in formazione stimato dal CNEL in 159,5 miliardi. Per ogni giovane che arriva dai Paesi avanzati, ne partono 14,5. Dei 100 ricercatori italiani che hanno vinto un ERC Consolidator Grant nei bandi 2019-2021, solo 35 hanno scelto l’Italia.",
    numero: "630.000",
    etichetta: "giovani partiti dall’Italia tra il 2011 e il 2024",
    home: true,
  },
];
