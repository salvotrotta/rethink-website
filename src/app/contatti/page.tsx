import sedi from "@/data/sedi.json";

export const metadata = {
  title: "Contatti – ReThink",
  description: "Contatta ReThink: team nazionale, sedi locali e canali social.",
};

const sediFondate = sedi.filter((s) => s.stato === "fondata" && s.instagram);

export default function Contatti() {
  return (
    <>
      <section className="bg-[#0A0A0A] text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#4A90D9] text-sm font-semibold uppercase tracking-widest mb-4">Contatti</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            Parliamo
          </h1>
          <p className="text-gray-300 mt-4 text-lg">
            Per qualsiasi domanda, proposta di collaborazione o informazioni sulle sedi.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#F9F9F7]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Nazionale */}
          <div className="bg-white border border-[#EBEBEB] rounded-lg p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
              Team Nazionale
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-1">Email</p>
                <a href="mailto:info@rethink-uni.it" className="text-[#1C3564] font-semibold hover:underline">
                  info@rethink-uni.it
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-1">Instagram</p>
                <a href="https://www.instagram.com/ReThink_uni" target="_blank" rel="noopener noreferrer" className="text-[#1C3564] font-semibold hover:underline">
                  @ReThink_uni
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-1">Tutti i link</p>
                <a href="https://linktr.ee/ReThink_uni" target="_blank" rel="noopener noreferrer" className="text-[#1C3564] font-semibold hover:underline">
                  linktr.ee/ReThink_uni
                </a>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <a
                href="mailto:info@rethink-uni.it?subject=Informazioni generali"
                className="block w-full bg-[#1C3564] text-white px-5 py-3 rounded-md font-semibold text-center hover:bg-[#243f7a] transition-colors text-sm"
              >
                Scrivici una mail
              </a>
              <a
                href="mailto:info@rethink-uni.it?subject=Voglio fondare ReThink nella mia università"
                className="block w-full border border-[#1C3564] text-[#1C3564] px-5 py-3 rounded-md font-semibold text-center hover:bg-[#1C3564] hover:text-white transition-colors text-sm"
              >
                Voglio fondare una sede
              </a>
              <a
                href="mailto:info@rethink-uni.it?subject=Proposta di collaborazione"
                className="block w-full border border-[#EBEBEB] text-[#4A4A4A] px-5 py-3 rounded-md font-semibold text-center hover:bg-[#EBEBEB] transition-colors text-sm"
              >
                Proposta di collaborazione
              </a>
            </div>
          </div>

          {/* Sedi locali */}
          <div className="bg-white border border-[#EBEBEB] rounded-lg p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
              Sedi locali
            </h2>
            <p className="text-[#4A4A4A] text-sm mb-5">
              Contatta direttamente la sede della tua università tramite Instagram.
            </p>
            <div className="space-y-3">
              {sediFondate.map((s) => (
                <a
                  key={s.slug}
                  href={s.instagram!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 border border-[#EBEBEB] rounded-lg hover:border-[#1C3564] transition-colors group"
                >
                  <div>
                    <p className="font-semibold text-sm group-hover:text-[#1C3564]">{s.nome}</p>
                    <p className="text-xs text-[#4A4A4A]">{s.citta}</p>
                  </div>
                  <span className="text-[#1C3564] text-xs font-semibold">Instagram →</span>
                </a>
              ))}
            </div>
            <p className="text-xs text-[#4A4A4A] mt-4">
              Non trovi la tua università?{" "}
              <a href="/unisciti" className="text-[#1C3564] hover:underline font-semibold">
                Scopri come fondare una sede →
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
