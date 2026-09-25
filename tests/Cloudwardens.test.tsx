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

  it("renders Game Introduction by default and can navigate to Modo Carreira", () => {
    render(
      <MemoryRouter>
        <WitcherRealmPage />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/CLOUDWARDENS/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/O Domínio de Âmbar:/i)).toBeInTheDocument();
    expect(screen.getByText(/O que você encontrará no Cloudwardens/i)).toBeInTheDocument();

    // Navigate to Career Mode
    const nav = screen.getByRole("navigation");
    const careerBtn = within(nav).getByRole("button", { name: /Carreira/i });
    fireEvent.click(careerBtn);

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

    const boostersBtn = screen.getAllByRole("button", { name: /Boosters/i })[0];
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

  it("does not award duplicate Éter if tutorial is already completed", () => {
    localStorage.setItem(
      "cloudwardens_player_save_v1",
      JSON.stringify({ isTutorialCompleted: true, etherCurrency: 50 })
    );

    render(
      <MemoryRouter>
        <WitcherRealmPage />
      </MemoryRouter>
    );

    // Initial ether is 50
    expect(screen.getAllByText(/50 Éter/i).length).toBeGreaterThanOrEqual(1);

    // Open tutorial from header
    const tutorialBtn = screen.getByTitle(/Abrir Tutorial do Aprendiz/i);
    fireEvent.click(tutorialBtn);

    // Modal is open
    expect(screen.getByText(/PASSO 1 DE 5/i)).toBeInTheDocument();

    // Advance step 1 -> step 2
    fireEvent.click(screen.getByRole("button", { name: /Aceitar a Convocação/i }));

    // Advance step 2 -> step 3
    fireEvent.click(screen.getByRole("button", { name: /Receber Cartas e Prosseguir/i }));

    // Advance step 3: answer question then claim
    const modalButtons = screen.getAllByRole("button", { name: /Multi-AZ/i });
    fireEvent.click(modalButtons[modalButtons.length - 1]);
    fireEvent.click(screen.getByRole("button", { name: /Reivindicar Recompensa/i }));

    // Step 4 shows already completed review state
    expect(screen.getByText(/TUTORIAL JÁ CONCLUÍDO/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Concluir Revisão/i }));

    // Ether balance should remain 50, not 200
    expect(screen.getAllByText(/50 Éter/i).length).toBeGreaterThanOrEqual(1);
  });

  it("handles user registration through AuthModal and shows player identity in header", () => {
    render(
      <MemoryRouter>
        <WitcherRealmPage />
      </MemoryRouter>
    );

    // Click "Entrar" in header
    const enterBtn = screen.getByTitle(/Entrar ou Cadastrar Guardião/i);
    fireEvent.click(enterBtn);

    // AuthModal is shown
    expect(screen.getByText(/PORTAL DOS CLOUDWARDENS/i)).toBeInTheDocument();

    // Fill in registration form
    const nameInput = screen.getByPlaceholderText(/Ex: Weriton Dev/i);
    const emailInput = screen.getByPlaceholderText(/seu.email@exemplo.com/i);
    const passInput = screen.getByPlaceholderText(/••••••••/i);

    fireEvent.change(nameInput, { target: { value: "Weriton Arch" } });
    fireEvent.change(emailInput, { target: { value: "weriton@cloudwardens.io" } });
    fireEvent.change(passInput, { target: { value: "secure123" } });

    // Submit registration
    const submitBtn = screen.getByRole("button", { name: /Forjar Registro na Guilda/i });
    fireEvent.click(submitBtn);

    // Modal closes and header + intro display user identity
    expect(screen.getAllByText(/Weriton Arch/i).length).toBeGreaterThanOrEqual(2);
  });

  it("shows Stéphane Maarek style explanation and blocks reward when wrong option is selected in tutorial", () => {
    // Start with tutorial uncompleted
    localStorage.clear();

    render(
      <MemoryRouter>
        <WitcherRealmPage />
      </MemoryRouter>
    );

    // Open tutorial
    const tutorialBtn = screen.getByTitle(/Abrir Tutorial do Aprendiz/i);
    fireEvent.click(tutorialBtn);

    // Advance step 1 -> step 2 -> step 3
    fireEvent.click(screen.getByRole("button", { name: /Aceitar a Convocação/i }));
    fireEvent.click(screen.getByRole("button", { name: /Receber Cartas e Prosseguir/i }));

    expect(screen.getByText(/O Teste de Conhecimento do Oráculo/i)).toBeInTheDocument();

    // Select WRONG option B: "Aumentar a memória RAM de um único servidor físico."
    const wrongOptionBtn = screen.getByRole("button", { name: /Aumentar a memória RAM/i });
    fireEvent.click(wrongOptionBtn);

    // Verify Stéphane Maarek error feedback and detailed explanation
    expect(screen.getByText(/Resposta Incorreta — Momento de Aprendizado/i)).toBeInTheDocument();
    expect(screen.getByText(/Escalabilidade Vertical/i)).toBeInTheDocument();
    expect(screen.getByText(/Documentação Técnica AWS ↗/i)).toBeInTheDocument();

    // Verify reward button is LOCKED
    const lockedBtn = screen.getByRole("button", { name: /Selecione a Resposta Correta para Avançar/i });
    expect(lockedBtn).toBeDisabled();

    // Now select CORRECT option A: "Implantar em múltiplas Zonas de Disponibilidade (Multi-AZ) redundantes."
    const correctOptionBtn = screen.getByRole("button", { name: /Multi-AZ/i });
    fireEvent.click(correctOptionBtn);

    // Verify success feedback and unlocked reward button
    expect(screen.getByText(/Excelente! Resposta Correta/i)).toBeInTheDocument();
    const claimBtn = screen.getByRole("button", { name: /Reivindicar Recompensa de Conclusão/i });
    expect(claimBtn).not.toBeDisabled();
  });

  it("guides player through the architectural battle step in tutorial, triggering disruption on anti-pattern and victory on counter-service", () => {
    localStorage.clear();

    render(
      <MemoryRouter>
        <WitcherRealmPage />
      </MemoryRouter>
    );

    // Open tutorial
    const tutorialBtn = screen.getByTitle(/Abrir Tutorial do Aprendiz/i);
    fireEvent.click(tutorialBtn);

    // Advance step 1 -> step 2 -> step 3
    fireEvent.click(screen.getByRole("button", { name: /Aceitar a Convocação/i }));
    fireEvent.click(screen.getByRole("button", { name: /Receber Cartas e Prosseguir/i }));

    // Answer question correctly in step 3
    const correctOptionBtn = screen.getByRole("button", { name: /Multi-AZ/i });
    fireEvent.click(correctOptionBtn);
    fireEvent.click(screen.getByRole("button", { name: /Reivindicar Recompensa de Conclusão e Batalha Guiada/i }));

    // Now in Step 4: Guided Architecture Battle
    expect(screen.getByText(/O Incidente do Gargalo Fatal/i)).toBeInTheDocument();
    expect(screen.getAllByText(/SLA da Fortaleza/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Orçamento de Éter/i)).toBeInTheDocument();

    // Try playing S3 or IAM card (anti-pattern for physical data center loss)
    const iamBtn = screen.getByRole("button", { name: /O Selo das Chaves Reais/i });
    fireEvent.click(iamBtn);

    // Disruption warning is displayed!
    expect(screen.getByText(/Disrupção de Arquitetura/i)).toBeInTheDocument();
    expect(screen.getByText(/O AWS IAM cuida de autenticação e menor privilégio/i)).toBeInTheDocument();

    // Now play the proper architectural counter: Amazon EC2 Multi-AZ
    const ec2Btn = screen.getByRole("button", { name: /O Sentinela de Aço/i });
    fireEvent.click(ec2Btn);

    // Incident is mitigated!
    expect(screen.getByText(/Incidente Mitigado com Perfeição/i)).toBeInTheDocument();
    expect(screen.getByText(/MITIGAÇÃO CRÍTICA DE ARQUITETURA/i)).toBeInTheDocument();

    // Advance to Step 5: Reward and graduation
    fireEvent.click(screen.getByRole("button", { name: /Reivindicar Recompensa e Concluir Formação/i }));
    expect(screen.getByText(/Você é Oficialmente um Cloudwarden/i)).toBeInTheDocument();
    expect(screen.getByText(/\+150 Unidades de Éter/i)).toBeInTheDocument();
  });
});

