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

  const isGuardian = card.type === "guardian";

  const rarityBadgeClass = {
    common: "border-slate-600/50 bg-slate-900/80 text-slate-300",
    rare: "border-sky-500/60 bg-sky-950/80 text-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.2)]",
    epic: "border-purple-500/60 bg-purple-950/80 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]",
    legendary: "border-amber-400/80 bg-amber-950/90 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
  }[card.rarity];

  const cardBorderClass = isGuardian
    ? card.rarity === "legendary"
      ? "border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
      : "border-amber-600/50 hover:border-amber-400"
    : "border-red-600/60 hover:border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.15)]";

  return (
    <div
      className={`group perspective-1000 select-none ${
        compact ? "h-[320px] w-[210px]" : "h-[420px] w-[280px]"
      }`}
      onClick={() => onSelect?.(card)}
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
        className={`relative h-full w-full rounded-xl border-2 ${cardBorderClass} bg-gradient-to-b from-forge-900 via-forge-950 to-black p-4 text-bone shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between`}
      >
        {/* Runa no canto superior esquerdo */}
        <span className="absolute top-2 left-3 font-mono text-xs text-amber-500/40 select-none">
          {card.runeSymbol}
        </span>

        {/* Custo de Éter no canto superior direito */}
        <div className="absolute top-2 right-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-amber-500/60 bg-amber-950/90 font-mono text-xs font-bold text-amber-400 shadow-sm">
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

        {/* FRENTE OU VERSO DA CARTA */}
        {!isFlipped ? (
          <div className="flex h-full flex-col justify-between pt-4">
            
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

            {/* Ilustração / Emblema Rúnico Central */}
            <div className="my-auto flex flex-col items-center justify-center py-2">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-500/40 bg-black/70 shadow-[inset_0_0_15px_rgba(245,158,11,0.2)]">
                <span className="font-display text-4xl text-amber-400">
                  {card.runeSymbol}
                </span>
              </div>
            </div>

            {/* Texto de Lore / Narrativa */}
            <div className="rounded-md border border-forge-800 bg-forge-900/60 p-2.5 text-center">
              <p className="font-serif text-[11px] italic leading-relaxed text-slate-300 line-clamp-3">
                "{card.flavorText}"
              </p>
            </div>

            {/* Rodapé de Estatísticas: Poder / Defesa & Ação */}
            <div className="mt-3 flex items-center justify-between border-t border-forge-700/60 pt-2 font-mono text-xs">
              <div className="flex items-center gap-1 text-ember font-bold">
                <span>⚔️</span>
                <span>{card.power}</span>
                <span className="text-[10px] text-steel/60 font-normal">ATK</span>
              </div>

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

              <div className="flex items-center gap-1 text-sky-400 font-bold">
                <span>🛡️</span>
                <span>{card.defense}</span>
                <span className="text-[10px] text-steel/60 font-normal">DEF</span>
              </div>
            </div>

          </div>
        ) : (
          /* VERSO DA CARTA (LORE TÉCNICO & DICA DE EXAME CLF-C02) */
          <div className="flex h-full flex-col justify-between pt-4 text-left">
            <div>
              <div className="flex items-center justify-between border-b border-forge-700/60 pb-1.5 mb-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-500">
                  {card.awsService}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  className="font-mono text-[10px] text-steel hover:text-amber-400"
                >
                  Frente ↻
                </button>
              </div>

              <h5 className="font-mono text-xs font-bold text-bone mb-1">
                Conceito Arquitetural:
              </h5>
              <p className="font-sans text-[11px] text-slate-300 leading-snug mb-3">
                {card.technicalExplanation}
              </p>

              <div className="rounded border border-amber-600/40 bg-amber-950/40 p-2 text-amber-200">
                <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-0.5">
                  🎯 Dica Oficial CLF-C02:
                </span>
                <p className="font-sans text-[10.5px] leading-snug">
                  {card.examTip}
                </p>
              </div>
            </div>

            <div className="border-t border-forge-700/60 pt-2 text-center">
              <span className="font-mono text-[10px] text-steel/70">
                {isGuardian ? "Contra-ataca anomalias de nuvem" : `Fraqueza: ${card.weakness}`}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
