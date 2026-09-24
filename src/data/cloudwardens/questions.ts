import type { ExamQuestion } from "./types";

export const CLOUDWARDENS_QUESTIONS: ExamQuestion[] = [
  // ==========================================
  // CAPÍTULO I: ARMAZENAMENTO & DURABILIDADE (S3, Backup)
  // ==========================================
  {
    id: "q-storage-1",
    domain: "technology",
    difficulty: "standard",
    relatedCardId: "guardian-s3",
    questionText:
      "Uma organização financeira precisa armazenar documentos fiscais por 7 anos para atender a exigências regulatórias. Os documentos raramente serão acessados após os primeiros 30 dias, mas devem ser retidos com segurança pelo menor custo possível. Qual classe de armazenamento do Amazon S3 é a mais recomendada?",
    options: [
      {
        id: "a",
        text: "Amazon S3 Standard",
      },
      {
        id: "b",
        text: "Amazon S3 Glacier Flexible Retrieval (ou Glacier Deep Archive)",
      },
      {
        id: "c",
        text: "Amazon EBS Provisioned IOPS",
      },
      {
        id: "d",
        text: "Amazon EFS com acesso padrão",
      },
    ],
    correctOptionId: "b",
    explanation:
      "O Amazon S3 Glacier Flexible Retrieval e o S3 Glacier Deep Archive foram projetados especificamente para retenção de longo prazo e arquivamento de dados acessados com pouca frequência, oferecendo os custos de armazenamento por gigabyte mais baixos da AWS com durabilidade de 11 noves (99.999999999%).",
    examReference: "CLF-C02: Domínio 3 — Classes de Armazenamento do Amazon S3 e Gerenciamento de Ciclo de Vida.",
  },
  {
    id: "q-storage-2",
    domain: "technology",
    difficulty: "intro",
    relatedCardId: "guardian-s3",
    questionText:
      "Qual recurso nativo do Amazon S3 impede que arquivos sejam deletados ou sobrescritos acidentalmente por usuários ou até mesmo por invasores durante um período de retenção predeterminado (modelo WORM — Write Once, Read Many)?",
    options: [
      {
        id: "a",
        text: "S3 Object Lock (com modo Compliance ou Governance)",
      },
      {
        id: "b",
        text: "S3 Transfer Acceleration",
      },
      {
        id: "c",
        text: "AWS Direct Connect",
      },
      {
        id: "d",
        text: "Amazon CloudFront Invalidation",
      },
    ],
    correctOptionId: "a",
    explanation:
      "O S3 Object Lock permite armazenar objetos usando o modelo WORM (Write Once, Read Many), impedindo que um objeto seja excluído ou modificado durante um período fixo ou indefinido. No modo Compliance, nem mesmo a conta Root pode excluir o objeto durante o período de retenção.",
    examReference: "CLF-C02: Domínio 2 e 3 — Proteção de Dados, Imutabilidade e Conformidade no S3.",
  },

  // ==========================================
  // CAPÍTULO II: SEGURANÇA & IDENTIDADE (IAM, KMS, Modelo Compartilhado)
  // ==========================================
  {
    id: "q-iam-1",
    domain: "security",
    difficulty: "intro",
    relatedCardId: "guardian-iam",
    questionText:
      "De acordo com o Modelo de Responsabilidade Compartilhada da AWS, qual das seguintes atribuições é de responsabilidade exclusiva do CLIENTE ao utilizar uma instância do Amazon EC2?",
    options: [
      {
        id: "a",
        text: "Manutenção física e substituição de discos defeituosos no data center da AWS.",
      },
      {
        id: "b",
        text: "Instalação de patches de segurança e atualizações no Sistema Operacional convidado (Guest OS) da instância.",
      },
      {
        id: "c",
        text: "Segurança de perímetro físico das instalações da Zona de Disponibilidade.",
      },
      {
        id: "d",
        text: "Destruição segura e descarte de servidores físicos desativados.",
      },
    ],
    correctOptionId: "b",
    explanation:
      "A AWS é responsável pela segurança 'DA' nuvem (hardware, data centers físicos, virtualização e infraestrutura global). O cliente é responsável pela segurança 'NA' nuvem (sistema operacional da instância EC2, regras de firewall/Security Groups, dados do cliente e IAM).",
    examReference: "CLF-C02: Domínio 2 — Modelo de Responsabilidade Compartilhada (Shared Responsibility Model).",
  },
  {
    id: "q-iam-2",
    domain: "security",
    difficulty: "standard",
    relatedCardId: "guardian-iam",
    questionText:
      "Um desenvolvedor precisa conceder permissão temporária e segura para que uma aplicação em execução no Amazon EC2 acesse um Bucket do Amazon S3 sem gravar credenciais fixas (Access Keys) no código-fonte. Qual é a melhor prática recomendada pela AWS?",
    options: [
      {
        id: "a",
        text: "Atribuir um IAM Role (Perfil de IAM) com as permissões mínimas necessárias à instância EC2.",
      },
      {
        id: "b",
        text: "Usar as credenciais da conta Root no arquivo de configuração da aplicação.",
      },
      {
        id: "c",
        text: "Criar um usuário IAM administrativo e colar sua Access Key diretamente no repositório de código.",
      },
      {
        id: "d",
        text: "Desativar temporariamente o firewall da instância EC2 para autorizar o tráfego.",
      },
    ],
    correctOptionId: "a",
    explanation:
      "IAM Roles permitem que instâncias EC2 e funções Lambda obtenham credenciais temporárias de curto prazo rotacionadas automaticamente pelo serviço STS, eliminando a necessidade de hardcoding de chaves estáticas e seguindo o princípio do Menor Privilégio.",
    examReference: "CLF-C02: Domínio 2 — Gerenciamento de Identidade, IAM Roles e Práticas de Segurança.",
  },

  // ==========================================
  // CAPÍTULO III: RESILIÊNCIA & INFRAESTRUTURA GLOBAL (Multi-AZ, Regiões, EC2)
  // ==========================================
  {
    id: "q-infra-1",
    domain: "cloud-concepts",
    difficulty: "intro",
    relatedCardId: "guardian-ec2",
    questionText:
      "Uma empresa precisa executar uma aplicação crítica e deseja garantir que o sistema continue operando mesmo se um data center físico inteiro sofrer uma queda de energia catastrófica. Qual princípio de arquitetura da AWS deve ser implementado?",
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
    id: "q-infra-2",
    domain: "cloud-concepts",
    difficulty: "standard",
    relatedCardId: "guardian-ec2",
    questionText:
      "Qual modelo de precificação do Amazon EC2 oferece o maior desconto (de até 90% sobre o preço sob demanda), sendo ideal para cargas de trabalho de processamento em lote que são tolerantes a interrupções imprevistas?",
    options: [
      {
        id: "a",
        text: "On-Demand Instances (Sob demanda)",
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
        text: "Savings Plans de 3 anos",
      },
    ],
    correctOptionId: "b",
    explanation:
      "Instâncias Spot aproveitam a capacidade computacional ociosa da AWS com descontos de até 90%. Em contrapartida, a AWS pode recuperar a instância com um aviso prévio de 2 minutos se precisar da capacidade de volta, sendo ideal para workloads stateless e processamento batch.",
    examReference: "CLF-C02: Domínio 4 — Modelos de Compra e Otimização de Custos no EC2.",
  },

  // ==========================================
  // CAPÍTULO IV: SERVERLESS & ELASTICIDADE (Lambda, DynamoDB, CloudFront)
  // ==========================================
  {
    id: "q-serverless-1",
    domain: "technology",
    difficulty: "standard",
    relatedCardId: "guardian-lambda",
    questionText:
      "Qual das seguintes características melhor define a computação Serverless (sem servidor) na AWS, representada por serviços como AWS Lambda e Amazon DynamoDB?",
    options: [
      {
        id: "a",
        text: "Não há servidores físicos envolvidos em nenhum momento na infraestrutura do planeta.",
      },
      {
        id: "b",
        text: "O cliente não gerencia, provisiona nem aplica patches em servidores, e a cobrança é baseada estritamente no consumo real.",
      },
      {
        id: "c",
        text: "O cliente deve configurar manualmente o sistema operacional Linux e instalar os drivers de rede.",
      },
      {
        id: "d",
        text: "O serviço roda apenas durante o horário comercial de segunda a sexta-feira.",
      },
    ],
    correctOptionId: "b",
    explanation:
      "Na arquitetura Serverless, os servidores continuam existindo fisicamente na AWS, mas o cliente fica completamente abstraído de tarefas de infraestrutura: escalabilidade automática, tolerância a falhas e aplicação de patches são gerenciados pela AWS, sem custos por tempo ocioso.",
    examReference: "CLF-C02: Domínio 3 — Paradigma Serverless e Serviços Gerenciados da AWS.",
  },
  {
    id: "q-serverless-2",
    domain: "technology",
    difficulty: "standard",
    relatedCardId: "guardian-cloudfront",
    questionText:
      "Uma empresa com clientes na Europa, Ásia e América do Sul hospeda seu site estático em um Bucket do S3 nos Estados Unidos. Usuários no Japão reclamam de lentidão. Qual serviço da AWS deve ser implementado para reduzir a latência globalmente através de cache de borda?",
    options: [
      {
        id: "a",
        text: "Amazon CloudFront",
      },
      {
        id: "b",
        text: "AWS Snowball Edge",
      },
      {
        id: "c",
        text: "AWS CloudTrail",
      },
      {
        id: "d",
        text: "Amazon Elastic File System (EFS)",
      },
    ],
    correctOptionId: "a",
    explanation:
      "O Amazon CloudFront é a CDN (Content Delivery Network) da AWS. Ele distribui conteúdo usando uma rede global de centenas de Edge Locations, servindo o conteúdo em cache com a menor latência possível para o usuário final.",
    examReference: "CLF-C02: Domínio 3 — Rede de Distribuição Global, Edge Locations e CloudFront.",
  },

  // ==========================================
  // CAPÍTULO V: FINOPS, CUSTOS & GOVERNANÇA (Budgets, Cost Explorer, TCO)
  // ==========================================
  {
    id: "q-finops-1",
    domain: "billing",
    difficulty: "intro",
    relatedCardId: "anomaly-bill-spike",
    questionText:
      "Qual ferramenta nativa da AWS permite definir limites de gastos personalizados e enviar notificações por e-mail ou SNS automaticamente quando os custos reais ou projetados ultrapassarem uma porcentagem estipulada?",
    options: [
      {
        id: "a",
        text: "AWS Budgets",
      },
      {
        id: "b",
        text: "AWS Trusted Advisor (somente no plano básico)",
      },
      {
        id: "c",
        text: "AWS Shield Standard",
      },
      {
        id: "d",
        text: "Amazon Inspector",
      },
    ],
    correctOptionId: "a",
    explanation:
      "O AWS Budgets permite configurar orçamentos personalizados de custos e uso, enviando alertas em tempo real quando os limites forem atingidos ou quando as previsões matemáticas da AWS indicarem que o limite será ultrapassado no final do mês.",
    examReference: "CLF-C02: Domínio 4 — Faturamento, Alertas e Controle Orçamentário com AWS Budgets.",
  },
  {
    id: "q-finops-2",
    domain: "billing",
    difficulty: "standard",
    relatedCardId: "anomaly-bill-spike",
    questionText:
      "Qual ferramenta gratuita da AWS permite visualizar, analisar e prever seus gastos históricos ao longo do tempo através de gráficos interativos com filtros por serviço, tag de centro de custo e região?",
    options: [
      {
        id: "a",
        text: "AWS Cost Explorer",
      },
      {
        id: "b",
        text: "AWS Pricing Calculator",
      },
      {
        id: "c",
        text: "AWS Artifact",
      },
      {
        id: "d",
        text: "AWS Systems Manager",
      },
    ],
    correctOptionId: "a",
    explanation:
      "O AWS Cost Explorer fornece uma interface gráfica interativa para analisar gastos dos últimos meses e projetar faturas futuras. O AWS Pricing Calculator, por outro lado, é usado para estimar custos ANTES de criar os recursos.",
    examReference: "CLF-C02: Domínio 4 — Análise Financeira, Visualização de Custos e AWS Cost Explorer.",
  },
];
