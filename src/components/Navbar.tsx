"use client";

import Link from "next/link";
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
    <nav className="sticky top-0 z-50 bg-[#0A0A0A] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight font-[Playfair_Display,serif]">
          Re<span className="text-[#4A90D9]">Think</span>
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
            className="ml-2 bg-[#1C3564] hover:bg-[#243f7a] text-white px-4 py-2 rounded-md transition-colors"
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
        <div className="md:hidden bg-[#111] border-t border-gray-800 px-4 py-4 flex flex-col gap-4 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-gray-300 hover:text-white" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/unisciti"
            className="bg-[#1C3564] text-white px-4 py-2 rounded-md text-center"
            onClick={() => setOpen(false)}
          >
            Unisciti
          </Link>
        </div>
      )}
    </nav>
  );
}
