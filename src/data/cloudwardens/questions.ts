import type { ExamQuestion } from "./types";

export const CLOUDWARDENS_QUESTIONS: ExamQuestion[] = [
  // ==========================================
  // DOMÍNIO 1: CONCEITOS DE NUVEM (Cloud Concepts)
  // ==========================================
  {
    id: "q-concepts-1",
    domain: "cloud-concepts",
    difficulty: "intro",
    relatedCardId: "guardian-ec2",
    questionText:
      "Uma empresa precisa executar uma aplicação crítica de comércio eletrônico e deseja garantir que o sistema continue operando mesmo se um data center físico inteiro sofrer uma queda de energia catastrófica. Qual princípio de arquitetura da AWS deve ser implementado?",
    options: [
      {
        id: "a",
        text: "Implantar a aplicação em múltiplas Zonas de Disponibilidade (Multi-AZ) dentro de uma mesma Região da AWS.",
      },
      {
        id: "b",
        text: "Aumentar a memória e a CPU de uma única instância EC2 para suportar a carga de trabalho.",
      },
      {
        id: "c",
        text: "Utilizar uma única Edge Location do Amazon CloudFront para hospedar o banco de dados.",
      },
      {
        id: "d",
        text: "Comprar instâncias EC2 Reservadas em um único data center para garantir prioridade de hardware.",
      },
    ],
    correctOptionId: "a",
    explanation:
      "Uma Região da AWS é composta por múltiplas Zonas de Disponibilidade (AZs) isoladas entre si, cada uma com alimentação elétrica, refrigeração e rede redundantes. A implantação em múltiplas AZs garante Alta Disponibilidade (High Availability) e Tolerância a Falhas contra a queda de um data center individual.",
    examReference: "CLF-C02: Domínio 1 — Infraestrutura Global da AWS e Tolerância a Falhas.",
  },
  {
    id: "q-concepts-2",
    domain: "cloud-concepts",
    difficulty: "standard",
    relatedCardId: "guardian-lambda",
    questionText:
      "Qual benefício da computação em nuvem descreve a capacidade de provisionar ou desalocar automaticamente recursos computacionais com base na demanda variável em tempo real?",
    options: [
      {
        id: "a",
        text: "Agilidade",
      },
      {
        id: "b",
        text: "Elasticidade",
      },
      {
        id: "c",
        text: "Durabilidade",
      },
      {
        id: "d",
        text: "Governança estática",
      },
    ],
    correctOptionId: "b",
    explanation:
      "A Elasticidade é a capacidade de um sistema se expandir (scale-out) quando a demanda aumenta e se contrair (scale-in) quando o tráfego diminui, evitando tanto o subdimensionamento quanto o desperdício de pagar por capacidade ociosa.",
    examReference: "CLF-C02: Domínio 1 — Benefícios da Nuvem AWS.",
  },

  // ==========================================
  // DOMÍNIO 2: SEGURANÇA E CONFORMIDADE (Security)
  // ==========================================
  {
    id: "q-sec-1",
    domain: "security",
    difficulty: "standard",
    relatedCardId: "guardian-iam",
    questionText:
      "De acordo com as melhores práticas de segurança da AWS e o princípio do Menor Privilégio (Least Privilege), qual é a recomendação correta para o uso da conta de usuário Root da AWS?",
    options: [
      {
        id: "a",
        text: "Utilizar o usuário Root para as tarefas diárias de administração e desenvolvimento da equipe.",
      },
      {
        id: "b",
        text: "Criar chaves de acesso (Access Keys) permanentes para o usuário Root e compartilhá-las com os desenvolvedores.",
      },
      {
        id: "c",
        text: "Habilitar Autenticação Multifator (MFA) no usuário Root e utilizá-lo apenas para tarefas que exigem explicitamente privilégios Root, delegando o restante para usuários e roles do IAM.",
      },
      {
        id: "d",
        text: "Desativar o IAM e gerenciar todas as permissões através de senhas locais no sistema operacional das instâncias.",
      },
    ],
    correctOptionId: "c",
    explanation:
      "A conta Root possui acesso total e irrestrito a todos os recursos e dados de faturamento da conta AWS. As melhores práticas exigem proteger o Root com MFA, nunca gerar chaves de acesso estáticas e utilizar usuários/roles do IAM com políticas restritivas para as atividades rotineiras.",
    examReference: "CLF-C02: Domínio 2 — Gerenciamento de Identidades e Acesso (IAM) e Melhores Práticas.",
  },
  {
    id: "q-sec-2",
    domain: "security",
    difficulty: "intro",
    relatedCardId: "guardian-iam",
    questionText:
      "No Modelo de Responsabilidade Compartilhada da AWS, qual das seguintes tarefas é de responsabilidade EXCLUSIVA da AWS e NÃO do cliente?",
    options: [
      {
        id: "a",
        text: "Configurar as regras de firewall (Security Groups) das instâncias EC2.",
      },
      {
        id: "b",
        text: "Gerenciar senhas e políticas de rotação de credenciais de usuários do IAM.",
      },
      {
        id: "c",
        text: "Segurança física, descarte seguro de discos e manutenção de hardware nos data centers da AWS.",
      },
      {
        id: "d",
        text: "Criptografar os dados em trânsito e em repouso dentro dos buckets do Amazon S3.",
      },
    ],
    correctOptionId: "c",
    explanation:
      "A AWS é responsável pela 'Segurança DA Nuvem' (infraestrutura global, hardware, data centers físicos, geradores de energia e virtualização básica). O cliente é responsável pela 'Segurança NA Nuvem' (dados do cliente, configuração do SO, firewalls e controle de acesso via IAM).",
    examReference: "CLF-C02: Domínio 2 — Modelo de Responsabilidade Compartilhada.",
  },

  // ==========================================
  // DOMÍNIO 3: TECNOLOGIA E SERVIÇOS (Technology)
  // ==========================================
  {
    id: "q-tech-1",
    domain: "technology",
    difficulty: "standard",
    relatedCardId: "guardian-s3",
    questionText:
      "Uma startup deseja armazenar milhões de imagens de usuários e precisa de uma solução que ofereça alta durabilidade, escalabilidade ilimitada e suporte para proteger arquivos contra exclusões acidentais com bloqueio de objeto. Qual serviço é o mais adequado?",
    options: [
      {
        id: "a",
        text: "Amazon Elastic Block Store (Amazon EBS)",
      },
      {
        id: "b",
        text: "Amazon Simple Storage Service (Amazon S3)",
      },
      {
        id: "c",
        text: "AWS Storage Gateway",
      },
      {
        id: "d",
        text: "Amazon Elastic File System (Amazon EFS)",
      },
    ],
    correctOptionId: "b",
    explanation:
      "O Amazon S3 é um serviço de armazenamento de objetos altamente durável (99.999999999%), com recursos nativos como S3 Object Lock (WORM - Write Once, Read Many), versionamento e controle granular de ciclo de vida.",
    examReference: "CLF-C02: Domínio 3 — Serviços de Armazenamento da AWS.",
  },
  {
    id: "q-tech-2",
    domain: "technology",
    difficulty: "standard",
    relatedCardId: "guardian-cloudfront",
    questionText:
      "Uma empresa possui clientes no Japão, Brasil e Europa acessando um site hospedado em instâncias EC2 na região us-east-1 (Virgínia do Norte). Qual serviço da AWS deve ser configurado para entregar o conteúdo estático com a menor latência possível aos usuários globais?",
    options: [
      {
        id: "a",
        text: "AWS Direct Connect",
      },
      {
        id: "b",
        text: "Amazon CloudFront",
      },
      {
        id: "c",
        text: "Amazon Simple Queue Service (Amazon SQS)",
      },
      {
        id: "d",
        text: "AWS Snowball",
      },
    ],
    correctOptionId: "b",
    explanation:
      "O Amazon CloudFront é a CDN (Content Delivery Network) global da AWS que armazena em cache cópias dos conteúdos estáticos e dinâmicos em Edge Locations (Pontos de Presença) distribuídos mundialmente, entregando os dados aos usuários com mínima latência de rede.",
    examReference: "CLF-C02: Domínio 3 — Rede e Entrega Global de Conteúdo.",
  },

  // ==========================================
  // DOMÍNIO 4: FATURAMENTO E CUSTOS (Billing & Pricing)
  // ==========================================
  {
    id: "q-billing-1",
    domain: "billing",
    difficulty: "intro",
    relatedCardId: "anomaly-bill-spike",
    questionText:
      "Qual ferramenta da AWS permite que um arquiteto configure um limite financeiro mensal e receba notificações automáticas por e-mail quando os gastos reais ou previstos atingirem 80% do valor estipulado?",
    options: [
      {
        id: "a",
        text: "AWS Pricing Calculator",
      },
      {
        id: "b",
        text: "AWS Budgets",
      },
      {
        id: "c",
        text: "AWS Cost Explorer",
      },
      {
        id: "d",
        text: "AWS Artifact",
      },
    ],
    correctOptionId: "b",
    explanation:
      "O AWS Budgets permite configurar orçamentos personalizados e disparar alertas via e-mail ou SNS antes que a fatura exceda o valor planejado. O Cost Explorer serve para visualizar e analisar o histórico de gastos, e o Pricing Calculator para estimar custos antes de provisionar.",
    examReference: "CLF-C02: Domínio 4 — Gestão Financeira e Monitoramento de Custos.",
  },
  {
    id: "q-billing-2",
    domain: "billing",
    difficulty: "standard",
    relatedCardId: "guardian-ec2",
    questionText:
      "Uma organização possui uma carga de trabalho de processamento em lote (batch processing) que pode ser interrompida a qualquer momento sem afetar o negócio e deseja obter o maior desconto possível (de até 90%). Qual modelo de compra do Amazon EC2 é o mais indicado?",
    options: [
      {
        id: "a",
        text: "On-Demand Instances",
      },
      {
        id: "b",
        text: "Spot Instances",
      },
      {
        id: "c",
        text: "Dedicated Hosts",
      },
      {
        id: "d",
        text: "Compute Savings Plans",
      },
    ],
    correctOptionId: "b",
    explanation:
      "As instâncias Spot utilizam capacidade computacional ociosa da AWS com descontos de até 90% em relação ao preço On-Demand. A contrapartida é que a AWS pode recuperar a instância com um aviso prévio de 2 minutos se precisar da capacidade, tornando-as ideais para cargas de trabalho tolerantes a interrupção.",
    examReference: "CLF-C02: Domínio 4 — Modelos de Precificação do Amazon EC2.",
  },
];
