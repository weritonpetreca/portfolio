export interface Project {
  id: string;
  title: string;
  featured: boolean;
  /** Qual problema de negócio o projeto resolve. */
  mission: string;
  /** Como foi resolvido — a arquitetura em uma ou duas frases. */
  strategy: string;
  /** Pontos que mais importam para quem está avaliando o projeto. */
  highlights: string[];
  techTags: string[];
  repoUrl: string;
}

export const projects: Project[] = [
  {
    id: "credifacil-idp",
    title: "CrediFácil IDP",
    featured: true,
    mission:
      "Eliminar o gargalo operacional na triagem manual de pacotes de documentos (identidade, comprovante de renda, extrato bancário e certidão de imóvel) em solicitações de crédito imobiliário, reduzindo o tempo de análise de dias para segundos.",
    strategy:
      "Arquitetura 100% Serverless e Event-Driven na AWS com dashboard web em React (Vite). A orquestração via Step Functions coordena funções Lambda em Python 3.12, integrando o Amazon Bedrock Data Automation (com blueprints customizados) para extração inteligente de documentos e o LLM Amazon Nova para estruturação do schema e análise financeira.",
    highlights: [
      "🏆 1º lugar no Hackathon Hack2Hire 2026 (Escola da Nuvem + AWS), entre 12 equipes, premiado na avaliação técnica interna e na bancada final com empresas parceiras.",
      "Engine financeira de consolidação cruzada e Score de Crédito automatizado, identificando inconsistências entre renda declarada, extratos e comprovantes.",
      "Fluxo de Human-in-the-Loop (HITL) ativado automaticamente quando a confiança da extração cai abaixo do limiar, com interface para revisão e auditoria humana.",
      "Infraestrutura como Código (IaC) com AWS SAM, pipeline de CI/CD automatizado no GitHub Actions e suíte de testes unitários/integração com Pytest.",
    ],
    techTags: [
      "Python 3.12",
      "AWS Lambda",
      "Step Functions",
      "Amazon Bedrock",
      "Amazon Nova",
      "AWS SAM",
      "React",
      "GitHub Actions",
      "Pytest",
    ],
    repoUrl: "https://github.com/weritonpetreca/credi-facil-idp",
  },
  {
    id: "vivaldi-bank",
    title: "Vivaldi Bank",
    featured: false,
    mission:
      "Arquitetar o core bancário de uma fintech com foco em altíssima manutenibilidade, isolamento absoluto das regras de negócio (PF/PJ), transacionalidade e notificação assíncrona de eventos financeiros.",
    strategy:
      "API RESTful em Java 21 e Spring Boot aplicando Arquitetura Hexagonal (Ports & Adapters) estrita. O repositório utiliza ArchUnit para garantir a integridade das camadas, Flyway para evolução de schema PostgreSQL, AWS SQS para publicar eventos de auditoria e Terraform para provisionamento de infraestrutura em nuvem.",
    highlights: [
      "Arquitetura Hexagonal pura com validação automatizada em suíte de testes via ArchUnit, impedindo acoplamento indesejado do domínio com o Spring Framework.",
      "Mensageria com AWS SQS para desacoplamento de notificações de eventos de domínio (ex: EventoContaCriada, EventoMovimentacao, EventoLogin).",
      "Autenticação e autorização stateless com Spring Security, controle de acesso refinado e Tokens JWT.",
      "Qualidade e observabilidade com análise estática de código no Qodana, métricas via Prometheus e testes de integração com Testcontainers e PostgreSQL.",
    ],
    techTags: [
      "Java 21",
      "Spring Boot 3.5",
      "Arquitetura Hexagonal",
      "Spring Security",
      "JWT",
      "AWS SQS",
      "PostgreSQL",
      "Flyway",
      "Testcontainers",
      "Terraform",
      "Prometheus",
    ],
    repoUrl: "https://github.com/weritonpetreca/vivaldi-bank",
  },
  {
    id: "petreca-delivery",
    title: "PetrecaDelivery",
    featured: false,
    mission:
      "Orquestrar o fluxo ponta a ponta de rastreamento de entregas corporativas e repasses financeiros (payouts) para entregadores, garantindo alta disponibilidade, tolerância a falhas e observabilidade em tempo real.",
    strategy:
      "Ecossistema de microsserviços reativo e orientado a eventos em Java 21 / Spring Boot. O Spring Cloud Gateway centraliza a borda e segurança (Keycloak/OAuth2/OIDC), o Eureka gerencia a descoberta de serviços, o Apache Kafka provê a comunicação assíncrona e o Resilience4j garante a tolerância a falhas na comunicação HTTP síncrona entre microsserviços (Tracking e Courier Management).",
    highlights: [
      "Arquitetura de Microsserviços completa com Spring Cloud Gateway, Eureka Service Registry e gerenciamento centralizado de identidade com Keycloak (OAuth2/OIDC).",
      "Comunicação distribuída híbrida: assíncrona via tópicos do Apache Kafka (DeliveryPlaced, DeliveryPickedUp, DeliveryFulfilled) e síncrona resiliente via Resilience4j (Circuit Breaker e Retry).",
      "Stack de Observabilidade de nível corporativo (PLG/LGTM) com Prometheus, Grafana (dashboards customizados como War Room) e Loki para agregação estruturada de logs.",
      "Testes de integração end-to-end com Testcontainers (Kafka + Postgres), testes de carga automatizados com k6 e pipeline CI/CD no GitHub Actions.",
    ],
    techTags: [
      "Java 21",
      "Spring Boot 3.5",
      "Spring Cloud Gateway",
      "Eureka",
      "Keycloak (OAuth2/OIDC)",
      "Apache Kafka",
      "Resilience4j",
      "PostgreSQL",
      "Prometheus",
      "Grafana",
      "Loki",
      "Testcontainers",
      "k6",
    ],
    repoUrl: "https://github.com/weritonpetreca/petrecadelivery",
  },
];

export const featuredProject = projects.find((p) => p.featured)!;
