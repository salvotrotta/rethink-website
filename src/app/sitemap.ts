import type { MetadataRoute } from "next";

import sedi from "@/data/sedi.json";
import { CATEGORIE } from "@/data/categorie";
import { articoliDi, articoliInVetrina, autori, SEZIONE_PUBBLICA } from "@/lib/articoli";

const SITO = "https://rethinkuni.it";

/**
 * Elenco delle pagine da far trovare a Google (rethinkuni.it/sitemap.xml).
 * Si aggiorna da solo: nuove sedi, articoli e autori entrano alla build
 * successiva. Restano fuori le informative privacy delle sedi, che sono
 * noindex, e gli articoli demo o in bozza.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pagine: MetadataRoute.Sitemap = [
    { url: SITO, changeFrequency: "weekly", priority: 1 },
    ...["/chi-siamo", "/manifesto", "/cosa-facciamo", "/sedi", "/unisciti", "/contatti"].map(
      (p) => ({ url: `${SITO}${p}`, changeFrequency: "monthly" as const, priority: 0.8 }),
    ),
    ...sedi
      .filter((s) => s.pagina)
      .map((s) => ({ url: `${SITO}/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];

  if (!SEZIONE_PUBBLICA) return pagine;

  const articoli = articoliInVetrina();
  const ultimo = articoli[0]?.data;
  return [
    ...pagine,
    { url: `${SITO}/articoli`, lastModified: ultimo, changeFrequency: "weekly", priority: 0.9 },
    ...articoli.map((a) => ({
      url: `${SITO}/articoli/${a.slug}`,
      lastModified: a.data,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...CATEGORIE.filter((c) => articoli.some((a) => a.categoria.slug === c.slug)).map((c) => ({
      url: `${SITO}/articoli/categoria/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    { url: `${SITO}/autori`, changeFrequency: "monthly", priority: 0.5 },
    ...autori()
      .filter((a) => articoliDi(a.slug).length > 0)
      .map((a) => ({ url: `${SITO}/autori/${a.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
