import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { WitcherRealmPage } from "../src/pages/witcher-realm/WitcherRealmPage";

describe("Cloudwardens (WitcherRealmPage)", () => {
  it("renders the hero title and Grimório by default", () => {
    render(
      <MemoryRouter>
        <WitcherRealmPage />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/CLOUDWARDENS/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/O Grimório do Guardião da Nuvem/i)).toBeInTheDocument();
    expect(screen.getByText(/O Cofre Inviolável/i)).toBeInTheDocument();
  });

  it("switches to Arena de Duelo tab and plays a card", () => {
    render(
      <MemoryRouter>
        <WitcherRealmPage />
      </MemoryRouter>
    );

    // Click on Arena tab
    const arenaBtn = screen.getByRole("button", { name: /Arena de Duelo/i });
    fireEvent.click(arenaBtn);

    expect(screen.getByText(/Saúde da Fortaleza/i)).toBeInTheDocument();
    expect(screen.getByText(/Capacidade de Éter/i)).toBeInTheDocument();

    // Mobilize first card in hand by clicking on it
    const s3Card = screen.getAllByText(/O Cofre Inviolável/i)[0];
    fireEvent.click(s3Card);

    // Check that damage was logged
    expect(screen.getByText(/Log da Batalha/i)).toBeInTheDocument();
  });

  it("switches to Simulado & Quests tab and answers question", () => {
    render(
      <MemoryRouter>
        <WitcherRealmPage />
      </MemoryRouter>
    );

    // Click on Simulado tab
    const simuladoBtn = screen.getByRole("button", { name: /Simulado & Quests/i });
    fireEvent.click(simuladoBtn);

    expect(screen.getByText(/O ORÁCULO DE CERTIFICAÇÃO/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirmar Resposta/i)).toBeInTheDocument();

    // Select an option and confirm
    const optionButtons = screen.getAllByRole("button", { name: /^[A-D]\s/i });
    expect(optionButtons.length).toBe(4);
    fireEvent.click(optionButtons[0]);

    const confirmBtn = screen.getByRole("button", { name: /Confirmar Resposta/i });
    fireEvent.click(confirmBtn);

    // Justification/explanation should appear
    expect(screen.getByText(/Justificativa Oficial da AWS/i)).toBeInTheDocument();
  });
});
