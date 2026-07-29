import { Link } from "react-router";

const currentYear = new Date().getFullYear();

// Substitua pela URL exata do seu repositório no GitHub
const PORTFOLIO_REPO_URL = "https://github.com/weritonpetreca/portfolio";

export function Footer() {
  return (
    <footer className="texture-forged border-t border-forge-700/80 bg-forge-950/90 px-6 py-12 sm:py-16">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 text-slate-300">
        
        {/* Linha Superior: Links Sociais Principais */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-sm sm:text-base font-bold">
          <a
            href="https://linkedin.com/in/weriton-petreca"
            target="_blank"
            rel="noreferrer"
            className="transition-all duration-200 hover:-translate-y-0.5 hover:text-sky-400 hover:shadow-[0_0_12px_rgba(56,189,248,0.3)]"
          >
            LinkedIn
          </a>
          <span className="text-forge-700/80 select-none">•</span>
          <a
            href="https://github.com/weritonpetreca"
            target="_blank"
            rel="noreferrer"
            className="transition-all duration-200 hover:-translate-y-0.5 hover:text-bone"
          >
            GitHub
          </a>
          <span className="text-forge-700/80 select-none">•</span>
          <a
            href="https://www.credly.com/users/weriton-luis-petreca"
            target="_blank"
            rel="noreferrer"
            className="transition-all duration-200 hover:-translate-y-0.5 hover:text-amber-400 hover:shadow-[0_0_12px_rgba(245,158,11,0.3)]"
          >
            Credly
          </a>
          <span className="text-forge-700/80 select-none">•</span>
          <a
            href="https://wa.me/5535997231989?text=Ol%C3%A1%20Weriton,%20vi%20seu%20portf%C3%B3lio!"
            target="_blank"
            rel="noreferrer"
            className="transition-all duration-200 hover:-translate-y-0.5 hover:text-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.3)]"
          >
            WhatsApp
          </a>
        </div>

        {/* Linha Inferior: Direitos Autorais + Tech Stack + Código Fonte + Witcher Realm */}
        <div className="flex flex-col gap-4 border-t border-forge-700/60 pt-6 sm:flex-row sm:items-center sm:justify-between font-mono text-xs sm:text-sm">
          
          <div className="flex flex-wrap items-center gap-2 text-slate-300">
            <span className="font-semibold text-bone">© {currentYear} Weriton Petreca.</span>
            <span className="hidden sm:inline text-forge-700/80">•</span>
            <span className="text-slate-400">Forjado com React, Tailwind & AWS.</span>
            <span className="hidden sm:inline text-forge-700/80">•</span>
            
            {/* Link direto para o repositório deste portfólio */}
            <a
              href={PORTFOLIO_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="text-amber-400/90 underline decoration-amber-400/40 underline-offset-4 transition-colors hover:text-amber-300 hover:decoration-amber-300"
            >
              [Código-fonte ↗]
            </a>
          </div>

          {/* RF-03: ponto de entrada único e discreto para a segunda persona */}
          <Link
            to="/witcher-realm"
            className="group inline-flex items-center gap-2.5 font-medium italic text-slate-400 transition-all duration-300 hover:text-amber-400"
          >
            <span className="text-base sm:text-lg transition-transform duration-300 group-hover:rotate-12">🐺</span>
            <span className="group-hover:underline group-hover:decoration-amber-400">
              Nas horas vagas, também exploro outros reinos
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 text-amber-500">→</span>
          </Link>

        </div>

      </div>
    </footer>
  );
}