import { useState, useEffect } from "react";
import { CLOUDWARDENS_CARDS } from "../../../data/cloudwardens/cards";
import { STARTER_CARD_IDS } from "../../../data/cloudwardens/playerState";
import type { Card, ExamQuestion, PlayerGameState } from "../../../data/cloudwardens/types";
import { Card3D } from "./Card3D";
import { ExamExplanationView } from "./ExamExplanationView";

const TUTORIAL_QUESTION: ExamQuestion = {
  id: "q-tutorial-1",
  domain: "cloud-concepts",
  difficulty: "intro",
  questionText:
    "Qual princípio fundamental de arquitetura da AWS previne que a queda de um único data center físico interrompa uma aplicação de missão crítica?",
  options: [
    {
      id: "a",
      text: "Implantar em múltiplas Zonas de Disponibilidade (Multi-AZ) redundantes.",
      explanation:
        "Correta: Cada Zona de Disponibilidade (AZ) é composta por data centers físicos isolados e separados geograficamente. A implantação Multi-AZ garante que se um data center físico sofrer inundação, incêndio ou corte de energia, as outras AZs continuam operando normalmente sem interrupção.",
    },
    {
      id: "b",
      text: "Aumentar a memória RAM de um único servidor físico.",
      explanation:
        "Incorreta: Aumentar a memória RAM é Escalabilidade Vertical (Scale Up). Se aquele servidor físico ou o data center onde ele está localizado sofrer uma falha elétrica ou de rede, a aplicação inteira cairá imediatamente por não ter redundância.",
    },
    {
      id: "c",
      text: "Desligar o firewall da aplicação à noite.",
      explanation:
        "Incorreta: Desligar firewalls é uma violação grave do pilar de Segurança e em nada ajuda na resiliência ou na proteção contra falhas físicas de data center.",
    },
  ],
  correctOptionId: "a",
  explanation:
    "As Zonas de Disponibilidade (AZs) são clusters de data centers fisicamente isolados dentro de uma Região da AWS. Projetar para Alta Disponibilidade através de arquitetura Multi-AZ é o pilar fundamental de Confiabilidade da nuvem.",
  examReference: "CLF-C02: Domínio 1 — Conceitos de Nuvem & Tolerância a Falhas",
  docsUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html",
};

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteTutorial: () => void;
  playerState: PlayerGameState;
}

export function TutorialModal({
  isOpen,
  onClose,
  onCompleteTutorial,
  playerState,
}: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);

  // Estado da Batalha Guiada de Arquitetura (Passo 4)
  const [guidedAnomalyHp, setGuidedAnomalyHp] = useState(12);
  const [guidedBattleState, setGuidedBattleState] = useState<"ready" | "disruption" | "victory">("ready");
  const [guidedFeedbackMsg, setGuidedFeedbackMsg] = useState<string | null>(null);
  const [guidedLog, setGuidedLog] = useState<string>(
    "🚨 ALERTA DE INCIDENTE: O data center principal caiu! O SLA da fortaleza está sob ameaça iminente."
  );
  const [guidedImpact, setGuidedImpact] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setSelectedOption(null);
      setIsQuestionAnswered(false);
      setGuidedAnomalyHp(12);
      setGuidedBattleState("ready");
      setGuidedFeedbackMsg(null);
      setGuidedLog("🚨 ALERTA DE INCIDENTE: O data center principal caiu! O SLA da fortaleza está sob ameaça iminente.");
      setGuidedImpact(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const starterCards = CLOUDWARDENS_CARDS.filter((c) =>
    STARTER_CARD_IDS.includes(c.id)
  );

  const ec2Card = starterCards.find((c) => c.id === "guardian-ec2");
  const s3Card = starterCards.find((c) => c.id === "guardian-s3");
  const iamCard = starterCards.find((c) => c.id === "guardian-iam");

  const handleNextStep = () => {
    // Se o usuário já concluiu o tutorial anteriormente, pular direto da questão para a revisão (Passo 5)
    if (currentStep === 3 && playerState.isTutorialCompleted) {
      setCurrentStep(5);
      return;
    }
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onCompleteTutorial();
      onClose();
    }
  };

  const handleTryDeployGuidedCard = (card: Card) => {
    if (guidedBattleState === "victory") return;

    if (card.id === "guardian-ec2") {
      setGuidedImpact(true);
      setGuidedAnomalyHp(0);
      setGuidedBattleState("victory");
      setGuidedFeedbackMsg(null);
      setGuidedLog(
        "💥 MITIGAÇÃO CRÍTICA DE ARQUITETURA! O Sentinela de Aço espalhou instâncias pelas Zonas de Disponibilidade (Multi-AZ) redundantes. Tráfego rebalanceado e SPOF totalmente eliminado!"
      );
      setTimeout(() => setGuidedImpact(false), 800);
    } else if (card.id === "guardian-s3") {
      setGuidedBattleState("disruption");
      setGuidedFeedbackMsg(
        "⚠️ Risco de Disrupção Arquitetural! O Amazon S3 armazena dados estáticos em alta durabilidade, mas não provê capacidade de execução redundante para a aplicação web. O data center continuará inoperante!"
      );
    } else if (card.id === "guardian-iam") {
      setGuidedBattleState("disruption");
      setGuidedFeedbackMsg(
        "⚠️ Risco de Disrupção Arquitetural! O AWS IAM cuida de autenticação e menor privilégio, mas não tem servidores físicos para substituir o data center caído. Você precisa de capacidade computacional Multi-AZ!"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border-2 border-amber-500/70 bg-gradient-to-b from-forge-900 via-forge-950 to-black p-6 sm:p-8 text-bone shadow-[0_0_50px_rgba(245,158,11,0.25)] font-mono">
        
        {/* Barra Superior do Tutorial */}
        <div className="flex items-center justify-between border-b border-forge-700/80 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              GUIA DO APRENDIZ · PASSO {currentStep} DE 5
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-steel hover:text-bone text-xs underline cursor-pointer"
          >
            Pular Tutorial ✕
          </button>
        </div>

        {/* PASSO 1: A CONVOCAÇÃO DOS GUARDIÕES */}
        {currentStep === 1 && (
          <div className="text-center py-4 space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-500/60 bg-amber-950/60 text-3xl">
              ☁️
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
                BEM-VINDO AO DOMÍNIO DE ÂMBAR
              </span>
              <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-bone">
                A Ordem dos Cloudwardens
              </h3>
              <p className="mt-3 font-sans text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                Nas terras da computação distribuída, anomalias como quedas de data centers, vazamentos de chaves e picos descontrolados ameaçam reinos inteiros. 
                Sua missão como Guardião é dominar os serviços gerenciados da nuvem como feitiços táticos e provar sua maestria para conquistar certificações oficiais da AWS.
              </p>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleNextStep}
                className="cursor-pointer rounded-md bg-amber-500 px-8 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors shadow-lg"
              >
                Aceitar a Convocação ➔
              </button>
            </div>
          </div>
        )}

        {/* PASSO 2: O DECK INICIAL DE 4 GUARDIÕES */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
                SEU PRIMEIRO ARSENAL DE COMBATE
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-bone">
                O Deck Inicial do Aprendiz
              </h3>
              <p className="mt-1 font-sans text-xs text-slate-300">
                O conselho da guilda confere a você cartas essenciais de infraestrutura e segurança da AWS:
              </p>
            </div>

            {/* Grid das cartas iniciais */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
              {starterCards.map((card) => (
                <div key={card.id} className="flex justify-center">
                  <Card3D card={card} compact />
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleNextStep}
                className="cursor-pointer rounded-md bg-amber-500 px-8 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors shadow-lg"
              >
                Receber Cartas e Prosseguir ➔
              </button>
            </div>
          </div>
        )}

        {/* PASSO 3: O TESTE DE CONHECIMENTO DO ORÁCULO */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-sky-400 font-bold">
                PROVAÇÃO TÉCNICA · CLF-C02
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-bone">
                O Teste de Conhecimento do Oráculo
              </h3>
              <p className="mt-1 font-sans text-xs text-slate-300">
                Para forjar novas cartas, você responderá a cenários reais de exame da AWS. Experimente:
              </p>
            </div>

            {/* Caixa do Enunciado */}
            <div className="rounded-lg border border-forge-700 bg-forge-950/80 p-4 font-sans text-sm text-bone leading-relaxed shadow-inner">
              {TUTORIAL_QUESTION.questionText}
            </div>

            {/* Opções de Resposta */}
            <div className="space-y-2.5 font-mono">
              {TUTORIAL_QUESTION.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const isCorrect = opt.id === TUTORIAL_QUESTION.correctOptionId;

                let optStyle = "border-forge-800 bg-forge-950/60 text-slate-300 hover:border-forge-700";
                if (isSelected) {
                  if (isCorrect) {
                    optStyle = "border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]";
                  } else {
                    optStyle = "border-red-500 bg-red-950/60 text-red-200";
                  }
                }

                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => {
                      setSelectedOption(opt.id);
                      setIsQuestionAnswered(true);
                    }}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-colors cursor-pointer flex items-start gap-2.5 ${optStyle}`}
                  >
                    <span className="font-bold uppercase shrink-0">{opt.id})</span>
                    <span className="pt-0.5 leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Explicação detalhada alternativa por alternativa no estilo Stéphane Maarek */}
            {isQuestionAnswered && (
              <ExamExplanationView
                question={TUTORIAL_QUESTION}
                selectedOptionId={selectedOption}
                isCorrect={selectedOption === TUTORIAL_QUESTION.correctOptionId}
                onTryAgain={() => {
                  setSelectedOption(null);
                  setIsQuestionAnswered(false);
                }}
              />
            )}

            <div className="text-center pt-2">
              <button
                type="button"
                disabled={!isQuestionAnswered || selectedOption !== TUTORIAL_QUESTION.correctOptionId}
                onClick={handleNextStep}
                className="cursor-pointer rounded-md bg-amber-500 px-8 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {selectedOption === TUTORIAL_QUESTION.correctOptionId
                  ? "Reivindicar Recompensa de Conclusão e Batalha Guiada ⚔️"
                  : "Selecione a Resposta Correta para Avançar 🔒"}
              </button>
            </div>
          </div>
        )}

        {/* PASSO 4: A PRIMEIRA BATALHA GUIADA DE ARQUITETURA */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-fadeIn font-mono">
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/60 bg-red-950/50 px-3 py-1 text-[11px] text-red-300 font-bold mb-1">
                <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                SIMULAÇÃO PRÁTICA · RESPOSTA A INCIDENTE REAL
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-bone">
                O Incidente do Gargalo Fatal (SPOF)
              </h3>
              <p className="mt-1 font-sans text-xs text-slate-300">
                Aprenda a aplicar arquitetura em combate: cada serviço deve corresponder exatamente à falha detectada!
              </p>
            </div>

            {/* Placar de Infraestrutura */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-lg border border-emerald-500/50 bg-emerald-950/40 p-3">
                <span className="text-emerald-400 font-bold block text-[10px] uppercase">
                  🏰 SLA da Fortaleza
                </span>
                <span className="text-sm font-bold text-emerald-200">100.0% Uptime</span>
              </div>
              <div className="rounded-lg border border-amber-500/50 bg-amber-950/40 p-3">
                <span className="text-amber-400 font-bold block text-[10px] uppercase">
                  ⚡ Orçamento de Éter
                </span>
                <span className="text-sm font-bold text-amber-200">5 / 10 Unidades</span>
              </div>
              <div className="col-span-2 sm:col-span-1 rounded-lg border border-sky-500/50 bg-sky-950/40 p-3">
                <span className="text-sky-400 font-bold block text-[10px] uppercase">
                  📖 Maestria do Incidente
                </span>
                <span className="text-sm font-bold text-sky-200">
                  {guidedBattleState === "victory" ? "Nível 1 (Mapeado)" : "Nível 0 (Oculto 🔒)"}
                </span>
              </div>
            </div>

            {/* Card da Anomalia em Campo */}
            <div
              className={`rounded-xl border-2 p-4 transition-all duration-300 ${
                guidedImpact
                  ? "border-red-500 bg-red-950/70 shadow-[0_0_30px_rgba(239,68,68,0.7)] scale-102"
                  : "border-red-600/60 bg-gradient-to-r from-red-950/40 via-forge-950 to-black"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚠️</span>
                    <span className="font-display text-base font-bold text-bone">
                      O Gargalo Fatal (SPOF)
                    </span>
                    <span className="text-[10px] text-red-400 border border-red-500/40 bg-red-950/60 px-1.5 py-0.5 rounded font-bold">
                      Queda de Data Center
                    </span>
                  </div>
                  <p className="font-sans text-xs text-slate-300 mt-1 max-w-lg">
                    Um data center físico na região sofreu pane total. Se você não implementar servidores redundantes em outra Zona de Disponibilidade, a aplicação inteira colapsará.
                  </p>
                  
                  {/* Status de Inteligência */}
                  <div className="mt-2 text-[11px] text-steel">
                    {guidedBattleState === "victory" ? (
                      <span className="text-emerald-300 font-bold">
                        ✓ Fraqueza Descoberta: Computação Multi-AZ redundante elimina este incidente com Mitigação Crítica!
                      </span>
                    ) : (
                      <span className="text-amber-400">
                        🔒 Fraqueza Oculta: Diagnostique a arquitetura correta para neutralizar o incidente.
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full sm:w-40 text-center sm:text-right font-mono">
                  <span className="text-[11px] text-steel block">Integridade da Anomalia:</span>
                  <span className="text-sm font-bold text-red-400">{guidedAnomalyHp} / 12 HP</span>
                  <div className="h-2.5 w-full bg-forge-900 rounded-full mt-1 border border-red-900 overflow-hidden">
                    <div
                      className="h-full bg-red-600 transition-all duration-500"
                      style={{ width: `${(guidedAnomalyHp / 12) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Caixa de Instrução do Oráculo */}
            <div
              className={`rounded-lg border p-3.5 text-xs transition-all ${
                guidedBattleState === "victory"
                  ? "border-emerald-500/60 bg-emerald-950/30 text-emerald-200"
                  : guidedBattleState === "disruption"
                  ? "border-red-500/60 bg-red-950/40 text-red-200 animate-shake"
                  : "border-forge-700 bg-forge-900/60 text-amber-200"
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider">
                <span>{guidedBattleState === "victory" ? "🏆" : "🧙‍♂️"}</span>
                <span>
                  {guidedBattleState === "victory"
                    ? "Oráculo: Incidente Mitigado com Perfeição!"
                    : guidedBattleState === "disruption"
                    ? "Oráculo: Cuidado com a Disrupção de Arquitetura!"
                    : "Oráculo: Orientação de Combate Guiado"}
                </span>
              </div>
              <p className="font-sans leading-relaxed text-xs">
                {guidedBattleState === "victory"
                  ? "Excelente trabalho, Guardião! O Sentinela de Aço redistribuiu as cargas de trabalho pelas Zonas de Disponibilidade. 100% de SLA preservado!"
                  : guidedBattleState === "disruption"
                  ? guidedFeedbackMsg
                  : "Atenção: este incidente foi causado pela ausência de redundância em data centers físicos. Teste suas cartas abaixo. Se você usar um serviço inadequado, sofrerá disrupção de SLA!"}
              </p>
            </div>

            {/* Mão de Cartas Interativa com Efeito Guiado */}
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-steel font-bold mb-2">
                🎴 Clique na carta do seu grimório para mobilizá-la contra o incidente:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Carta 1: IAM */}
                {iamCard && (
                  <button
                    type="button"
                    title={`Mobilizar ${iamCard.name}`}
                    onClick={() => handleTryDeployGuidedCard(iamCard)}
                    className="p-3 rounded-lg border border-forge-800 bg-forge-950/70 hover:border-forge-700 text-left transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-bone mb-1">
                        <span>{iamCard.name}</span>
                        <span className="text-[10px] text-amber-400">⚡ 2</span>
                      </div>
                      <span className="text-[10px] text-steel block">{iamCard.awsService}</span>
                      <p className="text-[10px] text-slate-400 mt-1 font-sans">
                        Gerencia chaves e permissões de acesso.
                      </p>
                    </div>
                    <span className="mt-2 text-[9px] uppercase font-bold text-forge-600 block">
                      Testar Mobilização ➔
                    </span>
                  </button>
                )}

                {/* Carta 2: S3 */}
                {s3Card && (
                  <button
                    type="button"
                    title={`Mobilizar ${s3Card.name}`}
                    onClick={() => handleTryDeployGuidedCard(s3Card)}
                    className="p-3 rounded-lg border border-forge-800 bg-forge-950/70 hover:border-forge-700 text-left transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-bone mb-1">
                        <span>{s3Card.name}</span>
                        <span className="text-[10px] text-amber-400">⚡ 2</span>
                      </div>
                      <span className="text-[10px] text-steel block">{s3Card.awsService}</span>
                      <p className="text-[10px] text-slate-400 mt-1 font-sans">
                        Armazenamento durável de objetos e arquivos.
                      </p>
                    </div>
                    <span className="mt-2 text-[9px] uppercase font-bold text-forge-600 block">
                      Testar Mobilização ➔
                    </span>
                  </button>
                )}

                {/* Carta 3: EC2 (Correta) */}
                {ec2Card && (
                  <button
                    type="button"
                    title={`Mobilizar ${ec2Card.name}`}
                    onClick={() => handleTryDeployGuidedCard(ec2Card)}
                    className="p-3 rounded-lg border-2 border-amber-500/80 bg-amber-950/40 hover:bg-amber-900/50 text-left transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.25)] flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-amber-200 mb-1">
                        <span className="group-hover:text-amber-100">{ec2Card.name}</span>
                        <span className="text-[10px] text-amber-400">⚡ 3</span>
                      </div>
                      <span className="text-[10px] text-amber-400 font-bold block">{ec2Card.awsService} (Multi-AZ)</span>
                      <p className="text-[10px] text-slate-300 mt-1 font-sans">
                        Servidores de computação distribuídos em múltiplas zonas.
                      </p>
                    </div>
                    <span className="mt-2 text-[9px] uppercase font-bold text-amber-300 block">
                      ⭐ Mobilizar (Multi-AZ) ➔
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Log de Batalha */}
            <div className="rounded-lg border border-forge-800 bg-black/60 p-3 text-[11px] text-steel leading-relaxed">
              <strong className="text-amber-400 block mb-0.5 font-bold uppercase text-[10px]">
                📜 Registro do Terminal da Batalha:
              </strong>
              {guidedLog}
            </div>

            {/* Botão de Prosseguir */}
            <div className="text-center pt-2">
              <button
                type="button"
                disabled={guidedBattleState !== "victory"}
                onClick={handleNextStep}
                className="cursor-pointer rounded-md bg-amber-500 px-8 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {guidedBattleState === "victory"
                  ? "Reivindicar Recompensa e Concluir Formação 🏆"
                  : "Mobilize o Serviço Correto para Mitigar o Incidente 🔒"}
              </button>
            </div>
          </div>
        )}

        {/* PASSO 5: SUA RECOMPENSA DE BOAS-VINDAS & CONSAGRAÇÃO */}
        {currentStep === 5 && (
          <div className="text-center py-4 space-y-5 animate-fadeIn">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400 bg-amber-950/80 text-4xl shadow-[0_0_25px_rgba(245,158,11,0.5)] animate-bounce">
              🎁
            </div>

            {playerState.isTutorialCompleted ? (
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                  TUTORIAL JÁ CONCLUÍDO
                </span>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-bone">
                  Revisão do Aprendiz Finalizada
                </h3>
                <p className="mt-2 font-sans text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Você já resgatou o bônus inicial de +150 Éter e o Booster de Boas-Vindas da Guilda. Seu progresso foi salvo com sucesso.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 p-3 rounded-lg border border-emerald-600/50 bg-emerald-950/40 text-xs text-emerald-300">
                  <span>✓ Cartas Iniciais Desbloqueadas</span>
                  <span>•</span>
                  <span>Saldo de Éter Ativo</span>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  TUTORIAL CONCLUÍDO COM SUCESSO!
                </span>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-bone">
                  Você é Oficialmente um Cloudwarden
                </h3>
                <p className="mt-2 font-sans text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Você dominou o conceito de Alta Disponibilidade, aprendeu a evitar disrupções e protegeu a fortaleza contra sua primeira anomalia física!
                </p>
                
                <div className="mt-4 inline-flex flex-col sm:flex-row items-center gap-3 p-3 rounded-lg border border-amber-600/50 bg-amber-950/40 text-xs">
                  <span className="text-amber-300 font-bold">⚡ +150 Unidades de Éter</span>
                  <span className="hidden sm:inline text-steel">•</span>
                  <span className="text-amber-300 font-bold">📦 1x Booster Pack de Boas-Vindas da Guilda</span>
                </div>
              </div>
            )}

            <div className="pt-4">
              <button
                type="button"
                onClick={handleNextStep}
                className="cursor-pointer rounded-md bg-emerald-600 px-8 py-3 text-xs font-bold uppercase tracking-wider text-bone hover:bg-emerald-500 transition-colors shadow-lg"
              >
                {playerState.isTutorialCompleted ? "Concluir Revisão ➔" : "Abrir Meus Pacotes & Iniciar Jornada ➔"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
