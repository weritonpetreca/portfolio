import { Link } from "react-router";

export type CloudwardensTab = "career" | "deckbuilder" | "deck" | "arena" | "boosters" | "oracle";

interface CloudwardensHeaderProps {
  activeTab: CloudwardensTab;
  onTabChange: (tab: CloudwardensTab) => void;
  onOpenTutorial: () => void;
  etherBalance: number;
  unopenedPacksCount: number;
}

export function CloudwardensHeader({
  activeTab,
  onTabChange,
  onOpenTutorial,
  etherBalance,
  unopenedPacksCount,
}: CloudwardensHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-forge-700/80 bg-forge-950/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 sm:px-6 py-3">
        
        {/* Logo / Título Autoral */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            title="Voltar ao Portfólio Profissional"
            className="flex items-center gap-1 font-mono text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors"
          >
            <span>←</span>
            <span className="hidden md:inline">Portfólio</span>
          </Link>

          <span className="text-forge-700 select-none">•</span>

          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">☁️</span>
            <div>
              <h1 className="font-mono text-sm sm:text-base font-bold tracking-wider text-bone flex items-center gap-1.5">
                <span>CLOUDWARDENS</span>
                <span className="text-[10px] rounded border border-amber-600/50 bg-amber-950/60 px-1.5 py-0.2 text-amber-400 font-bold">
                  SKILL BUILDER
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Abas de Navegação Principal */}
        <nav className="flex items-center gap-1 sm:gap-1.5 font-mono text-xs font-bold">
          
          <button
            type="button"
            onClick={() => onTabChange("career")}
            className={`cursor-pointer rounded-md px-2.5 py-1.5 transition-all ${
              activeTab === "career"
                ? "border border-amber-500/80 bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-bold"
                : "border border-transparent text-steel hover:text-bone hover:border-forge-700"
            }`}
          >
            <span>🧭</span> <span className="hidden sm:inline">Modo Carreira</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("deckbuilder")}
            className={`cursor-pointer rounded-md px-2.5 py-1.5 transition-all ${
              activeTab === "deckbuilder"
                ? "border border-amber-500/80 bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-bold"
                : "border border-transparent text-steel hover:text-bone hover:border-forge-700"
            }`}
          >
            <span>🛠️</span> <span className="hidden sm:inline">Decks</span>
          </button>

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

          <button
            type="button"
            onClick={() => onTabChange("boosters")}
            className={`cursor-pointer rounded-md px-2.5 py-1.5 transition-all relative ${
              activeTab === "boosters"
                ? "border border-purple-500/80 bg-purple-500/20 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.2)] font-bold"
                : "border border-transparent text-steel hover:text-bone hover:border-forge-700"
            }`}
          >
            <span>🎁</span> <span className="hidden sm:inline">Boosters</span>
            {unopenedPacksCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] text-black font-extrabold animate-pulse">
                {unopenedPacksCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onTabChange("deck")}
            className={`cursor-pointer rounded-md px-2.5 py-1.5 transition-all ${
              activeTab === "deck"
                ? "border border-sky-500/80 bg-sky-500/20 text-sky-200 font-bold"
                : "border border-transparent text-steel hover:text-bone hover:border-forge-700"
            }`}
          >
            <span>🎴</span> <span className="hidden md:inline">Grimório</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("oracle")}
            className={`cursor-pointer rounded-md px-2.5 py-1.5 transition-all ${
              activeTab === "oracle"
                ? "border border-emerald-500/80 bg-emerald-500/20 text-emerald-200 font-bold"
                : "border border-transparent text-steel hover:text-bone hover:border-forge-700"
            }`}
          >
            <span>📜</span> <span className="hidden md:inline">Simulado</span>
          </button>
        </nav>

        {/* Recursos Rápidos & Tutorial */}
        <div className="hidden lg:flex items-center gap-3 font-mono text-xs">
          <span className="rounded border border-amber-600/40 bg-amber-950/40 px-2 py-1 text-amber-300 font-bold text-[11px]">
            ⚡ {etherBalance} Éter
          </span>

          <button
            type="button"
            onClick={onOpenTutorial}
            title="Abrir Tutorial do Aprendiz"
            className="cursor-pointer text-steel hover:text-amber-400 text-xs underline"
          >
            Tutorial 📜
          </button>
        </div>

      </div>
    </header>
  );
}
