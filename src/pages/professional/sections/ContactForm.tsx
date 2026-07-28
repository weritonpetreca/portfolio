import { useState, type FormEvent, type ChangeEvent } from "react";
import { sendContactMessage } from "../../../lib/contact.ts";

type Status = "idle" | "submitting" | "success" | "error";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 3000;

const inputStyles =
  "w-full rounded-sm border border-forge-700 bg-forge-950 px-3.5 py-2.5 " +
  "font-mono text-sm text-bone placeholder:text-steel/40 transition-colors " +
  "focus:border-ember focus:outline-hidden";

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

    const form = event.currentTarget;
    const data = new FormData(form);
    
    const result = await sendContactMessage({
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: messageText.trim(),
    });

    if (result.ok) {
      setStatus("success");
      setMessageText("");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error ?? "Algo deu errado no envio.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-ember/60 bg-ember/10 p-5 text-center font-mono text-sm text-bone shadow-md">
        <p className="font-bold text-ember">✉️ Mensagem enviada com sucesso!</p>
        <p className="mt-1 text-xs text-steel">
          Obrigado pelo contato. Responderei o mais breve possível.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 rounded-sm border border-forge-700 bg-forge-950 px-4 py-1.5 text-xs text-steel transition-colors hover:border-ember hover:text-bone cursor-pointer"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-mono text-xs font-semibold text-steel uppercase">
            Nome
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
          <label htmlFor="email" className="mb-1.5 block font-mono text-xs font-semibold text-steel uppercase">
            E-mail
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
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="message" className="block font-mono text-xs font-semibold text-steel uppercase">
            Mensagem
          </label>
          
          {/* Indicador e Contador de Caracteres */}
          <span
            className={`font-mono text-[11px] transition-colors ${
              isAtLimit
                ? "font-bold text-red-400"
                : isNearLimit
                  ? "font-bold text-ember"
                  : "text-steel/60"
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
          placeholder="Descreva brevemente o projeto, oportunidade ou mensagem..."
          className={inputStyles}
        />
      </div>

      {status === "error" && (
        <div className="rounded-sm border border-red-500/50 bg-red-950/30 p-3 font-mono text-xs text-red-400" role="alert">
          {errorMessage}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex cursor-pointer items-center justify-center rounded-sm bg-ember px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-bone transition-colors hover:bg-ember-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "Enviando Mensagem..." : "Enviar Mensagem ⚔️"}
        </button>
      </div>
    </form>
  );
}