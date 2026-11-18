"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Lightbulb,
  MapPin,
  MessageCircle,
  Newspaper,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";

import { SEZIONE_PUBBLICA } from "@/data/sezioni";

// Le icone sono gialle (il colore del brand) e il testo resta grigio:
// aiutano a riconoscere le voci senza appesantire il menu. Sono
// decorative, quindi nascoste ai lettori di schermo.
const links: { href: string; label: string; icona: LucideIcon }[] = [
  { href: "/chi-siamo", label: "Chi siamo", icona: Users },
  { href: "/cosa-facciamo", label: "Cosa facciamo", icona: Lightbulb },
  { href: "/sedi", label: "Sedi", icona: MapPin },
  ...(SEZIONE_PUBBLICA ? [{ href: "/articoli", label: "Articoli", icona: Newspaper }] : []),
  { href: "/contatti", label: "Contatti", icona: MessageCircle },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#1A1814] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-neg.svg"
            alt="Rethink"
            width={160}
            height={73}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1.5 whitespace-nowrap text-gray-300 hover:text-white transition-colors"
            >
              <l.icona aria-hidden className="w-4 h-4 shrink-0 text-[#FFBF00]" strokeWidth={2} />
              {l.label}
            </Link>
          ))}
          <Link
            href="/unisciti"
            className="ml-2 inline-flex items-center gap-1.5 whitespace-nowrap bg-[#FFBF00] hover:bg-[#E6AC00] text-[#1A1814] px-4 py-2 rounded-md font-bold transition-colors"
          >
            <UserPlus aria-hidden className="w-4 h-4 shrink-0" strokeWidth={2.25} />
            Unisciti
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-300"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#1e1e1e] border-t border-gray-700 px-4 py-4 flex flex-col gap-4 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-3 text-gray-300 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <l.icona aria-hidden className="w-5 h-5 shrink-0 text-[#FFBF00]" strokeWidth={2} />
              {l.label}
            </Link>
          ))}
          <Link
            href="/unisciti"
            className="flex items-center justify-center gap-2 bg-[#FFBF00] text-[#1A1814] px-4 py-2 rounded-md font-bold"
            onClick={() => setOpen(false)}
          >
            <UserPlus aria-hidden className="w-5 h-5 shrink-0" strokeWidth={2.25} />
            Unisciti
          </Link>
        </div>
      )}
    </nav>
  );
}
