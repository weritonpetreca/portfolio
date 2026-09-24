import { useEffect, useRef, useState } from "react";

// Chave oficial de teste da Cloudflare que sempre passa (usada como fallback local)
const CLOUDFLARE_TEST_SITE_KEY = "1x00000000000000000000AA";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  className?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoaded?: () => void;
  }
}

export function TurnstileWidget({
  onVerify,
  onExpire,
  onError,
  className = "",
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const siteKey =
    import.meta.env.VITE_TURNSTILE_SITE_KEY || CLOUDFLARE_TEST_SITE_KEY;

  useEffect(() => {
    // Se estiver em ambiente de teste automatizado (Vitest/Jest), não carrega o script externo
    if (import.meta.env.MODE === "test") {
      onVerify("test-turnstile-token");
      return;
    }

    const scriptId = "cloudflare-turnstile-script";

    const initWidget = () => {
      if (!window.turnstile || !containerRef.current || widgetIdRef.current) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: "dark",
        callback: (token: string) => {
          onVerify(token);
        },
        "expired-callback": () => {
          onExpire?.();
        },
        "error-callback": () => {
          onError?.();
        },
      });
      setIsReady(true);
    };

    if (window.turnstile) {
      initWidget();
      return;
    }

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const checkInterval = setInterval(() => {
      if (window.turnstile) {
        clearInterval(checkInterval);
        initWidget();
      }
    }, 100);

    return () => {
      clearInterval(checkInterval);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // No-op
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onVerify, onExpire, onError]);

  // Se em teste, renderiza nada
  if (import.meta.env.MODE === "test") return null;

  return (
    <div className={`my-2 flex flex-col items-center sm:items-start ${className}`}>
      <div ref={containerRef} className="min-h-[65px]" />
      {!isReady && (
        <span className="font-mono text-[11px] text-steel/60">
          Iniciando verificação de segurança Cloudflare...
        </span>
      )}
    </div>
  );
}
