# Sorgenti grafiche

## `og-card.html` → `src/app/opengraph-image.png`

L'immagine che compare quando qualcuno condivide un link del sito su
WhatsApp, Telegram, LinkedIn, Facebook, X. Next la pubblica da sola grazie
al nome del file (`opengraph-image.png` in `src/app/`): non serve scrivere
i meta tag a mano.

Per rigenerarla dopo una modifica alla card:

```sh
cd design
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --screenshot=../src/app/opengraph-image.png og-card.html
```

1200×630 è il formato che tutte le piattaforme ritagliano senza tagliare
nulla. Il logo quadrato di `src/app/icon.png` qui non va bene: verrebbe
mostrato in un riquadro panoramico con due bande vuote ai lati.

`logo-neg.svg` è una copia di `public/logo-neg.svg`: serve a Chrome mentre
renderizza la card. Se cambia il logo, vanno aggiornate entrambe.
