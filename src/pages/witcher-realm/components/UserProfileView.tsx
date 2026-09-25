import { CLOUDWARDENS_CARDS } from "../../../data/cloudwardens/cards";
import type { CloudwardensTab } from "./CloudwardensHeader";
import type { PlayerGameState } from "../../../data/cloudwardens/types";

interface UserProfileViewProps {
  playerState: PlayerGameState;
  onNavigate: (tab: CloudwardensTab) => void;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export function UserProfileView({
  playerState,
  onNavigate,
  onLogout,
  onOpenAuth,
}: UserProfileViewProps) {
  const { user } = playerState;

  const totalCards = CLOUDWARDENS_CARDS.length;
  const unlockedCount = playerState.unlockedCardIds.length;
  const anomalies = CLOUDWARDENS_CARDS.filter((c) => c.type === "anomaly");

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-6 font-mono">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-amber-500/50 bg-amber-950/40 text-4xl shadow-lg">
          🛡️
        </div>
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            IDENTIDADE NÃO SINCRONIZADA
          </span>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-bone">
            Perfil do Guardião Anônimo
          </h2>
          <p className="mt-2 text-xs text-steel max-w-md mx-auto">
            Você está explorando o reino no modo visitante. Para salvar suas cartas raras, histórico de simulados e manter seu saldo de Éter protegido, conecte sua conta.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onOpenAuth}
            className="cursor-pointer rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg hover:from-amber-500 hover:to-amber-400 transition-all"
          >
            🔑 Entrar ou Forjar Registro ➔
          </button>
          <button
            type="button"
            onClick={() => onNavigate("intro")}
            className="cursor-pointer rounded-lg border border-forge-700 bg-forge-900/80 px-6 py-3 text-xs font-bold uppercase tracking-wider text-steel hover:text-bone hover:border-forge-600 transition-all"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  const factionConfig = {
    amber: {
      name: "Ordem de Âmbar",
      cloud: "AWS",
      icon: "🛡️",
      color: "border-amber-500/60 bg-amber-950/40 text-amber-300",
    },
    silicon: {
      name: "Cidadela de Silício",
      cloud: "Azure",
      icon: "⚡",
      color: "border-sky-500/60 bg-sky-950/40 text-sky-300",
    },
    vortex: {
      name: "Vórtice Neural",
      cloud: "GCP",
      icon: "🌀",
      color: "border-purple-500/60 bg-purple-950/40 text-purple-300",
    },
  }[user.faction || "amber"];

  return (
    <div className="space-y-8 font-mono animate-fadeIn">
      {/* 1. CARTÃO PRINCIPAL DE IDENTIDADE DO GUARDIÃO */}
      <div className="rounded-2xl border-2 border-forge-700 bg-gradient-to-r from-forge-900 via-forge-950 to-black p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            {/* Brasão do Guardião */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 border-amber-500/80 bg-gradient-to-b from-amber-900/60 to-black text-4xl shadow-[0_0_25px_rgba(245,158,11,0.35)]">
              {factionConfig.icon}
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-600/50 bg-amber-950/60 px-3 py-0.5 text-[11px] text-amber-300 font-bold">
                <span>{factionConfig.name}</span>
                <span>•</span>
                <span>{user.guardianTitle}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-bone">
                {user.name}
              </h2>
              <p className="text-xs text-steel">
                {user.email} · Registrado na Guilda em {new Date(user.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>

          {/* Botões de Ação do Perfil */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate("shop")}
              className="cursor-pointer rounded-lg border border-amber-500/80 bg-amber-500/20 hover:bg-amber-500/30 px-4 py-2.5 text-xs font-bold text-amber-300 transition-all flex items-center gap-1.5 shadow"
            >
              <span>🛒</span>
              <span>Mercado de Éter</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              title="Encerrar Sessão"
              className="cursor-pointer rounded-lg border border-red-500/50 bg-red-950/30 hover:bg-red-900/40 px-3.5 py-2.5 text-xs font-bold text-red-300 transition-colors"
            >
              Sair ➔
            </button>
          </div>
        </div>

        {/* Grade de Estatísticas do Jogador */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-forge-800 text-xs">
          <div className="rounded-xl border border-amber-600/40 bg-black/40 p-4">
            <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block mb-1">
              ⚡ Saldo de Éter
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-bone">{playerState.etherCurrency}</span>
              <span className="text-amber-400/80 text-[11px]">unidades</span>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-600/40 bg-black/40 p-4">
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block mb-1">
              🔥 Streak Diário
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-bone">{playerState.dailyStreak.currentStreakDays}</span>
              <span className="text-emerald-400/80 text-[11px]">
                {playerState.dailyStreak.currentStreakDays === 1 ? "dia consecutivo" : "dias consecutivos"}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-sky-600/40 bg-black/40 p-4">
            <span className="text-[10px] uppercase tracking-wider text-sky-400 font-bold block mb-1">
              🎴 Grimório
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-bone">{unlockedCount}</span>
              <span className="text-steel text-[11px]">/ {totalCards} cartas</span>
            </div>
          </div>

          <div className="rounded-xl border border-purple-600/40 bg-black/40 p-4">
            <span className="text-[10px] uppercase tracking-wider text-purple-400 font-bold block mb-1">
              📦 Boosters Prontos
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-bone">{playerState.unopenedPacks.length}</span>
              <button
                type="button"
                onClick={() => onNavigate("boosters")}
                className="text-purple-400 hover:text-purple-300 underline text-[11px] cursor-pointer ml-auto"
              >
                Abrir ➔
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAESTRIA DE INCIDENTES OPERACIONAIS (ANOMALIAS) */}
      <div className="rounded-xl border border-forge-800 bg-black/60 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-red-400 font-bold">
              INVESTIGAÇÃO TÉCNICA · HISTÓRICO DE RESILIÊNCIA
            </span>
            <h3 className="font-display text-xl font-bold text-bone">
              Maestria de Incidentes & Telemetria
            </h3>
            <p className="text-xs text-steel mt-1">
              Ao derrotar anomalias na Arena de Combate, você desbloqueia segredos de arquitetura no seu Grimório:
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("arena")}
            className="self-start sm:self-auto cursor-pointer rounded-lg bg-ember px-4 py-2 text-xs font-bold uppercase tracking-wider text-bone hover:bg-ember/90 transition-colors shadow"
          >
            Entrar na Arena ⚔️
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-3">
          {anomalies.map((anomaly) => {
            const mastery = playerState.anomalyMastery[anomaly.id] || 0;
            const levelTitles = [
              "Nível 0 · Oculto 🔒",
              "Nível 1 · Sintomas Revelados ⚠️",
              "Nível 2 · Anti-padrões Mapeados 🚫",
              "Nível 3 · Arquitetura Dominada ⭐",
            ];

            return (
              <div
                key={anomaly.id}
                className="rounded-lg border border-forge-800 bg-forge-950/80 p-3.5 space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-bone truncate">{anomaly.name}</span>
                  <span className="text-amber-400 shrink-0 text-[11px]">HP: {anomaly.defense}</span>
                </div>
                <span className="text-[10px] text-steel block">{anomaly.awsService}</span>

                <div className="pt-1">
                  <div className="flex items-center justify-between text-[10px] text-steel mb-1">
                    <span>Maestria</span>
                    <span className="font-bold text-amber-300">{levelTitles[mastery]}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-forge-900 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
                      style={{ width: `${(mastery / 3) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. DECKS E ARSENAL RÁPIDO */}
      <div className="rounded-xl border border-forge-800 bg-black/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            GERENCIADOR TÁTICO
          </span>
          <h3 className="font-display text-lg font-bold text-bone">
            Seus Decks de Combate Forjados ({playerState.savedDecks.length} / 3)
          </h3>
          <p className="text-xs text-steel mt-1">
            Personalize suas estratégias para enfrentar anomalias de alta concorrência ou segurança.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate("deckbuilder")}
          className="cursor-pointer rounded-lg border border-forge-700 bg-forge-900/90 px-5 py-2.5 text-xs font-bold text-bone hover:border-amber-500 transition-colors shadow"
        >
          Editar Decks no DeckBuilder 🛠️
        </button>
      </div>
    </div>
  );
}
