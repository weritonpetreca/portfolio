import { useState } from "react";
import { Link } from "react-router";
import { PrivacyModal } from "../ui/PrivacyModal.tsx";

const currentYear = new Date().getFullYear();

// Substitua pela URL exata do seu repositório no GitHub
const PORTFOLIO_REPO_URL = "https://github.com/weritonpetreca/portfolio";

export function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
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

        {/* Banner de Destaque Oficial: Cloudwardens */}
        <div className="relative overflow-hidden rounded-xl border border-amber-500/40 bg-gradient-to-r from-forge-900 via-forge-950 to-amber-950/40 p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.15)] font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-amber-500/60 bg-amber-950/70 text-3xl shadow-[0_0_20px_rgba(245,158,11,0.35)]">
                ☁️
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                    PROJETO AUTORAL EM DESTAQUE
                  </span>
                  <span className="rounded border border-amber-600/40 bg-amber-950/80 px-1.5 py-0.2 text-[10px] text-amber-300 font-semibold">
                    TCG DE ARQUITETURA + SIMULADOR CLOUD
                  </span>
                </div>
                <h4 className="mt-1 font-display text-lg sm:text-xl font-bold text-bone">
                  Cloudwardens: O Domínio de Âmbar
                </h4>
                <p className="mt-1 font-sans text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  Aprenda arquitetura de nuvem AWS de forma gamificada com trilhas de carreira, simulados oficiais para certificações (CLF-C02), abertura de boosters e montagem de decks táticos.
                </p>
              </div>
            </div>

            <Link
              to="/witcher-realm"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-amber-500/80 bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg transition-all duration-200 hover:from-amber-500 hover:to-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] cursor-pointer"
            >
              <span>Acessar Cloudwardens</span>
              <span>➔</span>
            </Link>
          </div>
        </div>

        {/* Linha Inferior: Direitos Autorais + Tech Stack + Código Fonte */}
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
            <span className="hidden sm:inline text-forge-700/80">•</span>
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="cursor-pointer text-slate-400 underline decoration-forge-700 underline-offset-4 transition-colors hover:text-amber-400 hover:decoration-amber-400"
            >
              Privacidade & LGPD
            </button>
          </div>

          <Link
            to="/witcher-realm"
            className="group inline-flex items-center gap-2 font-mono text-xs text-amber-400/90 transition-colors hover:text-amber-300"
          >
            <span>☁️</span>
            <span className="underline decoration-amber-500/50 underline-offset-4 font-bold">
              Explorar Cloudwardens
            </span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>

        </div>

      </div>

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </footer>
  );
}