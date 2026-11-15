/**
 * Interruttore della sezione articoli. Finché è false la sezione è online
 * ma "nascosta": nessun link da menu, piè di pagina e home, nessun feed
 * annunciato, e tutte le pagine di /articoli e /autori chiedono ai motori
 * di ricerca di non indicizzarle. Serve per farla vedere al board con un
 * link diretto prima del lancio.
 *
 * Al lancio: true qui, e via gli articoli con "demo: true".
 * Sta in un file a parte perché lo legge anche il menu, che gira nel
 * browser e non può importare src/lib/articoli.ts (legge file da disco).
 */
export const SEZIONE_PUBBLICA = false;
