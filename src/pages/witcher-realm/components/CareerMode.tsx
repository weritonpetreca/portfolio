import { useState } from "react";
import { CLOUDWARDENS_CARDS } from "../../../data/cloudwardens/cards";
import { CLOUDWARDENS_QUESTIONS } from "../../../data/cloudwardens/questions";
import type { CareerTrackNode, ExamQuestion, PlayerGameState } from "../../../data/cloudwardens/types";

interface CareerModeProps {
  playerState: PlayerGameState;
  onSelectBattleAnomaly: (anomalyId: string) => void;
  onOpenDeckBuilder: () => void;
}

export const AWS_CLF02_NODES: CareerTrackNode[] = [
  {
    id: "node-1-infra",
    order: 1,
    title: "O Alicerce da Infraestrutura & Alta Disponibilidade",
    category: "compute",
    awsService: "Infraestrutura Global & Amazon EC2",
    storyLore:
      "As fundações do reino não podem repousar sobre um único pilar. Aprenda a distribuir sentinelas através de Múltiplas Zonas de Disponibilidade para que nenhuma tempestade derrube a cidadela.",
    technicalConcept:
      "Regiões da AWS são compostas por Zonas de Disponibilidade (AZs) isoladas entre si com links de fibra de ultra-baixa latência. A redundância Multi-AZ e a elasticidade horizontal eliminam Pontos Únicos de Falha (SPOF).",
    examQuestionIds: ["q-infra-1", "q-infra-2"],
    rewardCardId: "guardian-ec2",
    targetAnomalyId: "anomaly-spof",
  },
  {
    id: "node-2-security",
    order: 2,
    title: "A Cidadela da Identidade & Menor Privilégio",
    category: "security",
    awsService: "AWS IAM & Modelo Compartilhado",
    storyLore:
      "A chave-mestra jamais deve deixar o cofre sagrado. Conceda selos temporários de acesso para cada sentinela estritamente pelo tempo necessário de sua patrulha.",
    technicalConcept:
      "AWS IAM gerencia autenticação e autorização com o princípio do Menor Privilégio. Nunca utilize a conta Root no dia a dia. Utilize IAM Roles para instâncias EC2 e funções Lambda obterem credenciais temporárias do STS.",
    examQuestionIds: ["q-iam-1", "q-iam-2"],
    rewardCardId: "guardian-iam",
    targetAnomalyId: "anomaly-root-breach",
  },
  {
    id: "node-3-storage",
    order: 3,
    title: "O Cofre Sagrado & Preservação Imutável",
    category: "storage",
    awsService: "Amazon S3 & S3 Glacier",
    storyLore:
      "Tratados e arquivos históricos devem sobreviver por séculos. Encante seus tomos com durabilidade de 11 noves e travas de imutabilidade que nem mesmo o rei pode corromper.",
    technicalConcept:
      "O Amazon S3 oferece 99.999999999% de durabilidade com replicação automática em pelo menos 3 AZs. Para conformidade regulatória, S3 Object Lock (WORM) impede exclusão acidental ou maliciosa.",
    examQuestionIds: ["q-storage-1", "q-storage-2"],
    rewardCardId: "guardian-s3",
    targetAnomalyId: "anomaly-data-loss",
  },
  {
    id: "node-4-serverless",
    order: 4,
    title: "A Forja dos Autômatos & Distribuição de Borda",
    category: "serverless",
    awsService: "AWS Lambda & Amazon CloudFront",
    storyLore:
      "Tropas que consom suprimentos sem guerrear arruínam o tesouro. Convoque autômatos arcanos que surgem em milissegundos apenas quando o sinal de batalha soa, e espelhos velozes nas fronteiras.",
    technicalConcept:
      "Computação Serverless (AWS Lambda) e CDN global (Amazon CloudFront) abstraem servidores e patching de SO, escalando de zero a milhões de requisições com pagamento estrito por uso real.",
    examQuestionIds: ["q-serverless-1", "q-serverless-2"],
    rewardCardId: "guardian-lambda",
    targetAnomalyId: "anomaly-traffic-spike",
  },
  {
    id: "node-5-finops",
    order: 5,
    title: "O Oráculo do Tesouro & Gestão Orçamentária",
    category: "finops",
    awsService: "AWS Budgets & Cost Explorer",
    storyLore:
      "Sem vigia das finanças, os cofres esvaziam antes da próxima colheita. Estabeleça sentinelas matemáticos que alertam a coroa antes que uma única moeda a mais seja gasta.",
    technicalConcept:
      "AWS Budgets envia alertas pró-ativos antes que a fatura estoure. AWS Cost Explorer analisa padrões históricos e projeções de consumo. AWS Cost Anomaly Detection usa ML para identificar vazamentos.",
    examQuestionIds: ["q-finops-1", "q-finops-2"],
    rewardCardId: "anomaly-bill-spike",
    targetAnomalyId: "anomaly-bill-spike",
  },
];

export function CareerMode({
  playerState,
  onSelectBattleAnomaly,
  onOpenDeckBuilder,
}: CareerModeProps) {
  const [selectedProvider, setSelectedProvider] = useState<"aws" | "azure" | "gcp" | "multicloud">("aws");
  const [selectedTrack, setSelectedTrack] = useState<string>("clf-c02");
  const [activeNode, setActiveNode] = useState<CareerTrackNode | null>(AWS_CLF02_NODES[0]);

  // Estado do Teste do Nó
  const [currentNodeQuestionIdx, setCurrentNodeQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [nodeScore, setNodeScore] = useState(0);
  const [isNodeCompleted, setIsNodeCompleted] = useState(false);

  const nodeQuestions: ExamQuestion[] = activeNode
    ? CLOUDWARDENS_QUESTIONS.filter((q) => activeNode.examQuestionIds.includes(q.id))
    : [];

  const currentQ = nodeQuestions[currentNodeQuestionIdx] || nodeQuestions[0];
  const rewardCard = CLOUDWARDENS_CARDS.find((c) => c.id === activeNode?.rewardCardId);

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optId);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctOptionId) {
      setNodeScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentNodeQuestionIdx + 1 < nodeQuestions.length) {
      setCurrentNodeQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsNodeCompleted(true);
    }
  };

  const handleResetNodeQuiz = () => {
    setCurrentNodeQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setNodeScore(0);
    setIsNodeCompleted(false);
  };

  const handleSelectNode = (node: CareerTrackNode) => {
    setActiveNode(node);
    setCurrentNodeQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setNodeScore(0);
    setIsNodeCompleted(false);
  };

  return (
    <div className="space-y-8 font-mono">
      
      {/* SELETOR DE PROVEDOR DE NUVEM */}
      <div className="rounded-xl border border-forge-700/80 bg-gradient-to-r from-forge-900/90 via-forge-950/90 to-black p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500 flex items-center gap-1.5">
              <span>🧭</span> MODO CARREIRA · TRILHAS DE PROGRESSÃO
            </span>
            <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-bone">
              Trilhas de Formação & Certificações
            </h3>
            <p className="mt-1 text-xs text-steel">
              Percorra a árvore de habilidades de cada provedor, forje seu baralho e prepare-se para exames reais.
            </p>
          </div>

          {/* Abas dos Provedores de Nuvem */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "aws", label: "☁️ AWS", active: true },
              { id: "azure", label: "🔷 Azure", active: false, badge: "Em Breve" },
              { id: "gcp", label: "🌐 GCP", active: false, badge: "Em Breve" },
              { id: "multicloud", label: "⚡ Multicloud", active: false, badge: "Em Breve" },
            ].map((prov) => (
              <button
                type="button"
                key={prov.id}
                disabled={!prov.active}
                onClick={() => setSelectedProvider(prov.id as any)}
                className={`cursor-pointer rounded-lg border px-3.5 py-2 text-xs transition-all flex items-center gap-1.5 ${
                  selectedProvider === prov.id
                    ? "border-amber-400 bg-amber-500/20 text-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                    : prov.active
                      ? "border-forge-800 bg-forge-950 text-steel hover:text-bone"
                      : "border-forge-800/40 bg-black/40 text-steel/40 cursor-not-allowed"
                }`}
              >
                <span>{prov.label}</span>
                {prov.badge && (
                  <span className="text-[9px] rounded bg-forge-900 px-1.5 py-0.2 text-steel/60">
                    {prov.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-seletor de Certificação / Deep Dive */}
        <div className="mt-4 pt-4 border-t border-forge-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-steel mr-1 font-bold">Certificação / Especialização:</span>
          {[
            { id: "clf-c02", label: "AWS Cloud Practitioner (CLF-C02) · Trilha Principal", active: true },
            { id: "deep-s3", label: "Deep Dive: Amazon S3 & Glacier", active: true },
            { id: "deep-ec2", label: "Deep Dive: Amazon EC2 & Compute", active: true },
            { id: "deep-serverless", label: "Deep Dive: Serverless & Event-Driven", active: true },
            { id: "deep-iam", label: "Deep Dive: Segurança & IAM", active: true },
          ].map((trk) => (
            <button
              type="button"
              key={trk.id}
              onClick={() => setSelectedTrack(trk.id)}
              className={`cursor-pointer rounded px-3 py-1 text-xs transition-colors ${
                selectedTrack === trk.id
                  ? "border border-sky-500/80 bg-sky-500/20 text-sky-200 font-bold"
                  : "border border-forge-800 bg-forge-950 text-steel hover:text-bone hover:border-forge-700"
              }`}
            >
              {trk.label}
            </button>
          ))}
        </div>
      </div>

      {/* ÁRVORE VISUAL DE NÓS DA CARREIRA (SKILL TREE) */}
      <div>
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="font-bold text-bone flex items-center gap-1.5">
            <span>🗺️</span> Rota de Progressão da Carreira:
          </span>
          <span className="text-steel text-[11px]">
            Selecione um nó para entrar no Laboratório de Engenharia
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {AWS_CLF02_NODES.map((node) => {
            const isSelected = activeNode?.id === node.id;
            const isUnlockedInInventory = playerState.unlockedCardIds.includes(node.rewardCardId);

            return (
              <button
                type="button"
                key={node.id}
                onClick={() => handleSelectNode(node)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between h-44 ${
                  isSelected
                    ? "border-amber-400 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-1 ring-amber-300"
                    : isUnlockedInInventory
                      ? "border-emerald-500/60 bg-emerald-950/20 hover:border-emerald-400"
                      : "border-forge-800 bg-forge-950 hover:border-forge-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">
                      Nó #{node.order}
                    </span>
                    <span className="text-xs">
                      {isUnlockedInInventory ? "✓ Dominado" : "🔒 Em Curso"}
                    </span>
                  </div>

                  <h5 className="font-display text-sm font-bold text-bone line-clamp-2">
                    {node.title}
                  </h5>
                  <span className="text-[10px] text-steel block mt-1">
                    {node.awsService}
                  </span>
                </div>

                <div className="pt-2 border-t border-forge-800/80 flex items-center justify-between text-[10px]">
                  <span className="text-amber-400 font-bold">
                    Forja: {node.rewardCardId.replace("guardian-", "")}
                  </span>
                  <span className="text-steel">
                    {node.examQuestionIds.length} questões
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PAINEL CENTRAL DO NÓ ATIVO: LABORATÓRIO DE ENGENHARIA & DESAFIO */}
      {activeNode && (
        <div className="rounded-2xl border-2 border-forge-700/80 bg-gradient-to-b from-forge-900/95 via-forge-950 to-black p-6 sm:p-8 shadow-2xl">
          
          {/* Cabeçalho do Nó */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-forge-800 pb-5 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                NÓ #{activeNode.order} · {activeNode.category.toUpperCase()}
              </span>
              <h3 className="font-display text-2xl font-bold text-bone mt-1">
                {activeNode.title}
              </h3>
              <p className="text-xs text-amber-400 font-bold mt-0.5">
                Serviço Oficial: {activeNode.awsService}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectBattleAnomaly(activeNode.targetAnomalyId)}
                className="cursor-pointer rounded-md bg-ember hover:bg-ember-soft px-4 py-2 text-xs font-bold uppercase tracking-wider text-bone transition-colors shadow-md"
              >
                Enfrentar Incidente na Arena ⚔️
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            
            {/* Coluna 1 & 2: Lore, Conceito Técnico e Teste do Exame */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Lore & Fundamento Teórico */}
              <div className="rounded-xl border border-forge-800 bg-forge-950 p-5 space-y-3">
                <div>
                  <h6 className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1">
                    📖 Crônica da Guilda:
                  </h6>
                  <p className="font-serif text-xs italic text-slate-300 leading-relaxed">
                    "{activeNode.storyLore}"
                  </p>
                </div>

                <div className="pt-3 border-t border-forge-800">
                  <h6 className="text-[10px] font-bold uppercase tracking-wider text-sky-400 mb-1">
                    ⚙️ Conceito Real de Arquitetura AWS:
                  </h6>
                  <p className="font-sans text-xs text-slate-200 leading-relaxed">
                    {activeNode.technicalConcept}
                  </p>
                </div>
              </div>

              {/* Provação Técnica: Simulado do Nó */}
              <div className="rounded-xl border border-forge-800 bg-black/60 p-5">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-bold text-sky-300 flex items-center gap-1.5">
                    <span>📜</span> Desafio do Oráculo (Questão {currentNodeQuestionIdx + 1} de {nodeQuestions.length}):
                  </span>
                  <span className="text-steel text-[10px]">
                    {currentQ?.examReference}
                  </span>
                </div>

                {!isNodeCompleted && currentQ ? (
                  <div className="space-y-4">
                    <p className="font-sans text-xs sm:text-sm text-bone font-medium leading-relaxed">
                      {currentQ.questionText}
                    </p>

                    <div className="space-y-2">
                      {currentQ.options.map((opt) => {
                        const isSelected = selectedOption === opt.id;
                        const isCorrect = opt.id === currentQ.correctOptionId;

                        let style = "border-forge-800 bg-forge-950 text-slate-300 hover:border-forge-700";
                        if (isSelected && !isAnswerSubmitted) {
                          style = "border-amber-400 bg-amber-500/20 text-amber-200 font-bold";
                        }
                        if (isAnswerSubmitted) {
                          if (isCorrect) style = "border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold";
                          else if (isSelected && !isCorrect) style = "border-red-500 bg-red-950/60 text-red-200 line-through";
                        }

                        return (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => handleSelectOption(opt.id)}
                            className={`w-full text-left p-3 rounded-lg border text-xs transition-colors cursor-pointer flex items-start gap-2.5 ${style}`}
                          >
                            <span className="font-bold uppercase shrink-0">{opt.id})</span>
                            <span className="pt-0.5">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {isAnswerSubmitted && (
                      <div className="p-3.5 rounded-lg border border-sky-500/40 bg-sky-950/30 text-xs text-sky-200 leading-relaxed">
                        <strong className="block text-sky-400 font-bold uppercase text-[10px] mb-1">
                          📖 Justificativa Oficial:
                        </strong>
                        {currentQ.explanation}
                      </div>
                    )}

                    <div className="pt-2 flex justify-end">
                      {!isAnswerSubmitted ? (
                        <button
                          type="button"
                          disabled={!selectedOption}
                          onClick={handleConfirmAnswer}
                          className="cursor-pointer rounded-md bg-amber-500 px-6 py-2 text-xs font-bold uppercase text-black hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Confirmar Resposta
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleNextQuestion}
                          className="cursor-pointer rounded-md bg-emerald-600 px-6 py-2 text-xs font-bold uppercase text-bone hover:bg-emerald-500"
                        >
                          {currentNodeQuestionIdx + 1 < nodeQuestions.length ? "Próxima Questão ➔" : "Concluir Avaliação do Nó 🏆"}
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Nó Concluído com Sucesso */
                  <div className="text-center py-6 space-y-4">
                    <span className="text-4xl">🏆</span>
                    <div>
                      <h4 className="font-display text-xl font-bold text-bone">
                        Nó Dominado com Sucesso!
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Você acertou {nodeScore} de {nodeQuestions.length} questões deste capítulo.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetNodeQuiz}
                      className="cursor-pointer rounded bg-amber-500 px-5 py-2 text-xs font-bold uppercase text-black hover:bg-amber-400"
                    >
                      Refazer Desafio do Nó 🔄
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Coluna 3: Carta de Recompensa & Forja */}
            <div className="flex flex-col items-center justify-between rounded-xl border border-forge-800 bg-forge-950 p-5 text-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 block mb-2">
                  RECOMPENSA DESTE NÓ
                </span>
                {rewardCard && (
                  <div className="flex justify-center my-3">
                    <div className="rounded-xl border-2 border-amber-500/70 p-4 bg-black/60">
                      <span className="text-3xl block mb-2">{rewardCard.runeSymbol}</span>
                      <h5 className="font-display text-base font-bold text-bone">
                        {rewardCard.name}
                      </h5>
                      <span className="text-xs text-amber-400 font-bold block mt-1">
                        {rewardCard.awsService}
                      </span>
                      <span className="text-[10px] text-steel mt-1 block">
                        Poder: {rewardCard.power} | Defesa: {rewardCard.defense}
                      </span>
                    </div>
                  </div>
                )}
                <p className="text-[11px] text-steel mt-2">
                  Complete este nó e enfrente o incidente na arena para integrar esta carta ao seu Deckbuilder.
                </p>
              </div>

              <div className="w-full pt-4 border-t border-forge-800 space-y-2">
                <button
                  type="button"
                  onClick={onOpenDeckBuilder}
                  className="w-full cursor-pointer rounded border border-forge-700 bg-forge-900 py-2 text-xs font-bold text-steel hover:text-bone hover:border-amber-500 transition-colors"
                >
                  Abrir Deckbuilder 🛠️
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
