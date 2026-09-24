import { useState } from "react";
import { CLOUDWARDENS_CARDS } from "../../../data/cloudwardens/cards";
import type { Card } from "../../../data/cloudwardens/types";
import { Card3D } from "./Card3D";

export function DuelArena() {
  const guardians = CLOUDWARDENS_CARDS.filter((c) => c.type === "guardian");
  const anomalies = CLOUDWARDENS_CARDS.filter((c) => c.type === "anomaly");

  // Estado do combate
  const [currentAnomalyIndex, setCurrentAnomalyIndex] = useState(0);
  const [fortressHp, setFortressHp] = useState(25);
  const [anomalyHp, setAnomalyHp] = useState(20);
  const [etherUnits, setEtherUnits] = useState(6);
  const [battleLogs, setBattleLogs] = useState<string[]>([
    "⚔️ O alarme de monitoramento soou! Uma anomalia foi detectada nas fronteiras da nuvem.",
  ]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const currentAnomaly = anomalies[currentAnomalyIndex] || anomalies[0];
  const playerHand = guardians.slice(0, 4);

  const handlePlayCard = (card: Card) => {
    if (isGameOver) return;

    if (etherUnits < card.energyCost) {
      setBattleLogs((prev) => [
        `⚠️ Éter insuficiente! Você precisa de ${card.energyCost} unidades para invocar ${card.name}.`,
        ...prev,
      ]);
      return;
    }

    const isCritical = card.counters?.includes(currentAnomaly.id);
    const damageDealt = isCritical ? card.power * 2 : card.power;
    const newAnomalyHp = Math.max(0, anomalyHp - damageDealt);
    const newEther = etherUnits - card.energyCost + 2; // Recupera 2 de éter por turno

    const logEntry = isCritical
      ? `💥 DANO CRÍTICO DE ARQUITETURA! ${card.name} (${card.awsService}) contra-atacou a fraqueza de ${currentAnomaly.name}, infligindo ${damageDealt} de dano!`
      : `⚔️ Você mobilizou ${card.name} (${card.awsService}), infligindo ${damageDealt} de dano à anomalia.`;

    if (newAnomalyHp <= 0) {
      setAnomalyHp(0);
      setBattleLogs((prev) => [
        `🏆 VITÓRIA! ${currentAnomaly.name} foi totalmente neutralizada com sucesso! A fortaleza permaneceu estável.`,
        logEntry,
        ...prev,
      ]);
      setHasWon(true);
      setIsGameOver(true);
      return;
    }

    // Contra-ataque da Anomalia
    const incomingDamage = Math.max(1, currentAnomaly.power - Math.floor(card.defense / 2));
    const newFortressHp = Math.max(0, fortressHp - incomingDamage);

    setAnomalyHp(newAnomalyHp);
    setFortressHp(newFortressHp);
    setEtherUnits(Math.min(10, newEther));

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
  };

  const handleRestart = (nextAnomaly = false) => {
    const nextIdx = nextAnomaly
      ? (currentAnomalyIndex + 1) % anomalies.length
      : currentAnomalyIndex;
    setCurrentAnomalyIndex(nextIdx);
    setFortressHp(25);
    setAnomalyHp(20);
    setEtherUnits(6);
    setIsGameOver(false);
    setHasWon(false);
    setBattleLogs([
      `🔄 Novo contrato de defesa iniciado contra ${anomalies[nextIdx].name}!`,
    ]);
  };

  return (
    <div className="space-y-6">
      
      {/* Placar Superior da Arena */}
      <div className="grid gap-4 sm:grid-cols-3 font-mono text-xs">
        
        {/* Saúde da Fortaleza do Jogador */}
        <div className="rounded-lg border border-emerald-500/50 bg-emerald-950/40 p-4 text-center sm:text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="text-emerald-400 font-bold uppercase tracking-wider">
              🏰 Saúde da Fortaleza
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
            <span className="text-amber-400 font-bold uppercase tracking-wider">
              ⚡ Capacidade de Éter
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

        {/* Saúde da Anomalia Inimiga */}
        <div className="rounded-lg border border-red-500/50 bg-red-950/40 p-4 text-center sm:text-right">
          <div className="flex items-center justify-between mb-1">
            <span className="text-red-400 font-bold uppercase tracking-wider">
              💀 Corrupção da Anomalia
            </span>
            <span className="text-red-300 font-bold text-sm">
              {anomalyHp} / 20 HP
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-forge-950 border border-forge-800">
            <div
              className="h-full bg-red-500 transition-all duration-300"
              style={{ width: `${(anomalyHp / 20) * 100}%` }}
            />
          </div>
        </div>

      </div>

      {/* Campo de Batalha Central */}
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        
        {/* Lado Esquerdo: Anomalia Ativa + Mão do Jogador */}
        <div className="space-y-6">
          
          {/* Anomalia em Campo */}
          <div className="rounded-xl border-2 border-red-600/70 bg-gradient-to-b from-red-950/50 via-forge-950 to-black p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span>🚨</span> INCIDENTE DE PRODUÇÃO DETECTADO
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-bone">
                  {currentAnomaly.name}
                </h3>
                <span className="font-mono text-xs font-bold text-amber-400">
                  {currentAnomaly.awsService}
                </span>
                <p className="mt-2 font-sans text-xs sm:text-sm text-slate-300 max-w-xl">
                  {currentAnomaly.technicalExplanation}
                </p>
                <div className="mt-2 text-xs font-mono text-amber-200/90">
                  <strong>Ponto Fraco Arquitetural:</strong> {currentAnomaly.weakness}
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-red-500/60 bg-red-950/80 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                  <span className="font-display text-4xl text-red-300">
                    {currentAnomaly.runeSymbol}
                  </span>
                </div>
                <span className="mt-2 font-mono text-xs font-bold text-red-400">
                  Ataque: {currentAnomaly.power}
                </span>
              </div>
            </div>
          </div>

          {/* Mão de Cartas do Jogador */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <span>🎴</span> SUA MÃO DE GUARDIÕES (Clique em uma carta para jogar)
              </h4>
              <span className="font-mono text-[11px] text-steel">
                Recupere +2 de Éter ao agir
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 justify-items-center">
              {playerHand.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handlePlayCard(card)}
                  className={`cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
                    etherUnits < card.energyCost ? "opacity-40 grayscale pointer-events-none" : ""
                  }`}
                >
                  <Card3D card={card} compact onSelect={handlePlayCard} />
                </div>
              ))}
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

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
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
                {hasWon ? "Próxima Anomalia ⚔️" : "Tentar Novamente 🔄"}
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
