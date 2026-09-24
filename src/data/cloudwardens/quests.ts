import type { QuestTrial } from "./types";

export const CLOUDWARDENS_QUESTS: QuestTrial[] = [
  {
    id: "quest-storage",
    title: "O Enigma do Cofre Inviolável",
    chapter: "Capítulo I — A Preservação dos Dados",
    description:
      "A biblioteca da fortaleza foi ameaçada por terremotos de corrupção de dados. Prove seus conhecimentos sobre armazenamento em nuvem para forjar a carta do Amazon S3.",
    targetAnomalyId: "anomaly-data-loss",
    rewardCardId: "guardian-s3",
    questionIds: ["q-tech-1"],
  },
  {
    id: "quest-security",
    title: "O Julgamento do Menor Privilégio",
    chapter: "Capítulo II — A Muralha da Identidade",
    description:
      "Uma chave-mestra foi encontrada abandonada nas ruas da cidadela. Decifre os princípios sagrados do IAM e do Modelo de Responsabilidade Compartilhada para restaurar a ordem.",
    targetAnomalyId: "anomaly-root-breach",
    rewardCardId: "guardian-iam",
    questionIds: ["q-sec-1", "q-sec-2"],
  },
  {
    id: "quest-resilience",
    title: "A Fortaleza das Zonas Gêmeas",
    chapter: "Capítulo III — A Resiliência Contra o Colapso",
    description:
      "Um raio atinge um dos postos avançados da guilda. Demonstre como a infraestrutura global da AWS e a distribuição Multi-AZ impedem que a fortaleza entre em colapso.",
    targetAnomalyId: "anomaly-spof",
    rewardCardId: "guardian-ec2",
    questionIds: ["q-concepts-1", "q-billing-2"],
  },
  {
    id: "quest-serverless",
    title: "A Dança dos Autômatos",
    chapter: "Capítulo IV — A Forja da Elasticidade",
    description:
      "A maré de requisições aumenta de forma imprevisível. Convoque o poder da computação serverless sem provisionamento de servidores para equilibrar a balança.",
    targetAnomalyId: "anomaly-traffic-spike",
    rewardCardId: "guardian-lambda",
    questionIds: ["q-concepts-2", "q-tech-2"],
  },
  {
    id: "quest-finops",
    title: "A Caça ao Devorador de Faturas",
    chapter: "Capítulo V — O Oráculo do Tesouro",
    description:
      "O tesouro real relata um dreno oculto de recursos. Aprenda a rastrear gastos e configurar alertas proativos com AWS Budgets antes que o ouro acabe.",
    targetAnomalyId: "anomaly-bill-spike",
    rewardCardId: "anomaly-bill-spike",
    questionIds: ["q-billing-1"],
  },
];
