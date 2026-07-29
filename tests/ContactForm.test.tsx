import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { ContactForm } from "../src/pages/professional/sections/ContactForm.tsx";
import * as contactLib from "../src/lib/contact";

// Mock da biblioteca de envio de mensagem
vi.mock("../src/lib/contact", () => ({
  sendContactMessage: vi.fn(),
}));

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("envia os dados limpos (trimmed) e exibe o estado de sucesso", async () => {
    vi.mocked(contactLib.sendContactMessage).mockResolvedValue({
      ok: true,
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: "  Geralt de Rívia  " },
    });
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: "geralt@kaermorhen.com" },
    });
    fireEvent.change(screen.getByLabelText(/mensagem/i), {
      target: { value: "Preciso de um contrato de caça." },
    });

    fireEvent.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    await waitFor(() => {
      // Garante que o trim() foi executado e a lib recebeu os dados corretos
      expect(contactLib.sendContactMessage).toHaveBeenCalledWith({
        name: "Geralt de Rívia",
        email: "geralt@kaermorhen.com",
        message: "Preciso de um contrato de caça.",
      });
    });

    expect(
      screen.getByText(/transmissão concluída!/i),
    ).toBeInTheDocument();
  });

  it("atualiza o contador de caracteres dinamicamente conforme o usuário digita", () => {
    render(<ContactForm />);

    const textarea = screen.getByLabelText(/mensagem/i);
    fireEvent.change(textarea, { target: { value: "Testando a mensagem" } });

    // 19 caracteres digitados de 3000
    expect(screen.getByText("19 / 3000")).toBeInTheDocument();
  });

  it("desabilita o botão e exibe 'Transmitindo Mensagem...' enquanto aguarda a API", async () => {
    // Retorna uma promessa pendente para prender o estado em 'submitting'
    vi.mocked(contactLib.sendContactMessage).mockReturnValue(
      new Promise(() => {}),
    );

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: "Yennefer" },
    });
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: "yen@vengerberg.com" },
    });
    fireEvent.change(screen.getByLabelText(/mensagem/i), {
      target: { value: "Aonde você está?" },
    });

    const button = screen.getByRole("button", { name: /enviar mensagem/i });
    fireEvent.click(button);

    // O botão deve assumir o estado desabilitado e o texto de submitting ajustado
    const submittingBtn = screen.getByRole("button", {
      name: /transmitindo mensagem\.\.\./i,
    });
    expect(submittingBtn).toBeDisabled();
  });

  it("exibe o bloco de erro com role='alert' em caso de falha no envio", async () => {
    vi.mocked(contactLib.sendContactMessage).mockResolvedValue({
      ok: false,
      error: "Erro de conexão com o API Gateway",
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: "Ciri" },
    });
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: "ciri@cintra.com" },
    });
    fireEvent.change(screen.getByLabelText(/mensagem/i), {
      target: { value: "Mensagem de teste" },
    });

    fireEvent.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    await waitFor(() => {
      const alertBox = screen.getByRole("alert");
      expect(alertBox).toHaveTextContent("Erro de conexão com o API Gateway");
    });
  });

  it("permite resetar o formulário ao clicar em 'Enviar Nova Mensagem' após o sucesso", async () => {
    vi.mocked(contactLib.sendContactMessage).mockResolvedValue({
      ok: true,
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: "Vesemir" },
    });
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: "vesemir@kaermorhen.com" },
    });
    fireEvent.change(screen.getByLabelText(/mensagem/i), {
      target: { value: "Treino às 06:00." },
    });

    fireEvent.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/transmissão concluída!/i),
      ).toBeInTheDocument();
    });

    // Clica para voltar ao form (texto ajustado do botão)
    fireEvent.click(
      screen.getByRole("button", { name: /enviar nova mensagem/i }),
    );

    // O formulário original deve voltar a ser visível
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
  });
});