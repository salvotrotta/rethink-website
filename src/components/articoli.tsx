import Link from "next/link";
import Image from "next/image";

import { dataEstesa, nomiAutori, type Articolo, type Autore } from "@/lib/articoli";

/** Foto dell'autore, o le sue iniziali su un cerchio giallo. */
export function AvatarAutore({
  autore,
  dimensione = 48,
}: {
  autore: Pick<Autore, "nome" | "foto">;
  dimensione?: number;
}) {
  if (autore.foto) {
    return (
      <Image
        src={autore.foto}
        alt=""
        width={dimensione}
        height={dimensione}
        className="rounded-full object-cover shrink-0"
        style={{ width: dimensione, height: dimensione }}
      />
    );
  }

  const iniziali = autore.nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

  return (
    <span
      aria-hidden="true"
      className="rounded-full bg-[#FFBF00] text-[#1A1814] font-bold inline-flex items-center justify-center shrink-0"
      style={{
        width: dimensione,
        height: dimensione,
        fontSize: Math.round(dimensione * 0.38),
      }}
    >
      {iniziali}
    </span>
  );
}

/** Riga "Categoria · 13 novembre 2026 · 6 min di lettura". */
export function MetaArticolo({
  articolo,
  conCategoria = true,
}: {
  articolo: Articolo;
  conCategoria?: boolean;
}) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-[#2F49B9]">
      {conCategoria && (
        <>
          <Link
            href={`/articoli/categoria/${articolo.categoria.slug}`}
            className="hover:underline"
          >
            {articolo.categoria.nome}
          </Link>
          {" · "}
        </>
      )}
      <time dateTime={articolo.data}>{dataEstesa(articolo.data)}</time>
      {" · "}
      {articolo.minutiLettura} min di lettura
    </p>
  );
}

/** Scheda di un articolo negli elenchi. */
export function SchedaArticolo({ articolo }: { articolo: Articolo }) {
  return (
    <article className="group flex flex-col bg-white rounded-lg overflow-hidden border border-[#E0E0E0] hover:border-[#1A1814] transition-colors">
      <Link href={`/articoli/${articolo.slug}`} className="block relative aspect-[16/9] bg-[#EBEBEB]">
        <Image
          src={articolo.copertina}
          alt={articolo.copertinaAlt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </Link>
      <div className="flex flex-col flex-1 p-6">
        <MetaArticolo articolo={articolo} />
        <h3 className="text-xl font-bold leading-snug mt-3 mb-2 text-[#1A1814]">
          <Link href={`/articoli/${articolo.slug}`} className="group-hover:underline underline-offset-4">
            {articolo.titolo}
          </Link>
        </h3>
        {articolo.sottotitolo && (
          <p className="text-[#4A4A4A] leading-relaxed mb-4">{articolo.sottotitolo}</p>
        )}
        <p className="text-sm text-[#6B6B6B] mt-auto">
          di {nomiAutori(articolo.autori)}
          {articolo.bozza && (
            <span className="ml-2 text-xs font-bold uppercase text-[#8A1C1C]">bozza</span>
          )}
        </p>
      </div>
    </article>
  );
}

/** Griglia di schede, o un messaggio se l'elenco è vuoto. */
export function ElencoArticoli({
  articoli,
  vuoto = "Non ci sono ancora articoli.",
}: {
  articoli: Articolo[];
  vuoto?: string;
}) {
  if (articoli.length === 0) {
    return <p className="text-[#4A4A4A]">{vuoto}</p>;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articoli.map((a) => (
        <SchedaArticolo key={a.slug} articolo={a} />
      ))}
    </div>
  );
}
