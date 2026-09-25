import { useState } from "react";
import { CLOUDWARDENS_CARDS } from "../../../data/cloudwardens/cards";
import { STARTER_CARD_IDS } from "../../../data/cloudwardens/playerState";
import type { PlayerGameState } from "../../../data/cloudwardens/types";
import { Card3D } from "./Card3D";

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
}: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);

  if (!isOpen) return null;

  const starterCards = CLOUDWARDENS_CARDS.filter((c) =>
    STARTER_CARD_IDS.includes(c.id)
  );

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onCompleteTutorial();
      onClose();
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
              GUIA DO APRENDIZ · PASSO {currentStep} DE 4
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

        {/* PASSO 1: A CONVOCAÇÃO DOS GUARDIAIS */}
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

        {/* PASSO 2: O DECK INICIAL DE 4 GUARDIAIS */}
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
                O conselho da guilda confere a você 4 cartas essenciais de infraestrutura e segurança da AWS:
              </p>
            </div>

            {/* Grid das 4 cartas iniciais */}
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

        {/* PASSO 3: O PRIMEIRO TESTE DO ORÁCULO */}
        {currentStep === 3 && (
          <div className="space-y-4">
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

            <div className="rounded-lg border border-forge-800 bg-forge-950 p-4">
              <p className="font-sans text-xs sm:text-sm text-bone font-medium leading-relaxed">
                Qual princípio fundamental de arquitetura da AWS previne que a queda de um único data center físico interrompa uma aplicação de missão crítica?
              </p>
            </div>

            <div className="space-y-2">
              {[
                { id: "a", text: "Implantar em múltiplas Zonas de Disponibilidade (Multi-AZ) redundantes.", correct: true },
                { id: "b", text: "Aumentar a memória RAM de um único servidor físico.", correct: false },
                { id: "c", text: "Desligar o firewall da aplicação à noite.", correct: false },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => {
                    setSelectedOption(opt.id);
                    setIsQuestionAnswered(true);
                  }}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-colors cursor-pointer ${
                    selectedOption === opt.id
                      ? opt.correct
                        ? "border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold"
                        : "border-red-500 bg-red-950/60 text-red-200"
                      : "border-forge-800 bg-forge-900/60 text-slate-300 hover:border-forge-700"
                  }`}
                >
                  <span className="font-bold mr-2 uppercase">{opt.id})</span>
                  {opt.text}
                </button>
              ))}
            </div>

            {isQuestionAnswered && (
              <div className="p-3 rounded-lg border border-emerald-500/40 bg-emerald-950/30 text-xs text-emerald-300 leading-relaxed">
                ✓ <strong>Correto!</strong> As Zonas de Disponibilidade (AZs) são isoladas fisicamente dentro de uma Região. Você domina o conceito de Tolerância a Falhas!
              </div>
            )}

            <div className="text-center pt-2">
              <button
                type="button"
                disabled={!isQuestionAnswered}
                onClick={handleNextStep}
                className="cursor-pointer rounded-md bg-amber-500 px-8 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Reivindicar Recompensa de Conclusão 🏆
              </button>
            </div>
          </div>
        )}

        {/* PASSO 4: SUA RECOMPENSA DE BOAS-VINDAS */}
        {currentStep === 4 && (
          <div className="text-center py-4 space-y-5">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400 bg-amber-950/80 text-4xl shadow-[0_0_25px_rgba(245,158,11,0.5)] animate-bounce">
              🎁
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                TUTORIAL CONCLUÍDO COM SUCESSO!
              </span>
              <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-bone">
                Você é Oficialmente um Cloudwarden
              </h3>
              <p className="mt-2 font-sans text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                A guilda recompensou sua dedicação com:
              </p>
              
              <div className="mt-4 inline-flex flex-col sm:flex-row items-center gap-3 p-3 rounded-lg border border-amber-600/50 bg-amber-950/40 text-xs">
                <span className="text-amber-300 font-bold">⚡ +150 Unidades de Éter</span>
                <span className="hidden sm:inline text-steel">•</span>
                <span className="text-amber-300 font-bold">📦 1x Booster Pack de Boas-Vindas da Guilda</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleNextStep}
                className="cursor-pointer rounded-md bg-emerald-600 px-8 py-3 text-xs font-bold uppercase tracking-wider text-bone hover:bg-emerald-500 transition-colors shadow-lg"
              >
                Abrir Meus Pacotes & Iniciar Jornada ➔
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
