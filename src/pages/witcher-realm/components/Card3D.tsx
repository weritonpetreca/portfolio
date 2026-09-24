import { useState, useRef } from "react";
import type { Card } from "../../../data/cloudwardens/types";

interface Card3DProps {
  card: Card;
  isUnlocked?: boolean;
  onSelect?: (card: Card) => void;
  compact?: boolean;
}

export function Card3D({
  card,
  isUnlocked = true,
  onSelect,
  compact = false,
}: Card3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<number>(card.level || 1);
  const [showPrompt, setShowPrompt] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || compact) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ rotateX, rotateY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, isHovered: false });
  };

  const handleLevelUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentLevel((prev) => (prev >= 3 ? 1 : prev + 1));
  };

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (card.artPrompt) {
      navigator.clipboard.writeText(card.artPrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  const isGuardian = card.type === "guardian";
  const effectivePower = card.power + (currentLevel - 1) * 2;
  const effectiveDefense = card.defense + (currentLevel - 1) * 2;

  const rarityBadgeClass = {
    common: "border-slate-600/50 bg-slate-900/80 text-slate-300",
    rare: "border-sky-500/60 bg-sky-950/80 text-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.2)]",
    epic: "border-purple-500/60 bg-purple-950/80 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]",
    legendary: "border-amber-400/80 bg-amber-950/90 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
  }[card.rarity];

  const cardBorderClass = isGuardian
    ? currentLevel === 3
      ? "border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.45)] ring-1 ring-amber-300"
      : currentLevel === 2
        ? "border-amber-500/90 shadow-[0_0_18px_rgba(245,158,11,0.3)]"
        : card.rarity === "legendary"
          ? "border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
          : "border-amber-600/50 hover:border-amber-400"
    : "border-red-600/60 hover:border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.15)]";

  return (
    <div
      className={`group perspective-1000 select-none ${
        compact ? "h-[330px] w-[215px]" : "h-[440px] w-[290px]"
      }`}
      onClick={() => onSelect?.({ ...card, power: effectivePower, defense: effectiveDefense, level: currentLevel })}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: tilt.isHovered ? "none" : "transform 0.5s ease-out",
        }}
        className={`relative h-full w-full rounded-xl border-2 ${cardBorderClass} bg-gradient-to-b from-forge-900 via-forge-950 to-black p-4 text-bone shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden`}
      >
        {/* Camada de Efeito Holográfico / Foil no Nível 2 e 3 */}
        {currentLevel === 2 && (
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-amber-400/10 to-transparent opacity-60 animate-pulse" />
        )}
        {currentLevel === 3 && (
          <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(115deg,transparent_20%,rgba(255,215,0,0.15)_40%,rgba(0,255,255,0.15)_60%,transparent_80%)] opacity-80 animate-[shimmer_3s_infinite_linear]" />
        )}

        {/* Runa no canto superior esquerdo */}
        <span className="absolute top-2 left-3 font-mono text-xs text-amber-500/50 select-none z-20">
          {card.runeSymbol}
        </span>

        {/* Indicador de Nível Evolutivo */}
        <button
          type="button"
          title="Clique para testar evolução de nível da carta"
          onClick={handleLevelUp}
          className={`absolute top-2 left-8 z-20 rounded border px-1.5 py-0.2 font-mono text-[9px] font-bold uppercase transition-all ${
            currentLevel === 3
              ? "border-amber-400 bg-amber-400/20 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
              : currentLevel === 2
                ? "border-sky-400/80 bg-sky-950/80 text-sky-300"
                : "border-forge-700 bg-black/60 text-steel hover:text-bone"
          }`}
        >
          {currentLevel === 3 ? "★★★ Lvl 3" : currentLevel === 2 ? "★★ Lvl 2" : "★ Lvl 1"}
        </button>

        {/* Custo de Éter no canto superior direito */}
        <div className="absolute top-2 right-2.5 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-amber-500/60 bg-amber-950/90 font-mono text-xs font-bold text-amber-400 shadow-sm">
          {card.energyCost}
        </div>

        {/* Overlay de Carta Bloqueada se não estiver desbloqueada */}
        {!isUnlocked && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-xl bg-black/85 backdrop-blur-xs p-4 text-center">
            <span className="text-3xl">🔒</span>
            <span className="mt-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-500">
              Carta Bloqueada
            </span>
            <span className="mt-1 font-sans text-[11px] text-slate-300">
              Complete Provas de Mestria no Simulado para forjar esta carta.
            </span>
          </div>
        )}

        {/* POPUP DE PROMPT DE ARTE IA */}
        {showPrompt ? (
          <div className="relative z-25 flex h-full flex-col justify-between pt-6 text-left">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 block font-bold">
                🎨 Prompt para IA (Nano Banana / Midjourney)
              </span>
              <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-slate-200 bg-black/70 p-2.5 rounded border border-forge-700 select-all max-h-[220px] overflow-y-auto">
                {card.artPrompt || "Prompt em processo de criação pelos arcanistas da guilda."}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-forge-800">
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="rounded bg-amber-500 px-2.5 py-1 text-[10px] font-mono font-bold text-black hover:bg-amber-400 transition-colors"
              >
                {copiedPrompt ? "Copiado! ✓" : "Copiar Prompt"}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPrompt(false);
                }}
                className="text-[10px] font-mono text-steel hover:text-bone underline"
              >
                Fechar
              </button>
            </div>
          </div>
        ) : !isFlipped ? (
          /* FRENTE DA CARTA */
          <div className="relative z-20 flex h-full flex-col justify-between pt-5">
            
            {/* Cabeçalho da Carta */}
            <div className="text-center">
              <span className={`inline-block rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${rarityBadgeClass}`}>
                {card.rarity} · {isGuardian ? "Guardião" : "Anomalia"}
              </span>

              <h4 className="mt-1.5 font-display text-base font-bold text-bone group-hover:text-amber-300 transition-colors">
                {card.name}
              </h4>

              <div className="mt-0.5 flex items-center justify-center gap-1 font-mono text-[11px] font-bold text-amber-400">
                <span>⚡</span>
                <span>{card.awsService}</span>
              </div>
              <span className="text-[10px] font-mono text-steel/70">
                {card.serviceCategory}
              </span>
            </div>

            {/* Ilustração / Emblema Rúnico Central com Brilho do Nível */}
            <div className="my-auto flex flex-col items-center justify-center py-2">
              <div
                className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all ${
                  currentLevel === 3
                    ? "border-amber-400 bg-amber-950/80 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                    : currentLevel === 2
                      ? "border-amber-500/80 bg-black/80 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                      : "border-amber-500/40 bg-black/70"
                }`}
              >
                <span className={`font-display text-4xl ${currentLevel === 3 ? "text-amber-200" : "text-amber-400"}`}>
                  {card.runeSymbol}
                </span>
                {card.synergyTags && card.synergyTags.length > 0 && (
                  <span className="absolute -bottom-2 rounded-full border border-forge-700 bg-forge-900 px-1.5 py-0.2 font-mono text-[8px] uppercase tracking-wider text-amber-400">
                    {card.synergyTags[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Texto de Lore / Narrativa */}
            <div className="rounded-md border border-forge-800 bg-forge-900/60 p-2.5 text-center">
              <p className="font-serif text-[11px] italic leading-relaxed text-slate-300 line-clamp-3">
                "{card.flavorText}"
              </p>
            </div>

            {/* Rodapé de Estatísticas: Poder / Defesa & Ações */}
            <div className="mt-2.5 flex items-center justify-between border-t border-forge-700/60 pt-2 font-mono text-xs">
              <div className="flex items-center gap-1 text-ember font-bold">
                <span>⚔️</span>
                <span>{effectivePower}</span>
                <span className="text-[10px] text-steel/60 font-normal">ATK</span>
              </div>

              <div className="flex items-center gap-1.5">
                {card.artPrompt && (
                  <button
                    type="button"
                    title="Ver prompt de geração de arte com IA"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPrompt(true);
                    }}
                    className="rounded border border-purple-500/40 bg-purple-950/40 px-1.5 py-0.5 text-[9px] font-bold text-purple-300 hover:border-purple-400 transition-colors"
                  >
                    🎨 IA
                  </button>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(true);
                  }}
                  className="rounded border border-amber-600/40 bg-forge-950 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 hover:border-amber-400 transition-colors"
                >
                  Explicar ↺
                </button>
              </div>

              <div className="flex items-center gap-1 text-sky-400 font-bold">
                <span>🛡️</span>
                <span>{effectiveDefense}</span>
                <span className="text-[10px] text-steel/60 font-normal">DEF</span>
              </div>
            </div>

          </div>
        ) : (
          /* VERSO DA CARTA (LORE TÉCNICO & DICA DE EXAME CLF-C02) */
          <div className="relative z-20 flex h-full flex-col justify-between pt-5 text-left">
            <div>
              <div className="flex items-center justify-between border-b border-forge-700/80 pb-2 mb-2">
                <span className="font-mono text-xs font-bold text-amber-400 flex items-center gap-1">
                  <span>🏛️</span>
                  <span>{card.awsService}</span>
                </span>
                <span className="text-[10px] font-mono text-steel uppercase">
                  {card.domain}
                </span>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[260px] pr-1">
                <div>
                  <h5 className="font-mono text-[10px] font-bold uppercase tracking-wider text-steel mb-1">
                    Conceito de Arquitetura:
                  </h5>
                  <p className="font-sans text-xs text-slate-200 leading-relaxed">
                    {card.technicalExplanation}
                  </p>
                </div>

                <div className="rounded border border-amber-500/40 bg-amber-950/30 p-2.5">
                  <h5 className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1">
                    <span>💡</span> Dica Oficial CLF-C02:
                  </h5>
                  <p className="font-sans text-[11px] text-amber-200/90 leading-relaxed">
                    {card.examTip}
                  </p>
                </div>

                {card.counters && card.counters.length > 0 && (
                  <div className="text-[10px] font-mono text-emerald-400">
                    <span>⚔️ Contra-ataque Crítico contra: </span>
                    <strong className="text-bone">{card.counters.join(", ")}</strong>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-forge-700/60 flex items-center justify-between font-mono text-xs">
              <span className="text-[10px] text-steel">Modo de Estudo</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="rounded border border-amber-600/50 bg-forge-900 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-300 hover:border-amber-400 transition-colors"
              >
                Voltar ↺
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
