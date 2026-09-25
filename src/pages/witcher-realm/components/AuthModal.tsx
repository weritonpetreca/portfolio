import { useState, useEffect, type FormEvent } from "react";
import type { CloudwardenUser } from "../../../data/cloudwardens/types";
import { registerAccount, authenticateAccount } from "../../../data/cloudwardens/playerState";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: CloudwardenUser) => void;
  initialMode?: "login" | "register";
}

export function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  initialMode = "register",
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Limpa os campos e mensagens ao abrir o modal ou mudar de usuário
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setName("");
      setEmail("");
      setPassword("");
      setErrorMsg(null);
      setSuccessMsg(null);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (mode === "register") {
        if (!name.trim()) throw new Error("Informe o nome ou alcunha do seu Guardião.");
        if (!email.trim() || !email.includes("@")) throw new Error("Informe um e-mail válido.");
        if (password.length < 4) throw new Error("A senha deve ter no mínimo 4 caracteres.");

        const newUser = registerAccount({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          faction: "amber",
          cloudFocus: "aws",
          guardianTitle: "Iniciado da Nuvem",
        });

        setSuccessMsg(`Bem-vindo à guilda, ${newUser.name}! Registro forjado.`);
        onSuccess(newUser);
        setName("");
        setEmail("");
        setPassword("");
        onClose();
      } else {
        if (!email.trim()) throw new Error("Informe o e-mail de acesso.");
        const user = authenticateAccount(email.trim().toLowerCase());
        setSuccessMsg(`Autenticação confirmada! Bem-vindo de volta, ${user.name}.`);
        onSuccess(user);
        setName("");
        setEmail("");
        setPassword("");
        onClose();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Ocorreu uma anomalia na autenticação. Tente novamente.");
      }
    }
  };

  const handleFederatedLogin = (provider: "Google" | "GitHub") => {
    const federatedUser: CloudwardenUser = {
      id: `${provider.toLowerCase()}-${Date.now()}`,
      name: provider === "Google" ? "Guardião Google" : "Dev Cloudwarden",
      email: `guardiao.${provider.toLowerCase()}@cloudwardens.io`,
      faction: "amber",
      cloudFocus: "aws",
      guardianTitle: "Iniciado da Nuvem",
      createdAt: new Date().toISOString(),
    };
    onSuccess(federatedUser);
    setName("");
    setEmail("");
    setPassword("");
    setErrorMsg(null);
    setSuccessMsg(null);
    onClose();
  };

  const handleGuestLogin = () => {
    const guestUser: CloudwardenUser = {
      id: `guest-${Date.now()}`,
      name: "Guardião Convidado",
      email: "convidado@cloudwardens.local",
      faction: "amber",
      cloudFocus: "aws",
      guardianTitle: "Explorador da Nuvem",
      createdAt: new Date().toISOString(),
    };
    onSuccess(guestUser);
    setName("");
    setEmail("");
    setPassword("");
    setErrorMsg(null);
    setSuccessMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl border-2 border-amber-500/70 bg-gradient-to-b from-forge-900 via-forge-950 to-black p-6 sm:p-8 text-bone shadow-[0_0_50px_rgba(245,158,11,0.3)] font-mono">
        
        {/* Header do Modal */}
        <div className="flex items-center justify-between border-b border-forge-700/80 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                PORTAL DOS CLOUDWARDENS
              </h3>
              <p className="text-[11px] text-steel">Controle de Acesso & Registro de Progresso</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-steel hover:text-bone text-xs cursor-pointer p-1"
          >
            ✕ Fechar
          </button>
        </div>

        {/* Alternância de Modo (Cadastro vs Login) */}
        <div className="flex rounded-lg border border-forge-800 bg-black/60 p-1 mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setErrorMsg(null);
              setSuccessMsg(null);
              setName("");
              setEmail("");
              setPassword("");
            }}
            className={`flex-1 py-2 text-center rounded transition-all cursor-pointer ${
              mode === "register"
                ? "bg-amber-500 text-black shadow font-bold"
                : "text-steel hover:text-bone"
            }`}
          >
            📜 Novo Guardião (Cadastro)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErrorMsg(null);
              setSuccessMsg(null);
              setEmail("");
              setPassword("");
            }}
            className={`flex-1 py-2 text-center rounded transition-all cursor-pointer ${
              mode === "login"
                ? "bg-amber-500 text-black shadow font-bold"
                : "text-steel hover:text-bone"
            }`}
          >
            🔑 Acessar Conta (Login)
          </button>
        </div>

        {/* Mensagens de Feedback */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg border border-red-500/50 bg-red-950/60 text-xs text-red-200">
            ⚠ {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 rounded-lg border border-emerald-500/50 bg-emerald-950/60 text-xs text-emerald-200">
            ✓ {successMsg}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === "register" && (
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-amber-400 mb-1 font-bold">
                Nome ou Alcunha do Guardião *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Weriton Dev, Arquiteto da Nuvem..."
                className="w-full rounded-lg border border-forge-700 bg-forge-950 px-3.5 py-2.5 text-bone focus:border-amber-400 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-amber-400 mb-1 font-bold">
              E-mail de Acesso *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              className="w-full rounded-lg border border-forge-700 bg-forge-950 px-3.5 py-2.5 text-bone focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-amber-400 mb-1 font-bold">
              Senha de Segurança *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-forge-700 bg-forge-950 px-3.5 py-2.5 text-bone focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg hover:from-amber-500 hover:to-amber-400 transition-all"
            >
              {mode === "register" ? "Forjar Registro na Guilda ➔" : "Acessar Domínio de Âmbar ➔"}
            </button>
          </div>
        </form>

        {/* Divisor de Login Federado */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-forge-800" />
          <span className="text-[10px] uppercase tracking-wider text-steel font-bold">
            ou conecte-se com
          </span>
          <div className="h-px flex-1 bg-forge-800" />
        </div>

        {/* Botões de Login Federado (Google & GitHub) */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleFederatedLogin("Google")}
            className="flex items-center justify-center gap-2 rounded-lg border border-forge-700 bg-forge-950/80 hover:bg-forge-900 py-2.5 px-3 text-xs text-bone transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.8 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
              />
              <path
                fill="#FBBC05"
                d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.6l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.3-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z"
              />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleFederatedLogin("GitHub")}
            className="flex items-center justify-center gap-2 rounded-lg border border-forge-700 bg-forge-950/80 hover:bg-forge-900 py-2.5 px-3 text-xs text-bone transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </button>
        </div>

        {/* Rodapé do Modal com Convidado */}
        <div className="mt-5 pt-4 border-t border-forge-800 flex items-center justify-between text-[11px] text-steel">
          <span>Deseja apenas testar?</span>
          <button
            type="button"
            onClick={handleGuestLogin}
            className="text-amber-400 hover:text-amber-300 underline cursor-pointer"
          >
            Entrar como Convidado ➔
          </button>
        </div>

      </div>
    </div>
  );
}
