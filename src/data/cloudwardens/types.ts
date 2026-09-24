export type CardType = "guardian" | "anomaly" | "sigil";

export type CloudDomain =
  | "cloud-concepts"  // Domínio 1: Conceitos de Nuvem
  | "security"        // Domínio 2: Segurança e Conformidade
  | "technology"      // Domínio 3: Tecnologia e Serviços Principais
  | "billing";        // Domínio 4: Faturamento, Custos e Suporte

export type CardRarity = "common" | "rare" | "epic" | "legendary";

export interface Card {
  id: string;
  name: string; // Nome autoral da fantasia medieval
  awsService: string; // Serviço técnico oficial da AWS (texto puro nominativo)
  serviceCategory: string; // ex: Armazenamento, Computação, Mensageria
  domain: CloudDomain;
  type: CardType;
  rarity: CardRarity;
  power: number; // Poder de ação / mitigação
  defense: number; // Resiliência / durabilidade
  energyCost: number; // Custo de Unidades de Éter (1 a 5)
  flavorText: string; // Narrativa imersiva no universo Cloudwardens
  technicalExplanation: string; // Conceito real de engenharia
  examTip: string; // Dica quente para a certificação AWS Cloud Practitioner (CLF-C02)
  weakness?: string; // Para anomalias: qual arquitetura a neutraliza
  counters?: string[]; // IDs de anomalias que esta carta derrota com dano crítico
  runeSymbol: string; // Glifo rúnico
}

export interface ExamQuestion {
  id: string;
  domain: CloudDomain;
  relatedCardId?: string; // Carta concedida como recompensa ao acertar
  difficulty: "intro" | "standard" | "advanced";
  questionText: string; // Cenário real no formato da prova da AWS
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string; // Justificativa detalhada de cada alternativa
  examReference: string; // Referência ao domínio da prova CLF-C02
}

export interface QuestTrial {
  id: string;
  title: string;
  chapter: string;
  description: string;
  targetAnomalyId: string;
  rewardCardId: string;
  questionIds: string[];
}
