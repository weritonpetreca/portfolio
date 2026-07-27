import { useState, type FormEvent } from "react";
import { sendContactMessage } from "../../../lib/contact.ts";

type Status = "idle" | "submitting" | "success" | "error";

const inputStyles =
  "w-full rounded-sm border border-forge-700 bg-forge-900 px-3 py-2 " +
  "text-bone placeholder:text-steel/40 focus:border-ember";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);
    const result = await sendContactMessage({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    });

    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error ?? "Algo deu errado.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-ember" role="status">
        Mensagem enviada — obrigado! Retorno em breve.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-steel">
          Nome
        </label>
        <input id="name" name="name" type="text" required className={inputStyles} />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-steel">
          E-mail
        </label>
        <input id="email" name="email" type="email" required className={inputStyles} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-steel">
          Mensagem
        </label>
        <textarea id="message" name="message" rows={4} required className={inputStyles} />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-sm bg-ember px-5 py-2.5 font-mono text-sm tracking-wide text-forge-950 uppercase transition-colors hover:bg-ember-soft disabled:opacity-50"
      >
        {status === "submitting" ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  );
}
