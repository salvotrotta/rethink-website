import type { MetadataRoute } from "next";

/**
 * rethinkuni.it/robots.txt: tutto il sito è aperto ai motori di ricerca e
 * indica dove trovare la sitemap. Le pagine da tenere fuori (informative
 * privacy, articoli demo) lo dicono da sole con il meta robots noindex:
 * bloccarle qui impedirebbe a Google di leggere quel noindex.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://rethinkuni.it/sitemap.xml",
    host: "rethinkuni.it",
  };
}
