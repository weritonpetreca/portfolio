import { useEffect, useRef, useState } from "react";

// Chave oficial de teste da Cloudflare que sempre passa (usada como fallback local)
const CLOUDFLARE_TEST_SITE_KEY = "1x00000000000000000000AA";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  appearance?: "always" | "interaction-only" | "execute";
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
          appearance?: "always" | "interaction-only" | "execute";
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
  appearance = "always",
  className = "",
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Refs garantem estabilidade referencial: digitar no formulário pai não recria o iframe do Turnstile
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onVerifyRef.current = onVerify;
    onExpireRef.current = onExpire;
    onErrorRef.current = onError;
  });

  const siteKey =
    import.meta.env.VITE_TURNSTILE_SITE_KEY || CLOUDFLARE_TEST_SITE_KEY;

  useEffect(() => {
    // Se estiver em ambiente de teste automatizado (Vitest/Jest), não carrega o script externo
    if (import.meta.env.MODE === "test") {
      onVerifyRef.current("test-turnstile-token");
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
        appearance: appearance,
        callback: (token: string) => {
          onVerifyRef.current(token);
        },
        "expired-callback": () => {
          onExpireRef.current?.();
        },
        "error-callback": () => {
          onErrorRef.current?.();
        },
      });
      setIsReady(true);
    };

    if (window.turnstile) {
      initWidget();
      return () => {
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // No-op
          }
          widgetIdRef.current = null;
        }
      };
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
  }, [siteKey, appearance]);

  // Se em teste, renderiza nada
  if (import.meta.env.MODE === "test") return null;

  return (
    <div className={`my-1 flex flex-col items-center sm:items-start ${className}`}>
      <div
        ref={containerRef}
        className="overflow-hidden rounded-md transition-all duration-300"
      />
      {!isReady && (
        <span className="font-mono text-[11px] text-steel/60">
          Iniciando verificação de segurança Cloudflare...
        </span>
      )}
    </div>
  );
}
