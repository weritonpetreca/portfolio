interface DividerProps {
  stage?: string;
}

/**
 * Divisor ornamental forjado (estética medieval / dark fantasy).
 * Evoca marcas rúnicas gravadas em aço e quebras de capítulo em grimórios,
 * delimitando as etapas da jornada do engenheiro.
 */
export function Divider({ stage }: DividerProps) {
  return (
    <div className="mx-auto flex max-w-4xl items-center gap-3 px-6 py-6" aria-hidden="true">
      {/* Linha metálica degradê para esquerda */}
      <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-forge-700 to-amber-700/50" />
      
      {/* Runa Geométrica Central com Brasa */}
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rotate-45 border border-amber-600/70 bg-forge-950" />
        
        {stage ? (
          <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-amber-500/90 px-2 py-0.5 rounded border border-forge-700/80 bg-forge-950/90 shadow-[0_0_10px_rgba(234,88,12,0.15)]">
            {stage}
          </span>
        ) : (
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute h-2.5 w-2.5 rotate-45 border border-ember bg-forge-950 shadow-[0_0_8px_rgba(210,69,31,0.6)]" />
            <span className="h-1 w-1 rounded-full bg-amber-400" />
          </span>
        )}

        <span className="h-1.5 w-1.5 rotate-45 border border-amber-600/70 bg-forge-950" />
      </div>

      {/* Linha metálica degradê para direita */}
      <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-forge-700 to-amber-700/50" />
    </div>
  );
}
