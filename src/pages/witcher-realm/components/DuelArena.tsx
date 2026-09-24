import { useState } from "react";
import { CLOUDWARDENS_CARDS, CLOUDWARDENS_SYNERGIES } from "../../../data/cloudwardens/cards";
import type { Card, CardSynergy } from "../../../data/cloudwardens/types";
import { Card3D } from "./Card3D";

export function DuelArena() {
  const allGuardians = CLOUDWARDENS_CARDS.filter((c) => c.type === "guardian");
  const allAnomalies = CLOUDWARDENS_CARDS.filter((c) => c.type === "anomaly");

  // Estado do combate
  const [currentAnomalyIndex, setCurrentAnomalyIndex] = useState(0);
  const [fortressHp, setFortressHp] = useState(25);
  const [anomalyHp, setAnomalyHp] = useState(20);
  const [etherUnits, setEtherUnits] = useState(6);

  // Deck, Mão e Tabuleiro (One-use por turno + compra estilo Gwent)
  const [hand, setHand] = useState<Card[]>(() => allGuardians.slice(0, 4));
  const [drawDeck, setDrawDeck] = useState<Card[]>(() => allGuardians.slice(4));
  const [playedField, setPlayedField] = useState<Card[]>([]);

  // Animações de Ataque e Dano
  const [attackingCardId, setAttackingCardId] = useState<string | null>(null);
  const [anomalyImpact, setAnomalyImpact] = useState(false);
  const [fortressImpact, setFortressImpact] = useState(false);
  const [floatingDamage, setFloatingDamage] = useState<{
    target: "anomaly" | "fortress";
    text: string;
    isCrit: boolean;
  } | null>(null);
  const [activeSynergyAlert, setActiveSynergyAlert] = useState<CardSynergy | null>(null);

  const [battleLogs, setBattleLogs] = useState<string[]>([
    "⚔️ O alarme de monitoramento soou! Uma anomalia foi detectada nas fronteiras da nuvem.",
  ]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const currentAnomaly = allAnomalies[currentAnomalyIndex] || allAnomalies[0];

  const handlePlayCard = (card: Card) => {
    if (isGameOver || attackingCardId) return;

    if (etherUnits < card.energyCost) {
      setBattleLogs((prev) => [
        `⚠️ Éter insuficiente! Você precisa de ${card.energyCost} unidades para mobilizar ${card.name}.`,
        ...prev,
      ]);
      return;
    }

    // 1. Inicia animação de avanço da carta
    setAttackingCardId(card.id);

    // 2. Cálculo de Sinergia (estilo Gwent) com cartas já no campo
    let synergyBonusPower = 0;
    let triggeredSynergy: CardSynergy | null = null;

    if (card.synergyTags) {
      const fieldTags = new Set(playedField.flatMap((c) => c.synergyTags || []));
      for (const tag of card.synergyTags) {
        fieldTags.add(tag);
      }

      for (const syn of CLOUDWARDENS_SYNERGIES) {
        const hasAllTags = syn.requiredTags.every((req) => fieldTags.has(req));
        if (hasAllTags && !activeSynergyAlert) {
          triggeredSynergy = syn;
          synergyBonusPower = syn.bonusPower;
          break;
        }
      }
    }

    if (triggeredSynergy) {
      setActiveSynergyAlert(triggeredSynergy);
      setTimeout(() => setActiveSynergyAlert(null), 3000);
    }

    // 3. Cálculo de Dano Crítico e Efeitos
    const isCritical = card.counters?.includes(currentAnomaly.id);
    const baseDamage = isCritical ? card.power * 2 : card.power;
    const totalDamage = baseDamage + synergyBonusPower;
    const newAnomalyHp = Math.max(0, anomalyHp - totalDamage);

    // Efeito de impacto no inimigo
    setTimeout(() => {
      setAnomalyImpact(true);
      setFloatingDamage({
        target: "anomaly",
        text: `-${totalDamage} ${isCritical ? "CRÍTICO!" : ""}`,
        isCrit: !!isCritical,
      });
      setTimeout(() => {
        setAnomalyImpact(false);
        setFloatingDamage(null);
      }, 1200);
    }, 250);

    const logEntry = isCritical
      ? `💥 DANO CRÍTICO DE ARQUITETURA! ${card.name} (${card.awsService}) contra-atacou a fraqueza de ${currentAnomaly.name}, infligindo ${totalDamage} de dano!${
          triggeredSynergy ? ` (Sinergia: +${synergyBonusPower} ATK)` : ""
        }`
      : `⚔️ Você mobilizou ${card.name} (${card.awsService}), infligindo ${totalDamage} de dano à anomalia.${
          triggeredSynergy ? ` (Sinergia: +${synergyBonusPower} ATK)` : ""
        }`;

    // Atualiza campo e mão (carta consumida, só pode ser usada UMA vez)
    const nextHand = hand.filter((c) => c.id !== card.id);
    const nextPlayed = [...playedField, card];

    // Se anomalia foi destruída: Vitória
    if (newAnomalyHp <= 0) {
      setAnomalyHp(0);
      setHand(nextHand);
      setPlayedField(nextPlayed);
      setAttackingCardId(null);
      setBattleLogs((prev) => [
        `🏆 VITÓRIA! ${currentAnomaly.name} foi totalmente neutralizada com sucesso! A fortaleza permaneceu estável.`,
        logEntry,
        ...prev,
      ]);
      setHasWon(true);
      setIsGameOver(true);
      return;
    }

    // Contra-ataque da anomalia com delay tático
    setTimeout(() => {
      const incomingDamage = Math.max(
        1,
        currentAnomaly.power - Math.floor(card.defense / 2) - (triggeredSynergy?.bonusDefense || 0)
      );
      const newFortressHp = Math.max(0, fortressHp - incomingDamage);

      setFortressImpact(true);
      setFloatingDamage({
        target: "fortress",
        text: `-${incomingDamage} HP`,
        isCrit: false,
      });
      setTimeout(() => {
        setFortressImpact(false);
        setFloatingDamage(null);
      }, 1000);

      // Compra de carta ao final do turno se houver no deck
      let updatedHand = nextHand;
      let updatedDeck = drawDeck;
      if (drawDeck.length > 0 && nextHand.length < 4) {
        const [drawnCard, ...remainingDeck] = drawDeck;
        updatedHand = [...nextHand, drawnCard];
        updatedDeck = remainingDeck;
      }

      const newEther = Math.min(
        10,
        etherUnits - card.energyCost + 2 + (triggeredSynergy?.bonusEther || 0)
      );

      setAnomalyHp(newAnomalyHp);
      setFortressHp(newFortressHp);
      setEtherUnits(newEther);
      setHand(updatedHand);
      setDrawDeck(updatedDeck);
      setPlayedField(nextPlayed);
      setAttackingCardId(null);

      const enemyLog = `⚡ A anomalia revidou! ${currentAnomaly.name} desferiu ${incomingDamage} de dano contra a infraestrutura da sua fortaleza.`;

      if (newFortressHp <= 0) {
        setBattleLogs((prev) => [
          `💀 DOWNTIME TOTAL! A infraestrutura colapsou sob o ataque da anomalia. Reinicie o simulador.`,
          enemyLog,
          logEntry,
          ...prev,
        ]);
        setIsGameOver(true);
        setHasWon(false);
      } else {
        setBattleLogs((prev) => [enemyLog, logEntry, ...prev]);
      }
    }, 700);
  };

  const handleRestart = (nextAnomaly = false) => {
    const nextIdx = nextAnomaly
      ? (currentAnomalyIndex + 1) % allAnomalies.length
      : currentAnomalyIndex;
    setCurrentAnomalyIndex(nextIdx);
    setFortressHp(25);
    setAnomalyHp(20);
    setEtherUnits(6);
    setHand(allGuardians.slice(0, 4));
    setDrawDeck(allGuardians.slice(4));
    setPlayedField([]);
    setAttackingCardId(null);
    setIsGameOver(false);
    setHasWon(false);
    setBattleLogs([
      `🔄 Novo contrato de defesa iniciado contra ${allAnomalies[nextIdx].name}! Mão reabastecida.`,
    ]);
  };

  return (
    <div className="space-y-6">
      
      {/* Placar Superior da Arena */}
      <div className="grid gap-4 sm:grid-cols-3 font-mono text-xs">
        
        {/* Saúde da Fortaleza do Jogador */}
        <div
          className={`rounded-lg border transition-all p-4 text-center sm:text-left ${
            fortressImpact
              ? "border-red-500 bg-red-950/70 shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-102"
              : "border-emerald-500/50 bg-emerald-950/40"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <span>🏰</span> Saúde da Fortaleza
            </span>
            <span className="text-emerald-300 font-bold text-sm">
              {fortressHp} / 25 HP
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-forge-950 border border-forge-800">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${(fortressHp / 25) * 100}%` }}
            />
          </div>
        </div>

        {/* Recursos de Éter (Compute Units) */}
        <div className="rounded-lg border border-amber-500/50 bg-amber-950/40 p-4 text-center">
          <div className="flex items-center justify-between mb-1">
            <span className="text-amber-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
              <span>⚡</span> Capacidade de Éter
            </span>
            <span className="text-amber-300 font-bold text-sm">
              {etherUnits} / 10
            </span>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className={`h-2.5 w-2.5 rounded-full border transition-all ${
                  i < etherUnits
                    ? "border-amber-400 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                    : "border-forge-800 bg-forge-950"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Informações de Compra e Deck */}
        <div className="rounded-lg border border-sky-500/50 bg-sky-950/40 p-4 text-center sm:text-right">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sky-400 font-bold uppercase tracking-wider">
              📚 Deck de Compra
            </span>
            <span className="text-sky-300 font-bold text-sm">
              {drawDeck.length} cartas
            </span>
          </div>
          <p className="text-[11px] text-steel mt-1">
            Compre 1 carta ao fim de cada turno.
          </p>
        </div>

      </div>

      {/* Alerta de Sinergia Arquitetural Ativada (Estilo Gwent) */}
      {activeSynergyAlert && (
        <div className="rounded-lg border-2 border-amber-400 bg-gradient-to-r from-amber-950 via-amber-900 to-black p-4 text-center shadow-[0_0_25px_rgba(245,158,11,0.4)] animate-pulse">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center justify-center gap-2">
            <span>✨</span> SINERGIA DE ARQUITETURA ATIVADA: {activeSynergyAlert.name}!
          </span>
          <p className="font-sans text-xs text-bone mt-1">
            {activeSynergyAlert.description} (+{activeSynergyAlert.bonusPower} ATK, +{activeSynergyAlert.bonusDefense} DEF)
          </p>
        </div>
      )}

      {/* Campo Central da Batalha */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Lado Esquerdo / Central: Oponente (Anomalia) e Mão do Jogador */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card do Chefe Anomalia */}
          <div
            className={`relative rounded-xl border-2 p-6 transition-all duration-300 ${
              anomalyImpact
                ? "border-red-500 bg-red-950/70 shadow-[0_0_30px_rgba(239,68,68,0.6)] scale-102 ring-2 ring-red-400"
                : "border-red-600/60 bg-gradient-to-b from-red-950/40 via-forge-950 to-black"
            }`}
          >
            {/* Dano Flutuante */}
            {floatingDamage && floatingDamage.target === "anomaly" && (
              <div className="absolute top-4 right-6 z-30 font-mono text-xl sm:text-2xl font-extrabold text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,1)] animate-bounce">
                {floatingDamage.text}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="font-mono text-xs uppercase tracking-widest text-red-400 font-bold flex items-center gap-1.5 justify-center sm:justify-start">
                  <span>⚠️</span> ANOMALIA EM CURSO · {currentAnomalyIndex + 1} de {allAnomalies.length}
                </span>
                <h3 className="font-display text-2xl font-bold text-bone mt-1">
                  {currentAnomaly.name}
                </h3>
                <span className="font-mono text-xs text-amber-400 font-bold block">
                  {currentAnomaly.awsService}
                </span>
                <p className="font-sans text-xs text-slate-300 mt-2 max-w-md">
                  "{currentAnomaly.flavorText}"
                </p>
              </div>

              {/* Barra de Vida da Anomalia */}
              <div className="w-full sm:w-48 text-center sm:text-right font-mono text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-steel">Integridade:</span>
                  <span className="text-red-400 font-bold text-sm">
                    {anomalyHp} / 20 HP
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-forge-900 border border-red-900">
                  <div
                    className="h-full bg-red-600 transition-all duration-300"
                    style={{ width: `${(anomalyHp / 20) * 100}%` }}
                  />
                </div>
                <span className="mt-2 block text-[10px] text-steel">
                  Fraqueza: <strong className="text-amber-400">{currentAnomaly.weakness}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Cartas em Campo (Sinergias Ativas) */}
          {playedField.length > 0 && (
            <div className="rounded-lg border border-forge-700/60 bg-black/50 p-3 font-mono text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-steel text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <span>🏛️</span> Infraestrutura Forjada em Campo (Sinergias Ativas):
                </span>
                <span className="text-amber-400 text-[10px]">
                  {playedField.length} cartas implantadas
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {playedField.map((c, i) => (
                  <span
                    key={`${c.id}-${i}`}
                    className="rounded border border-amber-600/40 bg-forge-900/80 px-2 py-0.5 text-[10px] text-amber-300"
                  >
                    {c.awsService}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mão do Jogador (Cartas Únicas por Turno) */}
          <div>
            <div className="flex items-center justify-between mb-3 font-mono text-xs">
              <span className="font-bold text-bone flex items-center gap-1.5">
                <span>🎴</span> Sua Mão de Guardiões ({hand.length}/4) — Cada carta só pode ser mobilizada 1 vez:
              </span>
              <span className="text-steel text-[11px]">
                Clique na carta para mobilizar
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
              {hand.map((card) => {
                const isThisAttacking = attackingCardId === card.id;
                const canAfford = etherUnits >= card.energyCost;

                return (
                  <div
                    key={card.id}
                    className={`transition-all duration-300 ${
                      isThisAttacking
                        ? "scale-108 -translate-y-4 shadow-[0_0_25px_rgba(245,158,11,0.6)] z-30"
                        : ""
                    } ${!canAfford ? "opacity-45 grayscale pointer-events-none" : ""}`}
                  >
                    <Card3D card={card} compact onSelect={handlePlayCard} />
                  </div>
                );
              })}

              {hand.length === 0 && (
                <div className="w-full text-center py-8 font-mono text-xs text-steel border border-dashed border-forge-800 rounded-lg">
                  Suas cartas de mão foram todas mobilizadas na infraestrutura!
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Lado Direito: Log de Batalha Tático & Controles */}
        <div className="flex flex-col justify-between rounded-xl border border-forge-700/80 bg-forge-950/90 p-5 shadow-xl font-mono text-xs">
          <div>
            <div className="flex items-center justify-between border-b border-forge-700/60 pb-2 mb-3">
              <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>📜</span> Log da Batalha
              </span>
              <span className="text-[10px] text-steel">Tempo Real</span>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {battleLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`rounded p-2 text-[11px] leading-relaxed border ${
                    log.includes("CRÍTICO")
                      ? "border-amber-500/60 bg-amber-950/40 text-amber-200 font-bold"
                      : log.includes("VITÓRIA")
                        ? "border-emerald-500/60 bg-emerald-950/40 text-emerald-200 font-bold"
                        : log.includes("DOWNTIME")
                          ? "border-red-500/60 bg-red-950/40 text-red-200 font-bold"
                          : "border-forge-800 bg-forge-900/40 text-slate-300"
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Botões de Ação Final */}
          <div className="mt-4 pt-3 border-t border-forge-700/60 flex flex-col gap-2">
            {isGameOver && (
              <button
                type="button"
                onClick={() => handleRestart(hasWon)}
                className={`w-full cursor-pointer rounded-md py-2.5 font-bold uppercase tracking-wider transition-colors ${
                  hasWon
                    ? "bg-emerald-600 text-bone hover:bg-emerald-500"
                    : "bg-ember text-bone hover:bg-ember-soft"
                }`}
              >
                {hasWon ? "Enfrentar Próxima Anomalia ⚔️" : "Reconstruir Infraestrutura 🔄"}
              </button>
            )}

            <button
              type="button"
              onClick={() => handleRestart(false)}
              className="w-full cursor-pointer rounded-md border border-forge-700 bg-forge-900 py-1.5 text-steel hover:text-bone hover:border-amber-500/60 transition-colors"
            >
              Reiniciar Duelo Atual
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
