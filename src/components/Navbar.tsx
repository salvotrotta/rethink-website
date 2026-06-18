"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/cosa-facciamo", label: "Cosa facciamo" },
  { href: "/sedi", label: "Sedi" },
  { href: "/eventi", label: "Eventi" },
  { href: "/contatti", label: "Contatti" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#292929] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-neg.svg"
            alt="ReThink"
            width={160}
            height={73}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-gray-300 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
          <Link
            href="/unisciti"
            className="ml-2 bg-[#FFD957] hover:bg-[#f5cc40] text-[#292929] px-4 py-2 rounded-md font-bold transition-colors"
          >
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
            <Link key={l.href} href={l.href} className="text-gray-300 hover:text-white" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/unisciti"
            className="bg-[#FFD957] text-[#292929] px-4 py-2 rounded-md font-bold text-center"
            onClick={() => setOpen(false)}
          >
            Unisciti
          </Link>
        </div>
      )}
    </nav>
  );
}
