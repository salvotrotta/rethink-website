# Articoli del sito

Ogni articolo è un file in `content/articoli/`. Il nome del file diventa
l'indirizzo: `content/articoli/costo-fuori-sede.md` →
`rethinkuni.it/articoli/costo-fuori-sede`. Usa solo minuscole, numeri e
trattini, e non cambiarlo dopo la pubblicazione (i link condivisi si
romperebbero).

## Intestazione

In cima al file, tra due righe `---`:

```yaml
titolo: "Titolo dell'articolo"
sottotitolo: "Una o due righe che riassumono l'articolo."   # facoltativo
data: 2026-11-20                     # data di pubblicazione, AAAA-MM-GG
autori:                              # uno o più slug da src/data/autori.json
  - nome-cognome
categoria: universita                # uno slug da src/data/categorie.ts
sede: unipv                          # facoltativo: slug della sede; senza, è del nazionale
copertina: /articoli/<slug>/copertina.jpg
copertinaAlt: "Cosa si vede nell'immagine, per chi non la vede"
copertinaCredito: "Foto di …"        # facoltativo
avvertenza: true                     # facoltativo: "le opinioni sono dell'autore…"
bozza: true                          # facoltativo: visibile solo in npm run dev
demo: true                           # facoltativo: online ma mai indicizzato, né in home/feed
```

La build si ferma se manca un campo obbligatorio, se un autore non esiste
in `src/data/autori.json` o se la categoria non è tra quelle previste.

## Copertina

Va in `public/articoli/<slug>/copertina.jpg`, in formato 16:9 (ideale
1600×900), JPG sotto i 400 KB. È anche l'immagine di anteprima quando si
condivide il link. Serve averne i diritti: foto proprie, dell'associazione
o con licenza che ne consenta l'uso, citata in `copertinaCredito`.

## Testo

Markdown normale: `## Titolo di sezione`, `**grassetto**`, `*corsivo*`,
`[testo](https://link)`, elenchi con `-` o `1.`, citazioni con `>`, tabelle.
Le note a piè di pagina: `[^1]` nel testo e `[^1]: fonte…` in fondo;
compaiono numerate nella sezione "Note e fonti" in fondo, quindi non
serve un titolo "Fonti" a parte.

## Autori

In `src/data/autori.json`: `slug` (es. `giulia-rossi`, diventa
`rethinkuni.it/autori/giulia-rossi`), `nome`, `ruolo`, `ospite`
(true per chi non è socio), `sede` (slug o null), `ateneo`, `foto`
(`/autori/<slug>.jpg`, quadrata, almeno 400×400, oppure null per le
iniziali), `bio` (2–3 righe), `linkedin` e `instagram` (URL o null).

## Da Google Doc al sito

Il testo arriva dal Drive del team. Per convertirlo: in Google Docs,
File → Scarica → Markdown (.md), poi si sistema l'intestazione.

## Sezione nascosta e lancio

Finché `SEZIONE_PUBBLICA` in `src/data/sezioni.ts` è `false`, la sezione
è online ma non linkata da menu, piè di pagina e home, e tutte le pagine
di /articoli e /autori hanno `noindex`: si raggiunge solo con il link
diretto (per il board: rethinkuni.it/articoli). Al lancio: metterlo a
`true`, togliere gli articoli e gli autori con `demo: true` e le loro
copertine in `public/articoli/`.
