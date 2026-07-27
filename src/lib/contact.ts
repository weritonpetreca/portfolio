import emailjs from "@emailjs/browser";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface SendResult {
  ok: boolean;
  error?: string;
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * ContactForm.tsx só conhece esta função — nunca o EmailJS diretamente.
 * É o mesmo motivo pelo qual você programa contra uma interface em Java
 * em vez de uma implementação concreta (o mesmo raciocínio por trás de
 * preferir injeção via construtor): se um dia trocarmos EmailJS por um
 * Lambda + SES próprio (seção 9.6 do SRS), só este arquivo muda — o
 * formulário e sua validação continuam exatamente iguais.
 */
export async function sendContactMessage(payload: ContactPayload): Promise<SendResult> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return {
      ok: false,
      error:
        "Formulário ainda não configurado — faltam as chaves do EmailJS (ver .env.example).",
    };
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      { ...payload },
      { publicKey: PUBLIC_KEY },
    );
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Não foi possível enviar agora. Tente novamente ou use o e-mail direto abaixo.",
    };
  }
}
