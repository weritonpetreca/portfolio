import { useEffect, useState } from "react";

const CIRCLE_RADIUS = 19;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setIsVisible(scrollTop > 320);

      if (docHeight > 0) {
        const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setProgress(pct);
      } else {
        setProgress(0);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const scrollToTop = () => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const strokeDashoffset =
    CIRCLE_CIRCUMFERENCE - (progress / 100) * CIRCLE_CIRCUMFERENCE;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Voltar ao topo da página"
      title="Voltar ao topo"
      className={`group fixed bottom-6 right-6 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-forge-700/80 bg-forge-900/95 text-slate-200 shadow-[0_8px_25px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/80 hover:bg-forge-800 hover:text-amber-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] active:translate-y-0 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* Anel SVG de Progresso de Leitura (Forja / Âmbar) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 44 44"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="forge-scroll-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <circle
          cx="22"
          cy="22"
          r={CIRCLE_RADIUS}
          fill="none"
          stroke="rgba(51, 65, 85, 0.35)"
          strokeWidth="2"
        />
        <circle
          cx="22"
          cy="22"
          r={CIRCLE_RADIUS}
          fill="none"
          stroke="url(#forge-scroll-grad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray={CIRCLE_CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>

      {/* Ícone de Seta */}
      <svg
        className="relative z-10 h-5 w-5 fill-current transition-transform duration-200 group-hover:-translate-y-0.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 4l-7 7h4.5v9h5v-9H19z" />
      </svg>
    </button>
  );
}
