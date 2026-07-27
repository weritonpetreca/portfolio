export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-forge-700 bg-forge-950/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="font-mono text-sm tracking-widest text-steel">W. PETRECA</span>
        <span className="flex items-center gap-2 font-mono text-xs text-steel">
          <span className="h-2 w-2 rounded-full bg-ember" aria-hidden="true" />
          DISPONÍVEL PARA OPORTUNIDADES
        </span>
      </div>
    </header>
  );
}
