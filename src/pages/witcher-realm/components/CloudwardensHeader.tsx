import { Link } from "react-router";

export type CloudwardensTab = "deck" | "arena" | "oracle";

interface CloudwardensHeaderProps {
  activeTab: CloudwardensTab;
  onTabChange: (tab: CloudwardensTab) => void;
}

export function CloudwardensHeader({
  activeTab,
  onTabChange,
}: CloudwardensHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-forge-700/80 bg-forge-950/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3.5">
        
        {/* Logo / Título Autoral */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            title="Voltar ao Portfólio Profissional"
            className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors"
          >
            <span>←</span>
            <span className="hidden sm:inline">Portfólio</span>
          </Link>

          <span className="text-forge-700 select-none">•</span>

          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">☁️</span>
            <div>
              <h1 className="font-mono text-sm sm:text-base font-bold tracking-wider text-bone flex items-center gap-1.5">
                <span>CLOUDWARDENS</span>
                <span className="text-[10px] rounded border border-amber-600/50 bg-amber-950/60 px-1.5 py-0.2 text-amber-400">
                  CLF-C02
                </span>
              </h1>
              <p className="hidden md:block font-mono text-[10px] text-steel">
                O Grimório de Cartas & Desafios da Nuvem AWS
              </p>
            </div>
          </div>
        </div>

        {/* Abas de Navegação Tática */}
        <nav className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs font-bold">
          <button
            type="button"
            onClick={() => onTabChange("deck")}
            className={`cursor-pointer rounded-md px-3 py-1.5 transition-all duration-200 ${
              activeTab === "deck"
                ? "border border-amber-500/80 bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                : "border border-transparent text-steel hover:text-bone hover:border-forge-700"
            }`}
          >
            <span>🎴</span> <span className="hidden sm:inline">Grimório</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("arena")}
            className={`cursor-pointer rounded-md px-3 py-1.5 transition-all duration-200 ${
              activeTab === "arena"
                ? "border border-ember/80 bg-ember/20 text-amber-200 shadow-[0_0_12px_rgba(234,88,12,0.2)]"
                : "border border-transparent text-steel hover:text-bone hover:border-forge-700"
            }`}
          >
            <span>⚔️</span> <span className="hidden sm:inline">Arena de Duelo</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("oracle")}
            className={`cursor-pointer rounded-md px-3 py-1.5 transition-all duration-200 ${
              activeTab === "oracle"
                ? "border border-sky-500/80 bg-sky-500/20 text-sky-200 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                : "border border-transparent text-steel hover:text-bone hover:border-forge-700"
            }`}
          >
            <span>📜</span> <span className="hidden sm:inline">Simulado & Quests</span>
          </button>
        </nav>

      </div>
    </header>
  );
}
