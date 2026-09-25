import { Link } from "react-router";
import type { CloudwardenUser } from "../../../data/cloudwardens/types";

export type CloudwardensTab =
  | "intro"
  | "career"
  | "deckbuilder"
  | "deck"
  | "arena"
  | "boosters"
  | "oracle"
  | "shop"
  | "profile"
  | "tutorial";

interface CloudwardensHeaderProps {
  activeTab: CloudwardensTab;
  onTabChange: (tab: CloudwardensTab) => void;
  onOpenTutorial: () => void;
  user: CloudwardenUser | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  etherBalance: number;
  unopenedPacksCount: number;
  isTutorialCompleted?: boolean;
}

export function CloudwardensHeader({
  activeTab,
  onTabChange,
  onOpenTutorial,
  user,
  onOpenAuth,
  onLogout,
  etherBalance,
  unopenedPacksCount,
  isTutorialCompleted,
}: CloudwardensHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-forge-700/80 bg-forge-950/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 sm:px-6 py-3">
        
        {/* Logo / Título Autoral */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            to="/"
            title="Voltar ao Portfólio Profissional"
            className="flex items-center gap-1 font-mono text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors"
          >
            <span>←</span>
            <span className="hidden md:inline">Portfólio</span>
          </Link>

          <span className="text-forge-700 select-none">•</span>

          <button
            type="button"
            onClick={() => onTabChange("intro")}
            className="flex items-center gap-2 sm:gap-2.5 text-left cursor-pointer group"
            title="Página Inicial do Jogo"
          >
            <span className="text-amber-400 font-bold text-lg sm:text-xl transition-transform group-hover:scale-110">☁️</span>
            <div className="flex flex-col justify-center leading-none">
              <span className="font-mono text-xs sm:text-sm font-extrabold tracking-wider text-bone group-hover:text-amber-300 transition-colors">
                CLOUDWARDENS
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-[0.22em] text-amber-400/90 uppercase mt-0.5">
                TCG CLOUD
              </span>
            </div>
          </button>
        </div>

        {/* Abas Principais Despoluídas */}
        <nav className="flex items-center gap-1 sm:gap-1.5 font-mono text-xs font-bold">
          
          {/* Aba 1: Introdução & Proposta */}
          <button
            type="button"
            onClick={() => onTabChange("intro")}
            className={`cursor-pointer rounded-md px-2.5 py-1.5 transition-all ${
              activeTab === "intro"
                ? "border border-amber-500/80 bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-bold"
                : "border border-transparent text-steel hover:text-bone hover:border-forge-700"
            }`}
          >
            <span>📖</span> <span className="hidden sm:inline">Início</span>
          </button>

          {/* Aba Perfil (quando autenticado) */}
          {user && (
            <button
              type="button"
              onClick={() => onTabChange("profile")}
              className={`cursor-pointer rounded-md px-2.5 py-1.5 transition-all ${
                activeTab === "profile"
                  ? "border border-amber-500/80 bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-bold"
                  : "border border-transparent text-steel hover:text-bone hover:border-forge-700"
              }`}
            >
              <span>🛡️</span> <span className="hidden sm:inline">Perfil</span>
            </button>
          )}

          {/* Aba 2: Modo Carreira */}
          <button
            type="button"
            onClick={() => onTabChange("career")}
            className={`cursor-pointer rounded-md px-2.5 py-1.5 transition-all ${
              activeTab === "career"
                ? "border border-amber-500/80 bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-bold"
                : "border border-transparent text-steel hover:text-bone hover:border-forge-700"
            }`}
          >
            <span>🧭</span> <span className="hidden sm:inline">Carreira</span>
          </button>

          {/* Aba 3: Deckbuilder */}
          <button
            type="button"
            onClick={() => onTabChange("deckbuilder")}
            className={`cursor-pointer rounded-md px-2.5 py-1.5 transition-all ${
              activeTab === "deckbuilder" || activeTab === "deck"
                ? "border border-amber-500/80 bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-bold"
                : "border border-transparent text-steel hover:text-bone hover:border-forge-700"
            }`}
          >
            <span>🛠️</span> <span className="hidden sm:inline">Decks</span>
          </button>

          {/* Aba 4: Arena de Combate */}
          <button
            type="button"
            onClick={() => onTabChange("arena")}
            className={`cursor-pointer rounded-md px-2.5 py-1.5 transition-all ${
              activeTab === "arena"
                ? "border border-ember/80 bg-ember/20 text-amber-200 shadow-[0_0_12px_rgba(234,88,12,0.2)] font-bold"
                : "border border-transparent text-steel hover:text-bone hover:border-forge-700"
            }`}
          >
            <span>⚔️</span> <span className="hidden sm:inline">Arena</span>
          </button>

          {/* Aba 5: Simulados Oficiais */}
          <button
            type="button"
            onClick={() => onTabChange("oracle")}
            className={`cursor-pointer rounded-md px-2.5 py-1.5 transition-all ${
              activeTab === "oracle"
                ? "border border-emerald-500/80 bg-emerald-500/20 text-emerald-200 font-bold shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                : "border border-transparent text-steel hover:text-bone hover:border-forge-700"
            }`}
          >
            <span>📜</span> <span className="hidden md:inline">Simulados</span>
          </button>

          {/* Aba 6: Mercado de Éter */}
          <button
            type="button"
            onClick={() => onTabChange("shop")}
            className={`cursor-pointer rounded-md px-2.5 py-1.5 transition-all ${
              activeTab === "shop"
                ? "border border-amber-500/80 bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-bold"
                : "border border-transparent text-steel hover:text-bone hover:border-forge-700"
            }`}
          >
            <span>🛒</span> <span className="hidden md:inline">Mercado</span>
          </button>
        </nav>

        {/* Recursos do Jogador (Boosters, Saldo de Éter & Guia) */}
        <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs">
          
          {/* Botão de Boosters */}
          <button
            type="button"
            onClick={() => onTabChange("boosters")}
            title="Abrir Cofre de Boosters"
            className={`relative flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-all cursor-pointer ${
              activeTab === "boosters"
                ? "border border-purple-500 bg-purple-950/60 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                : "border border-forge-700 bg-forge-900/60 text-purple-300 hover:border-purple-500/60"
            }`}
          >
            <span>🎁</span>
            <span className="hidden sm:inline">Boosters</span>
            {unopenedPacksCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] text-black font-extrabold animate-pulse">
                {unopenedPacksCount}
              </span>
            )}
          </button>

          {/* Saldo de Éter (Clicável -> abre o Mercado) */}
          <button
            type="button"
            onClick={() => onTabChange("shop")}
            title="Ver saldo e comprar itens no Mercado de Éter"
            className="hidden md:inline-flex items-center gap-1 rounded border border-amber-600/40 bg-amber-950/40 px-2 py-1 text-amber-300 font-bold text-[11px] hover:border-amber-500 hover:bg-amber-900/50 transition-colors cursor-pointer"
          >
            <span>⚡</span>
            <span>{etherBalance} Éter</span>
          </button>

          {/* Botão de Tutorial (Apenas visível se o tutorial NÃO tiver sido concluído) */}
          {!isTutorialCompleted && (
            <button
              type="button"
              onClick={onOpenTutorial}
              title="Abrir Tutorial do Aprendiz"
              className="cursor-pointer text-steel hover:text-amber-400 text-xs underline"
            >
              ❓ <span className="hidden sm:inline">Guia</span>
            </button>
          )}

          {/* Perfil do Guardião / Botão de Autenticação */}
          {user ? (
            <div className="flex items-center gap-1.5 rounded-lg border border-amber-600/50 bg-amber-950/50 px-2 py-1 text-xs text-amber-200">
              <button
                type="button"
                onClick={() => onTabChange("profile")}
                title="Acessar Perfil do Guardião"
                className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="text-sm">
                  {user.faction === "amber" ? "🛡️" : user.faction === "silicon" ? "⚡" : "🌀"}
                </span>
                <div className="hidden lg:block text-left leading-tight">
                  <span className="block font-bold text-bone max-w-[90px] truncate">{user.name}</span>
                  <span className="block text-[9px] text-amber-400/80">{user.guardianTitle}</span>
                </div>
              </button>

              <button
                type="button"
                onClick={onLogout}
                title="Desconectar Guardião"
                className="cursor-pointer text-steel hover:text-red-400 pl-1 text-[11px] font-bold transition-colors ml-1 border-l border-forge-700/60"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              title="Entrar ou Cadastrar Guardião"
              className="cursor-pointer rounded-md border border-amber-500/80 bg-gradient-to-r from-amber-600 to-amber-500 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-black shadow-md hover:from-amber-500 hover:to-amber-400 transition-all hover:scale-105"
            >
              🔑 <span className="hidden sm:inline">Entrar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
