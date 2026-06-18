import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-gray-400 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-white text-lg font-bold font-[Playfair_Display,serif] mb-2">
            Re<span className="text-[#4A90D9]">Think</span>
          </p>
          <p className="text-sm leading-relaxed">
            Associazione apartitica di studenti e ricercatori.<br />
            <em>Pensare con rigore. Costruire con coraggio.</em>
          </p>
        </div>

        <div>
          <p className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Navigazione</p>
          <ul className="space-y-2 text-sm">
            {[
              ["/chi-siamo", "Chi siamo"],
              ["/cosa-facciamo", "Cosa facciamo"],
              ["/sedi", "Sedi"],
              ["/unisciti", "Unisciti"],
              ["/manifesto", "Manifesto"],
              ["/statuto", "Statuto"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Seguici</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://www.instagram.com/ReThink_uni" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://linktr.ee/ReThink_uni" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Linktree
              </a>
            </li>
            <li>
              <Link href="/contatti" className="hover:text-white transition-colors">Contattaci</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} ReThink – Associazione apartitica di studenti e ricercatori
      </div>
    </footer>
  );
}
