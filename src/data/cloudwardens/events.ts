import type { WeeklyEventChallenge } from "./types";

export const CLOUDWARDENS_WEEKLY_EVENTS: WeeklyEventChallenge[] = [
  {
    id: "event-serverless-surge",
    title: "Operação: Dilúvio Serverless",
    subtitle: "Apenas Funções e Mensageria",
    description:
      "A cidadela está sob rajadas instantâneas de eventos. Servidores tradicionais estão vetados pelo conselho! Apenas cartas com as tags #serverless, #database ou #messaging são permitidas no seu deck.",
    allowedTags: ["serverless", "database", "messaging"],
    targetAnomalyId: "anomaly-traffic-spike",
    rewardEther: 250,
    rewardPack: {
      id: "pack-serverless-expert",
      name: "Booster de Arquitetura Reativa",
      description: "Contém 3 cartas com alta probabilidade de componentes serverless e NoSQL.",
      cardsCount: 3,
      guaranteedRarity: "epic",
    },
    activeUntil: "Domingo às 23:59",
  },
  {
    id: "event-zero-trust-fortress",
    title: "Protocolo: Muralha Zero Trust",
    subtitle: "Obrigatoriedade de Segurança Estrita",
    description:
      "Auditores da coroa detectaram credenciais vazadas. Seu deck deve conter obrigatoriamente pelo menos 2 cartas com a tag #security para passar pelo portão de acesso.",
    allowedTags: ["security", "compute", "storage", "networking"],
    targetAnomalyId: "anomaly-root-breach",
    rewardEther: 300,
    rewardPack: {
      id: "pack-security-vault",
      name: "Cofre de Chaves Criptográficas",
      description: "Booster selado garantindo uma carta de Segurança ou Identidade.",
      cardsCount: 3,
      guaranteedRarity: "rare",
    },
    activeUntil: "Terça às 23:59",
  },
  {
    id: "event-finops-budget-cap",
    title: "O Julgamento do Tesoureiro Real",
    subtitle: "Teto Orçamentário Estrito",
    description:
      "O tesouro real impôs um limite de custo severo. O custo somado de Éter de todas as cartas do seu deck não pode ultrapassar 18 unidades no total!",
    maxTotalEtherCost: 18,
    targetAnomalyId: "anomaly-bill-spike",
    rewardEther: 400,
    rewardPack: {
      id: "pack-finops-treasury",
      name: "Tesouro do Mestre Orçamentário",
      description: "Pacote especial com runas de redução de custo de Éter.",
      cardsCount: 4,
      guaranteedRarity: "legendary",
    },
    activeUntil: "Sexta às 23:59",
  },
];
