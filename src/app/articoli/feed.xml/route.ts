import { articoliInVetrina, nomiAutori } from "@/lib/articoli";

// Generato una volta in fase di build, come le pagine degli articoli.
export const dynamic = "force-static";

const SITO = "https://rethinkuni.it";

function xml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Feed RSS 2.0 degli ultimi 20 articoli, per chi segue con un lettore di feed. */
export function GET() {
  const voci = articoliInVetrina()
    .slice(0, 20)
    .map((a) => {
      const url = `${SITO}/articoli/${a.slug}`;
      return `    <item>
      <title>${xml(a.titolo)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${a.data}T09:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${xml(nomiAutori(a.autori))}</dc:creator>
      <category>${xml(a.categoria.nome)}</category>
      <description>${xml(a.sottotitolo ?? a.titolo)}</description>
    </item>`;
    })
    .join("\n");

  const corpo = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Rethink – Articoli</title>
    <link>${SITO}/articoli</link>
    <atom:link href="${SITO}/articoli/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Idee, dati e proposte di giovani, studenti e dottorandi di Rethink.</description>
    <language>it</language>
${voci}
  </channel>
</rss>
`;

  return new Response(corpo, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
