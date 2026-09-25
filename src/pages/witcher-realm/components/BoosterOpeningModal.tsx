import { useState } from "react";
import { openBoosterPack } from "../../../data/cloudwardens/playerState";
import type { BoosterPack, Card, PlayerGameState } from "../../../data/cloudwardens/types";
import { Card3D } from "./Card3D";

interface BoosterOpeningModalProps {
  playerState: PlayerGameState;
  onUpdatePlayerState: (updater: (prev: PlayerGameState) => PlayerGameState) => void;
}

export function BoosterOpeningModal({
  playerState,
  onUpdatePlayerState,
}: BoosterOpeningModalProps) {
  const [openingPack, setOpeningPack] = useState<BoosterPack | null>(null);
  const [drawnCards, setDrawnCards] = useState<Card[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);

  const unopenedPacks = playerState.unopenedPacks;
  const streak = playerState.dailyStreak;

  const handleStartOpening = (pack: BoosterPack) => {
    const cards = openBoosterPack(pack);
    setOpeningPack(pack);
    setDrawnCards(cards);
    setRevealedCount(0);
  };

  const handleRevealAll = () => {
    setRevealedCount(drawnCards.length);
  };

  const handleFinishOpening = () => {
    if (!openingPack) return;

    // Adiciona as novas cartas desbloqueadas ao estado
    const newCardIds = drawnCards.map((c) => c.id);

    onUpdatePlayerState((prev) => ({
      ...prev,
      unopenedPacks: prev.unopenedPacks.filter((p) => p.id !== openingPack.id),
      unlockedCardIds: Array.from(new Set([...prev.unlockedCardIds, ...newCardIds])),
    }));

    setOpeningPack(null);
    setDrawnCards([]);
    setRevealedCount(0);
  };

  const handleClaimDailyStreak = () => {
    if (!streak.canClaimToday) return;

    const nextDay = (streak.currentStreakDays % 7) + 1;
    let earnedEther = 50 * nextDay;
    let bonusPack: BoosterPack | null = null;

    if (nextDay === 3) {
      bonusPack = {
        id: `pack-streak-${Date.now()}`,
        name: "Booster de Fidelidade da Guilda",
        description: "Recompensa pelo 3º dia consecutivo de estudos.",
        cardsCount: 3,
        guaranteedRarity: "rare",
      };
    } else if (nextDay === 7) {
      earnedEther = 300;
      bonusPack = {
        id: `pack-streak-legend-${Date.now()}`,
        name: "Cofre Lendário dos Sete Dias",
        description: "Recompensa suprema pelo 7º dia consecutivo de estudos.",
        cardsCount: 4,
        guaranteedRarity: "epic",
      };
    }

    onUpdatePlayerState((prev) => ({
      ...prev,
      etherCurrency: prev.etherCurrency + earnedEther,
      unopenedPacks: bonusPack ? [...prev.unopenedPacks, bonusPack] : prev.unopenedPacks,
      dailyStreak: {
        currentStreakDays: nextDay,
        lastClaimedDate: new Date().toISOString(),
        canClaimToday: false,
      },
    }));
  };

  return (
    <div className="space-y-8 font-mono">
      
      {/* SEÇÃO 1: RECOMPENSA POR LOGIN DIÁRIO (STREAK) */}
      <div className="rounded-xl border border-forge-700/80 bg-gradient-to-r from-forge-900/90 via-forge-950/90 to-black p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500 flex items-center gap-1.5">
              <span>🔥</span> DISCIPLINA DOS CLOUDWARDENS · STREAK DIÁRIO
            </span>
            <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-bone">
              Estudo Contínuo & Recompensas
            </h3>
            <p className="mt-1 text-xs text-steel">
              Conecte-se e estude todos os dias para acumular Unidades de Éter e Boosters com cartas raras garantidas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-amber-600/50 bg-amber-950/40 px-4 py-2 text-center">
              <span className="block text-2xl font-bold text-amber-400">
                {streak.currentStreakDays} 🔥
              </span>
              <span className="text-[10px] text-steel uppercase">
                Dias de Fogo Ativo
              </span>
            </div>

            <button
              type="button"
              disabled={!streak.canClaimToday}
              onClick={handleClaimDailyStreak}
              className="cursor-pointer rounded-md bg-amber-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {streak.canClaimToday ? "Resgatar Recompensa Diária ⭐" : "Já Resgatado Hoje ✓"}
            </button>
          </div>
        </div>

        {/* Trilha visual dos 7 dias */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 pt-4 border-t border-forge-800">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => {
            const targetDay = (streak.currentStreakDays % 7) + 1;
            const isCompleted = day <= streak.currentStreakDays;
            const isToday = day === targetDay && streak.canClaimToday;

            return (
              <div
                key={day}
                className={`rounded-lg border p-3 text-center transition-all ${
                  isToday
                    ? "border-amber-400 bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse"
                    : isCompleted
                      ? "border-emerald-500/50 bg-emerald-950/40 text-emerald-300"
                      : "border-forge-800 bg-forge-950 text-steel"
                }`}
              >
                <span className="block text-[10px] font-bold uppercase tracking-wider">
                  Dia {day}
                </span>
                <span className="block my-1 text-base">
                  {day === 7 ? "🏆" : day === 3 ? "📦" : "⚡"}
                </span>
                <span className="block text-[10px] font-bold">
                  {day === 7 ? "Booster Épico" : day === 3 ? "Booster Raro" : `+${day * 50} Éter`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEÇÃO 2: COFRE DE PACOTES DE CARTAS (BOOSTERS NÃO ABERTOS) */}
      <div>
        <div className="flex items-center justify-between text-xs mb-4">
          <span className="font-bold text-bone flex items-center gap-1.5">
            <span>📦</span> Seus Pacotes Disponíveis para Abertura ({unopenedPacks.length}):
          </span>
          <span className="text-amber-400 font-bold">
            Seu Saldo: {playerState.etherCurrency} Unidades de Éter ⚡
          </span>
        </div>

        {unopenedPacks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-forge-800 p-10 text-center text-xs text-steel">
            <span className="text-3xl block mb-2">📭</span>
            Você não possui pacotes fechados no momento. Conclua Quests, faça Simulados ou mantenha seu streak diário para forjar novos boosters!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {unopenedPacks.map((pack) => (
              <div
                key={pack.id}
                className="rounded-xl border-2 border-amber-500/60 bg-gradient-to-b from-forge-900 via-forge-950 to-black p-5 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-amber-500 font-bold">
                      {pack.cardsCount} CARTAS NO PACOTE
                    </span>
                    {pack.guaranteedRarity && (
                      <span className="rounded border border-purple-500/50 bg-purple-950/60 px-1.5 py-0.2 text-[9px] text-purple-300 uppercase font-bold">
                        Garante {pack.guaranteedRarity}
                      </span>
                    )}
                  </div>

                  <h4 className="font-display text-lg font-bold text-bone">
                    {pack.name}
                  </h4>
                  <p className="mt-2 font-sans text-xs text-slate-300 leading-relaxed">
                    {pack.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-forge-800">
                  <button
                    type="button"
                    onClick={() => handleStartOpening(pack)}
                    className="w-full cursor-pointer rounded-md bg-amber-500 hover:bg-amber-400 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-colors shadow-lg"
                  >
                    Abrir Pacote Agora 📦
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL / TELA DE ABERTURA DE PACOTE EM TEMPO REAL */}
      {openingPack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-forge-900 via-forge-950 to-black p-6 sm:p-8 text-center text-bone shadow-[0_0_50px_rgba(245,158,11,0.4)]">
            
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
              ABRINDO PACOTE DA GUILDA
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-bone">
              {openingPack.name}
            </h3>
            <p className="text-xs text-steel mt-1 mb-6">
              Novos poderes de arquitetura estão sendo forjados para o seu arsenal.
            </p>

            {/* Grid das cartas sorteadas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 justify-items-center">
              {drawnCards.map((card, idx) => {
                const isRevealed = idx < revealedCount;

                return (
                  <div key={`${card.id}-${idx}`} className="flex flex-col items-center">
                    {isRevealed ? (
                      <div className="animate-in fade-in zoom-in duration-300">
                        <Card3D card={card} compact />
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setRevealedCount((prev) => Math.max(prev, idx + 1))}
                        className="cursor-pointer flex h-[330px] w-[215px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-500/70 bg-gradient-to-b from-forge-950 to-black p-4 text-center hover:border-amber-400 hover:scale-103 transition-all shadow-xl group"
                      >
                        <span className="text-4xl group-hover:scale-110 transition-transform">
                          ✨
                        </span>
                        <span className="mt-3 text-xs font-bold uppercase tracking-wider text-amber-400">
                          Clique para Revelar
                        </span>
                        <span className="text-[10px] text-steel mt-1">
                          Carta #{idx + 1}
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Ações da Abertura */}
            <div className="mt-6 pt-4 border-t border-forge-800 flex items-center justify-center gap-4">
              {revealedCount < drawnCards.length ? (
                <button
                  type="button"
                  onClick={handleRevealAll}
                  className="cursor-pointer rounded-md border border-amber-600/60 bg-forge-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-amber-300 hover:border-amber-400 transition-colors"
                >
                  Revelar Todas as Cartas ⚡
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinishOpening}
                  className="cursor-pointer rounded-md bg-emerald-600 hover:bg-emerald-500 px-8 py-3 text-xs font-bold uppercase tracking-wider text-bone transition-colors shadow-lg"
                >
                  Incorporar Cartas ao Meu Grimório ✓
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
