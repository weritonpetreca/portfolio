import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { WitcherRealmPage } from "../src/pages/witcher-realm/WitcherRealmPage";

describe("Cloudwardens (WitcherRealmPage)", () => {
  beforeEach(() => {
    localStorage.clear();
    // Marca tutorial como concluído para os testes focarem nos componentes
    localStorage.setItem(
      "cloudwardens_player_save_v1",
      JSON.stringify({ isTutorialCompleted: true })
    );
  });

  it("renders Modo Carreira and Skill Tree by default", () => {
    render(
      <MemoryRouter>
        <WitcherRealmPage />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/CLOUDWARDENS/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Trilhas de Formação & Certificações/i)).toBeInTheDocument();
    expect(screen.getByText(/Rota de Progressão da Carreira/i)).toBeInTheDocument();
  });

  it("switches to Deckbuilder tab and displays slots", () => {
    render(
      <MemoryRouter>
        <WitcherRealmPage />
      </MemoryRouter>
    );

    const nav = screen.getByRole("navigation");
    const deckbuilderBtn = within(nav).getByRole("button", { name: /Decks/i });
    fireEvent.click(deckbuilderBtn);

    expect(screen.getByText(/Construção & Gestão de Decks/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Slot 1/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Slot 2/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Slot 3/i })).toBeInTheDocument();
  });

  it("switches to Boosters tab and displays daily streak", () => {
    render(
      <MemoryRouter>
        <WitcherRealmPage />
      </MemoryRouter>
    );

    const nav = screen.getByRole("navigation");
    const boostersBtn = within(nav).getByRole("button", { name: /Boosters/i });
    fireEvent.click(boostersBtn);

    expect(screen.getByText(/DISCIPLINA DOS CLOUDWARDENS · STREAK DIÁRIO/i)).toBeInTheDocument();
    expect(screen.getByText(/Seus Pacotes Disponíveis para Abertura/i)).toBeInTheDocument();
  });

  it("switches to Arena tab and plays a card", () => {
    render(
      <MemoryRouter>
        <WitcherRealmPage />
      </MemoryRouter>
    );

    const nav = screen.getByRole("navigation");
    const arenaBtn = within(nav).getByRole("button", { name: /Arena/i });
    fireEvent.click(arenaBtn);

    expect(screen.getByText(/Saúde da Fortaleza/i)).toBeInTheDocument();
    expect(screen.getByText(/Capacidade de Éter/i)).toBeInTheDocument();

    // Mobilize first card in hand by clicking on it
    const s3Card = screen.getAllByText(/O Cofre Inviolável/i)[0];
    fireEvent.click(s3Card);

    // Check that damage was logged
    expect(screen.getByText(/Log da Batalha/i)).toBeInTheDocument();
  });

  it("switches to Simulado tab and answers question", () => {
    render(
      <MemoryRouter>
        <WitcherRealmPage />
      </MemoryRouter>
    );

    const nav = screen.getByRole("navigation");
    const simuladoBtn = within(nav).getByRole("button", { name: /Simulado/i });
    fireEvent.click(simuladoBtn);

    expect(screen.getByText(/O ORÁCULO DE CERTIFICAÇÃO/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirmar Resposta/i)).toBeInTheDocument();

    // Select an option and confirm
    const optionButtons = screen.getAllByRole("button", { name: /^[A-D]\s/i });
    expect(optionButtons.length).toBe(4);
    fireEvent.click(optionButtons[0]);

    const confirmBtn = screen.getByRole("button", { name: /Confirmar Resposta/i });
    fireEvent.click(confirmBtn);

    expect(screen.getByText(/Justificativa Oficial da AWS/i)).toBeInTheDocument();
  });
});
