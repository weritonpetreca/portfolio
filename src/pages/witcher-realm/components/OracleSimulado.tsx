import { useState } from "react";
import { CLOUDWARDENS_QUESTIONS } from "../../../data/cloudwardens/questions";
import { CLOUDWARDENS_QUESTS } from "../../../data/cloudwardens/quests";
import type { ExamQuestion, QuestTrial } from "../../../data/cloudwardens/types";

export function OracleSimulado() {
  const [activeSubTab, setActiveSubTab] = useState<"quiz" | "quests">("quiz");

  // Estado do Simulado
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [activeQuest, setActiveQuest] = useState<QuestTrial | null>(null);

  const currentQ: ExamQuestion = CLOUDWARDENS_QUESTIONS[currentQuestionIndex];
  const totalQuestions = CLOUDWARDENS_QUESTIONS.length;
  const passingScorePercentage = 70; // Padrão de aprovação da AWS (700/1000)

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionId);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctOptionId) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  const finalPercentage = Math.round((score / totalQuestions) * 100);
  const isApproved = finalPercentage >= passingScorePercentage;

  return (
    <div className="space-y-6">
      
      {/* Seletor de Modo: Simulado vs Quests */}
      <div className="flex items-center justify-between border-b border-forge-700/60 pb-3">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
            <span>📜</span> O ORÁCULO DE CERTIFICAÇÃO · CLF-C02
          </span>
          <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-bone">
            Treinamento & Provas da Guilda
          </h3>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveSubTab("quiz")}
            className={`cursor-pointer rounded px-3 py-1.5 transition-colors ${
              activeSubTab === "quiz"
                ? "border border-sky-500/80 bg-sky-500/20 text-sky-200 font-bold"
                : "text-steel hover:text-bone hover:bg-forge-900"
            }`}
          >
            Simulado Completo
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("quests")}
            className={`cursor-pointer rounded px-3 py-1.5 transition-colors ${
              activeSubTab === "quests"
                ? "border border-amber-500/80 bg-amber-500/20 text-amber-200 font-bold"
                : "text-steel hover:text-bone hover:bg-forge-900"
            }`}
          >
            Quests Arquiteturais ({CLOUDWARDENS_QUESTS.length})
          </button>
        </div>
      </div>

      {/* MODO 1: SIMULADO DE QUESTÕES REAIS DA AWS */}
      {activeSubTab === "quiz" && (
        <div className="rounded-xl border border-forge-700/80 bg-gradient-to-b from-forge-900/90 via-forge-950 to-black p-6 sm:p-8 shadow-2xl">
          {!isQuizCompleted ? (
            <div>
              {/* Notificação de Quest Ativa */}
              {activeQuest && (
                <div className="mb-4 flex items-center justify-between rounded-lg border border-amber-600/50 bg-amber-950/40 p-3 font-mono text-xs text-amber-300">
                  <div className="flex items-center gap-2">
                    <span>⚔️</span>
                    <span>
                      Quest Ativa: <strong>{activeQuest.title}</strong> — Forje: <strong className="text-amber-400">{activeQuest.rewardCardId}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveQuest(null)}
                    className="text-steel hover:text-bone text-[11px] underline cursor-pointer"
                  >
                    Voltar ao Simulado Padrão
                  </button>
                </div>
              )}

              {/* Barra de Progresso do Simulado */}
              <div className="flex items-center justify-between font-mono text-xs text-steel mb-4">
                <span>
                  Questão <strong className="text-bone">{currentQuestionIndex + 1}</strong> de {totalQuestions}
                </span>
                <span className="rounded border border-forge-700 bg-forge-900 px-2 py-0.5 text-sky-300">
                  {currentQ.examReference}
                </span>
              </div>

              {/* Enunciado da Questão */}
              <div className="rounded-lg border border-forge-800 bg-forge-950/80 p-5 mb-6">
                <p className="font-sans text-sm sm:text-base text-bone font-medium leading-relaxed">
                  {currentQ.questionText}
                </p>
              </div>

              {/* Alternativas */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  const isCorrect = opt.id === currentQ.correctOptionId;
                  
                  let optStyle = "border-forge-800 bg-forge-950/60 text-slate-300 hover:border-forge-700";
                  if (isSelected && !isAnswerSubmitted) {
                    optStyle = "border-amber-500/80 bg-amber-500/10 text-amber-200 font-semibold shadow-[0_0_10px_rgba(245,158,11,0.2)]";
                  }
                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optStyle = "border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]";
                    } else if (isSelected && !isCorrect) {
                      optStyle = "border-red-500 bg-red-950/60 text-red-200 line-through opacity-80";
                    }
                  }

                  return (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left cursor-pointer rounded-lg border p-4 transition-all duration-200 flex items-start gap-3.5 text-xs sm:text-sm ${optStyle}`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current font-mono font-bold text-xs uppercase">
                        {opt.id}
                      </span>
                      <span className="pt-0.5 leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Justificativa e Explicação Oficial (Ao responder) */}
              {isAnswerSubmitted && (
                <div className="rounded-lg border border-sky-500/50 bg-sky-950/40 p-4 font-sans text-xs sm:text-sm text-sky-200 leading-relaxed mb-6">
                  <strong className="block font-mono text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">
                    📖 Justificativa Oficial da AWS:
                  </strong>
                  {currentQ.explanation}
                </div>
              )}

              {/* Botões de Ação */}
              <div className="flex items-center justify-between border-t border-forge-700/60 pt-4">
                <span className="font-mono text-xs text-steel">
                  Pontos Atuais: <strong className="text-amber-400">{score}</strong> acertos
                </span>

                {!isAnswerSubmitted ? (
                  <button
                    type="button"
                    disabled={!selectedOption}
                    onClick={handleConfirmAnswer}
                    className="cursor-pointer rounded-md bg-amber-500 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Confirmar Resposta
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="cursor-pointer rounded-md bg-emerald-600 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-bone transition-colors hover:bg-emerald-500"
                  >
                    {currentQuestionIndex + 1 < totalQuestions ? "Próxima Questão ➔" : "Ver Resultado Final 🏆"}
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* TELA DE RESULTADO DO SIMULADO */
            <div className="text-center py-6 space-y-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-500/60 bg-amber-950/40 text-4xl">
                {isApproved ? "🏆" : "📜"}
              </div>

              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-500">
                  {isApproved ? "APROVADO NO TESTE DO ORÁCULO" : "TREINAMENTO INCOMPLETO"}
                </span>
                <h3 className="mt-2 font-display text-3xl font-bold text-bone">
                  {isApproved ? "Você demonstrou domínio do Domínio AWS!" : "Continue treinando com o Grimório"}
                </h3>
                <p className="mt-2 font-mono text-sm text-slate-300">
                  Sua pontuação: <strong className="text-amber-400 text-lg">{finalPercentage}%</strong> ({score} de {totalQuestions} questões corretas).
                </p>
                <p className="mt-1 font-mono text-xs text-steel">
                  Critério oficial da certificação CLF-C02: 70% de aproveitamento mínimo.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="cursor-pointer rounded-md bg-amber-500 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors"
                >
                  Refazer Simulado 🔄
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODO 2: SIDE QUESTS ARQUITETURAIS */}
      {activeSubTab === "quests" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {CLOUDWARDENS_QUESTS.map((quest) => (
            <div
              key={quest.id}
              className="rounded-xl border border-forge-700/80 bg-forge-950/80 p-5 shadow-lg flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-500">
                  {quest.chapter}
                </span>
                <h4 className="mt-1 font-display text-lg font-bold text-bone">
                  {quest.title}
                </h4>
                <p className="mt-2 font-sans text-xs text-slate-300 leading-relaxed">
                  {quest.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-forge-700/60 flex items-center justify-between font-mono text-xs">
                <span className="text-steel">
                  Recompensa: <strong className="text-amber-400">{quest.rewardCardId}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveQuest(quest);
                    setActiveSubTab("quiz");
                  }}
                  className="rounded border border-amber-600/50 bg-forge-900 px-3 py-1 text-amber-300 hover:border-amber-400 transition-colors cursor-pointer"
                >
                  Iniciar Quest ⚔️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
