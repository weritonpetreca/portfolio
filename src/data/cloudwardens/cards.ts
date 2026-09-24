import type { Card } from "./types";

export const CLOUDWARDENS_CARDS: Card[] = [
  // ==========================================
  // GUARDIÕES DA NUVEM (Serviços Oficiais AWS)
  // ==========================================
  {
    id: "guardian-s3",
    name: "O Cofre Inviolável",
    awsService: "Amazon S3",
    serviceCategory: "Armazenamento de Objetos",
    domain: "technology",
    type: "guardian",
    rarity: "rare",
    power: 7,
    defense: 10,
    energyCost: 2,
    runeSymbol: "ᛞ", // Ingwaz: Proteção e armazenamento
    flavorText:
      "Forjado nas montanhas mais altas do Domínio de Âmbar, este cofre preserva manuscritos com 11 noves de durabilidade imutável.",
    technicalExplanation:
      "Armazenamento de objetos escalável para dados não estruturados com 99.999999999% (11 9s) de durabilidade e suporte nativo a Object Lock, versionamento e criptografia KMS.",
    examTip:
      "Dica CLF-C02: O Amazon S3 armazena objetos (arquivos) em Buckets com chaves e metadados. Não é um sistema de arquivos de blocos (como EBS) nem relacional (como RDS).",
    counters: ["anomaly-data-loss"],
  },
  {
    id: "guardian-lambda",
    name: "A Forja dos Autômatos",
    awsService: "AWS Lambda",
    serviceCategory: "Computação Serverless",
    domain: "technology",
    type: "guardian",
    rarity: "epic",
    power: 9,
    defense: 5,
    energyCost: 3,
    runeSymbol: "ᚦ", // Thurisaz: Força de ataque reativa
    flavorText:
      "Autômatos arcanos que despertam em fração de segundo quando um sinal é emitido, cumprindo sua missão e retornando ao pó sem cobrar pelo tempo de repouso.",
    technicalExplanation:
      "Serviço de computação orientada a eventos (FaaS). Executa código em resposta a gatilhos sem provisionamento ou gerenciamento de servidores, com cobrança estrita por milissegundo de execução.",
    examTip:
      "Dica CLF-C02: O AWS Lambda é o pilar serverless da AWS. O usuário é responsável apenas pelo código e configurações; a AWS cuida do patch de SO, escalabilidade e infraestrutura.",
    counters: ["anomaly-traffic-spike"],
  },
  {
    id: "guardian-ec2",
    name: "O Sentinela de Aço",
    awsService: "Amazon EC2",
    serviceCategory: "Computação em Instâncias",
    domain: "technology",
    type: "guardian",
    rarity: "common",
    power: 6,
    defense: 8,
    energyCost: 3,
    runeSymbol: "ᛏ", // Tiwaz: O guerreiro em guarda
    flavorText:
      "Um guerreiro de armadura pesada com controle total sobre suas lâminas, sistema de batalha e porte de carga. Permanece de prontidão dia e noite.",
    technicalExplanation:
      "Capacidade computacional segura e redimensionável na nuvem (IaaS). Concede controle completo de nível de sistema operacional (Linux/Windows), memória, CPU e armazenamento acoplado.",
    examTip:
      "Dica CLF-C02: Instâncias EC2 possuem modelos de compra cruciais para a prova: On-Demand (sem fidelidade), Reserved Instances / Savings Plans (desconto de até 72% por 1 ou 3 anos) e Spot Instances (desconto de até 90% para cargas tolerantes a interrupção).",
    counters: ["anomaly-spof"],
  },
  {
    id: "guardian-dynamodb",
    name: "O Livro Negro de Nomes",
    awsService: "Amazon DynamoDB",
    serviceCategory: "Banco de Dados NoSQL Serverless",
    domain: "technology",
    type: "guardian",
    rarity: "epic",
    power: 8,
    defense: 9,
    energyCost: 4,
    runeSymbol: "ᚱ", // Raidho: Conexão ordenada de dados
    flavorText:
      "Um tomo ancestral de páginas infinitas capaz de localizar o registro de qualquer alma em menos de dez milissegundos, mesmo que dez milhões de mãos o consultem ao mesmo tempo.",
    technicalExplanation:
      "Banco de dados NoSQL gerenciado de chave-valor e documentos. Oferece latência de dígito único de milissegundo em qualquer escala, replicação Multi-AZ automática e modo sob demanda.",
    examTip:
      "Dica CLF-C02: Diferente do Amazon RDS (que é relacional SQL e usa instâncias provisionadas), o DynamoDB é totalmente NoSQL, gerenciado e serverless com particionamento automático.",
    counters: ["anomaly-traffic-spike"],
  },
  {
    id: "guardian-cloudfront",
    name: "O Mensageiro da Borda",
    awsService: "Amazon CloudFront",
    serviceCategory: "Rede & CDN Global",
    domain: "technology",
    type: "guardian",
    rarity: "rare",
    power: 7,
    defense: 7,
    energyCost: 2,
    runeSymbol: "ᛖ", // Ehwaz: Movimento veloz
    flavorText:
      "Postos de vigia espalhados por todos os continentes do mundo conhecido, entregando defesas e mensagens a passos de distância de quem as solicita.",
    technicalExplanation:
      "Rede de entrega de conteúdo (CDN) rápida e segura que distribui dados, vídeos, aplicações e APIs globalmente através de centenas de Edge Locations, reduzindo a latência.",
    examTip:
      "Dica CLF-C02: O CloudFront utiliza Pontos de Presença (Edge Locations) para fazer cache de conteúdo estático e dinâmico mais próximo dos usuários finais, aliviando os servidores de origem (como S3 ou EC2).",
    counters: ["anomaly-traffic-spike"],
  },
  {
    id: "guardian-iam",
    name: "O Mestre das Chaves",
    awsService: "AWS IAM",
    serviceCategory: "Segurança, Identidade & Acesso",
    domain: "security",
    type: "guardian",
    rarity: "legendary",
    power: 9,
    defense: 10,
    energyCost: 1,
    runeSymbol: "ᛉ", // Algiz: O escudo sagrado de proteção
    flavorText:
      "Nenhuma criatura ou entidade pisa nos corredores da cidadela sem declarar sua identidade e provar que detém o selo estrito para cruzar aquela porta específica.",
    technicalExplanation:
      "Serviço central de controle de acesso da AWS. Gerencia Usuários, Grupos, Roles (papéis temporários com STS) e Políticas JSON seguindo o princípio do Menor Privilégio (Least Privilege).",
    examTip:
      "Dica CLF-C02: O IAM é um serviço GLOBAL (não regional) e gratuito. Regra de ouro da prova: NUNCA use as credenciais da conta Root para tarefas diárias; exija MFA e delegue permissões via IAM Roles e Policies.",
    counters: ["anomaly-root-breach"],
  },

  // ==========================================
  // ANOMALIAS DE NUVEM (Incidentes e Desafios)
  // ==========================================
  {
    id: "anomaly-spof",
    name: "O Colosso do Ponto Único de Falha",
    awsService: "Conceito: Single Point of Failure (SPOF)",
    serviceCategory: "Anti-Padrão Arquitetural",
    domain: "cloud-concepts",
    type: "anomaly",
    rarity: "common",
    power: 7,
    defense: 6,
    energyCost: 2,
    runeSymbol: "ᚾ", // Nauthiz: Necessidade / Fragilidade
    flavorText:
      "Uma fera que apoia todo o peso de sua carcaça sobre uma única perna de barro. Se essa perna ruir, todo o seu corpo desaba em silêncio.",
    technicalExplanation:
      "Arquitetura implantada em apenas uma Zona de Disponibilidade (Single-AZ) ou em uma única instância sem réplicas de leitura ou balanceador de carga.",
    examTip:
      "Dica CLF-C02: Alta Disponibilidade (High Availability) e Tolerância a Falhas (Fault Tolerance) exigem implantação Multi-AZ e balanceamento automático de carga via Elastic Load Balancing (ELB).",
    weakness: "Multi-AZ Deployment, Elastic Load Balancing e Auto Scaling.",
  },
  {
    id: "anomaly-root-breach",
    name: "O Infiltrador da Chave Raiz",
    awsService: "Conceito: Root User Abuse / Missing MFA",
    serviceCategory: "Vulnerabilidade Crítica de Segurança",
    domain: "security",
    type: "anomaly",
    rarity: "epic",
    power: 10,
    defense: 4,
    energyCost: 3,
    runeSymbol: "ᛚ", // Laguz: Águas turvas e traição
    flavorText:
      "Uma sombra que rasteja até os aposentos do Rei, rouba o carimbo soberano esquecido sem tranca e emite ordens que abrem os portões para os invasores.",
    technicalExplanation:
      "Comprometimento de credenciais da conta Root da AWS por ausência de Autenticação Multifator (MFA) ou compartilhamento de chaves de acesso estáticas em código público.",
    examTip:
      "Dica CLF-C02: A conta Root possui permissões irrestritas irreversíveis. A melhor prática do AWS Well-Architected exige bloquear o Root com MFA físico ou virtual e criar usuários IAM com privilégios limitados.",
    weakness: "Ativação obrigatória de MFA, eliminação de access keys da conta Root e adoção de IAM Roles.",
  },
  {
    id: "anomaly-traffic-spike",
    name: "A Maré da Sobrecarga Imprevisível",
    awsService: "Conceito: Traffic Surge / Unscaled Compute",
    serviceCategory: "Gargalo de Elasticidade",
    domain: "cloud-concepts",
    type: "anomaly",
    rarity: "rare",
    power: 8,
    defense: 7,
    energyCost: 3,
    runeSymbol: "ᚺ", // Hagalaz: Tempestade destrutiva
    flavorText:
      "Uma horda imensa de aldeões correndo desesperados ao mesmo tempo em direção à mesma ponte estreita, esmagando as defesas sob o próprio peso.",
    technicalExplanation:
      "Picos repentinos de requisições que superam a capacidade de processamento fixo, gerando erros HTTP 504 Gateway Timeout e indisponibilidade de serviço.",
    examTip:
      "Dica CLF-C02: Elasticidade é a capacidade de expandir e contrair recursos computacionais automaticamente conforme a demanda flutua, através de EC2 Auto Scaling e arquiteturas Serverless com AWS Lambda.",
    weakness: "Amazon CloudFront para cache de borda e AWS Lambda / EC2 Auto Scaling para absorver picos.",
  },
  {
    id: "anomaly-bill-spike",
    name: "O Devorador de Faturas",
    awsService: "Conceito: Zombie Resources & Unmonitored Costs",
    serviceCategory: "Vazamento Financeiro / FinOps",
    domain: "billing",
    type: "anomaly",
    rarity: "rare",
    power: 8,
    defense: 6,
    energyCost: 2,
    runeSymbol: "ᚠ", // Fehu invertido: Perda de riquezas
    flavorText:
      "Um gnomo ladrão que instala torneiras secretas nos canos da tesouraria real. Quando o chanceler abre os cofres no fim do ciclo lunar, nada mais resta.",
    technicalExplanation:
      "Recursos esquecidos ativos (instâncias EC2 rodando sem uso, volumes EBS órfãos, gateways NAT desnecessários) sem orçamentos configurados ou alarmes de faturamento.",
    examTip:
      "Dica CLF-C02: O AWS Budgets permite definir orçamentos personalizados e alertas de notificação via e-mail/SNS quando os custos reais ou previstos excedem o limite estabelecido. O AWS Cost Explorer analisa o histórico de gastos.",
    weakness: "AWS Budgets com alertas proativos e relatórios de auditoria do AWS Trusted Advisor.",
  },
  {
    id: "anomaly-dead-letters",
    name: "A Besta das Mensagens Perdidas",
    awsService: "Conceito: Message Loss in Asynchronous Decoupling",
    serviceCategory: "Falha de Integração e Mensageria",
    domain: "technology",
    type: "anomaly",
    rarity: "common",
    power: 6,
    defense: 6,
    energyCost: 2,
    runeSymbol: "ᛈ", // Perthro: O incerto / O acaso
    flavorText:
      "Espíritos errantes que interceptam os corvos-mensageiros da guilda no meio do caminho, engolindo os pergaminhos sem que o remetente saiba que a mensagem nunca chegou.",
    technicalExplanation:
      "Falhas em pipelines assíncronos onde uma mensagem processada por uma fila falha consecutivas vezes e é descartada sem rastreabilidade ou reprocessamento.",
    examTip:
      "Dica CLF-C02: O Amazon SQS (Simple Queue Service) desacopla componentes de aplicação. A fila de mensagens não entregues (Dead-Letter Queue - DLQ) isola mensagens com erro para análise posterior sem interromper o fluxo principal.",
    weakness: "Configuração de Dead-Letter Queue (DLQ) no Amazon SQS e alarmes de profundidade de fila.",
  },
  {
    id: "anomaly-data-loss",
    name: "O Espectro da Catástrofe Física",
    awsService: "Conceito: Lack of Disaster Recovery & Durability",
    serviceCategory: "Perda Crítica de Dados",
    domain: "cloud-concepts",
    type: "anomaly",
    rarity: "epic",
    power: 9,
    defense: 8,
    energyCost: 4,
    runeSymbol: "ᛁ", // Isa: Estagnação e congelamento
    flavorText:
      "Um tremor de terra que abre uma fenda sob a biblioteca real, engolindo os únicos exemplares existentes de todos os mapas e tratados de paz do continente.",
    technicalExplanation:
      "Destruição irreversível de dados causada por ausência de políticas de backup geodistribuído, exclusão acidental ou corrupção de arquivos sem versionamento.",
    examTip:
      "Dica CLF-C02: RPO (Recovery Point Objective - quantidade máxima aceitável de perda de dados no tempo) e RTO (Recovery Time Objective - tempo máximo para restaurar o serviço) são métricas centrais de Disaster Recovery da AWS.",
    weakness: "Armazenamento no Amazon S3 com versionamento ativado e replicação entre regiões (Cross-Region Replication - CRR).",
  },
];
