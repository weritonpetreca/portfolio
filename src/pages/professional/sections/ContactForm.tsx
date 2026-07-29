import { useState, type FormEvent, type ChangeEvent } from "react";
import { sendContactMessage } from "../../../lib/contact.ts";

type Status = "idle" | "submitting" | "success" | "error";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 3000;

const inputStyles =
  "w-full rounded-md border border-forge-700/80 bg-forge-950/90 px-4 py-3 " +
  "font-sans text-sm sm:text-base text-bone placeholder:text-steel/50 transition-all duration-200 " +
  "hover:border-forge-600 " +
  "focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageText, setMessageText] = useState("");

  const currentLength = messageText.length;
  const isNearLimit = currentLength >= MAX_MESSAGE_LENGTH - 200;
  const isAtLimit = currentLength >= MAX_MESSAGE_LENGTH;

  function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setMessageText(event.target.value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    
    const result = await sendContactMessage({
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: messageText.trim(),
      // Honeypot: Se um bot preencher este campo no DOM, ele é capturado aqui
      website_hp: String(data.get("website_hp") ?? "").trim(),
    });

    if (result.ok) {
      setStatus("success");
      setMessageText("");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error ?? "Algo deu errado no envio. Tente novamente em alguns instantes.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-ember/80 bg-ember/10 p-6 sm:p-8 text-center backdrop-blur-sm shadow-[0_0_30px_rgba(234,88,12,0.15)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/20 text-2xl">
          ✉️
        </div>
        <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold text-bone">
          Transmissão Concluída!
        </h3>
        <p className="mt-2 font-sans text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
          Sua mensagem foi enviada diretamente para a minha caixa de entrada. Responderei o mais breve possível.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-md border border-forge-700 bg-forge-950/90 px-5 py-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-400"
        >
          <span>🔄</span> Enviar Nova Mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      
      {/* 🍯 ARMADILHA HONEYPOT (Totalmente invisível para humanos e leitores de tela) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">Não preencha este campo se for humano</label>
        <input
          id="website_hp"
          name="website_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 font-mono text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <span>👤</span> Nome / Empresa
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={MAX_NAME_LENGTH}
            placeholder="Seu nome ou empresa"
            className={inputStyles}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 font-mono text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <span>✉️</span> E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={MAX_EMAIL_LENGTH}
            placeholder="seu.email@dominio.com"
            className={inputStyles}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="message" className="font-mono text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <span>💬</span> Mensagem
          </label>
          
          <span
            className={`font-mono text-xs transition-colors ${
              isAtLimit
                ? "font-bold text-red-400"
                : isNearLimit
                  ? "font-bold text-amber-400"
                  : "text-steel/70"
            }`}
          >
            {currentLength} / {MAX_MESSAGE_LENGTH}
          </span>
        </div>

        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={MAX_MESSAGE_LENGTH}
          value={messageText}
          onChange={handleMessageChange}
          placeholder="Descreva a oportunidade, proposta de projeto ou dúvida técnica..."
          className={`${inputStyles} resize-y min-h-[140px]`}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="rounded-md border border-red-500/60 bg-red-950/40 p-4 font-mono text-xs sm:text-sm text-red-300 flex items-center gap-3"
        >
          <span className="text-lg">⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group relative inline-flex w-full sm:w-auto cursor-pointer items-center justify-center gap-3 rounded-md bg-ember px-8 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-bone transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember-soft hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {status === "submitting" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-bone border-t-transparent" />
              <span>Transmitindo Mensagem...</span>
            </>
          ) : (
            <>
              <span>Enviar Mensagem</span>
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">⚔️</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}