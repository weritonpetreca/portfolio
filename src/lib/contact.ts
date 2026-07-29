export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  /** Campo Honeypot opcional para captura de bots de spam. */
  website_hp?: string;
}

export interface SendResult {
  ok: boolean;
  error?: string;
}

const API_URL = import.meta.env.VITE_CONTACT_API_URL;

/**
 * Envia a mensagem de contato para o backend Serverless (API Gateway + Lambda + SES).
 * O ContactForm.tsx continua consumindo este contrato sem saber quem é o provider final.
 */
export async function sendContactMessage(
  payload: ContactPayload,
): Promise<SendResult> {
  if (!API_URL) {
    return {
      ok: false,
      error:
        "URL da API de contato não configurada no ambiente (VITE_CONTACT_API_URL).",
    };
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        error:
          data.error ||
          data.message ||
          "Erro ao enviar mensagem. Tente novamente mais tarde.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "Falha de rede ao tentar enviar a mensagem. Verifique sua conexão.",
    };
  }
}