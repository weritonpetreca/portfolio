import { useState, type FormEvent } from "react";
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
  const [faction, setFaction] = useState<"amber" | "silicon" | "vortex">("amber");
  const [cloudFocus, setCloudFocus] = useState<"aws" | "azure" | "gcp" | "multicloud">("aws");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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

        const guardianTitle =
          cloudFocus === "aws"
            ? "Iniciado da AWS"
            : cloudFocus === "azure"
            ? "Sentinela de Azure"
            : cloudFocus === "gcp"
            ? "Navegador de GCP"
            : "Mestre Multi-Cloud";

        const newUser = registerAccount({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          faction,
          cloudFocus,
          guardianTitle,
        });

        setSuccessMsg(`Bem-vindo à guilda, ${newUser.name}! Registro forjado.`);
        onSuccess(newUser);
        onClose();
      } else {
        if (!email.trim()) throw new Error("Informe o e-mail de acesso.");
        const user = authenticateAccount(email.trim().toLowerCase());
        setSuccessMsg(`Autenticação confirmada! Bem-vindo de volta, ${user.name}.`);
        onSuccess(user);
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

          {mode === "register" && (
            <>
              {/* Foco de Nuvem */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-steel mb-1 font-bold">
                  Trilha & Foco Primário
                </label>
                <select
                  value={cloudFocus}
                  onChange={(e) => setCloudFocus(e.target.value as "aws" | "azure" | "gcp" | "multicloud")}
                  className="w-full rounded-lg border border-forge-700 bg-forge-950 px-3 py-2 text-bone focus:border-amber-400 focus:outline-none"
                >
                  <option value="aws">AWS Cloud Practitioner & Architect (Recomendado)</option>
                  <option value="azure">Microsoft Azure Fundamentals (AZ-900)</option>
                  <option value="gcp">Google Cloud Digital Leader</option>
                  <option value="multicloud">Estratégia Multi-Cloud Híbrida</option>
                </select>
              </div>

              {/* Escolha da Facção */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-steel mb-1 font-bold">
                  Escolha sua Facção na Ordem
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "amber", name: "Ordem de Âmbar", icon: "🛡️", desc: "Alta Resiliência" },
                    { id: "silicon", name: "Silício", icon: "⚡", desc: "Alta Performance" },
                    { id: "vortex", name: "Vórtice", icon: "🔮", desc: "Serverless" },
                  ].map((f) => (
                    <button
                      type="button"
                      key={f.id}
                      onClick={() => setFaction(f.id as "amber" | "silicon" | "vortex")}
                      className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                        faction === f.id
                          ? "border-amber-400 bg-amber-950/60 text-amber-300 font-bold"
                          : "border-forge-800 bg-forge-950/60 text-steel hover:border-forge-700"
                      }`}
                    >
                      <span className="text-lg block mb-0.5">{f.icon}</span>
                      <span className="text-[11px] block">{f.name}</span>
                      <span className="text-[9px] text-steel block">{f.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg hover:from-amber-500 hover:to-amber-400 transition-all"
            >
              {mode === "register" ? "Forjar Registro na Guilda ➔" : "Acessar Domínio de Âmbar ➔"}
            </button>
          </div>
        </form>

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
