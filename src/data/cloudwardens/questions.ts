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
        explanation:
          "Incorreta: O S3 Standard foi projetado para dados frequentemente acessados. Embora ofereça baixa latência, seu custo por GB é o mais alto entre as classes do S3, tornando-o inviável para retenção de 7 anos.",
      },
      {
        id: "b",
        text: "Amazon S3 Glacier Flexible Retrieval (ou Glacier Deep Archive)",
        explanation:
          "Correta: As classes Glacier foram criadas especificamente para arquivamento de longo prazo. O S3 Glacier Deep Archive oferece o menor custo de armazenamento na nuvem (centavos por terabyte ao mês) com durabilidade de 11 noves (99.999999999%).",
      },
      {
        id: "c",
        text: "Amazon EBS Provisioned IOPS",
        explanation:
          "Incorreta: O Amazon EBS é um serviço de armazenamento de blocos para instâncias EC2, não um repositório de arquivamento de arquivos. O tipo Provisioned IOPS é caríssimo e voltado para bancos de dados de altíssimo desempenho.",
      },
      {
        id: "d",
        text: "Amazon EFS com acesso padrão",
        explanation:
          "Incorreta: O Amazon EFS é um sistema de arquivos de rede gerenciado (NFS) para compartilhamento entre múltiplos servidores. Tem custo substancialmente maior que o S3 Glacier e não é a classe recomendada para arquivo morto regulatório.",
      },
    ],
    correctOptionId: "b",
    explanation:
      "O Amazon S3 Glacier Flexible Retrieval e o S3 Glacier Deep Archive foram projetados especificamente para retenção de longo prazo e arquivamento de dados acessados com pouca frequência, oferecendo os custos de armazenamento por gigabyte mais baixos da AWS com durabilidade de 11 noves (99.999999999%).",
    examReference: "CLF-C02: Domínio 3 — Classes de Armazenamento do Amazon S3 e Gerenciamento de Ciclo de Vida.",
    docsUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
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
        explanation:
          "Correta: O S3 Object Lock implementa o padrão WORM. No modo Compliance, nenhum usuário (nem mesmo a conta Root da AWS) consegue excluir ou alterar o objeto durante o período de retenção configurado.",
      },
      {
        id: "b",
        text: "S3 Transfer Acceleration",
        explanation:
          "Incorreta: O Transfer Acceleration serve exclusivamente para acelerar uploads de longa distância para o S3 usando os pontos de presença (Edge Locations) do CloudFront, sem impacto em políticas de exclusão.",
      },
      {
        id: "c",
        text: "AWS Direct Connect",
        explanation:
          "Incorreta: O Direct Connect é uma conexão de rede física dedicada entre o data center on-premises da empresa e a AWS, não uma funcionalidade de imutabilidade de arquivos.",
      },
      {
        id: "d",
        text: "Amazon CloudFront Invalidation",
        explanation:
          "Incorreta: A invalidação do CloudFront remove arquivos do cache das bordas para forçar a busca de uma nova versão na origem, não impedindo deleção no bucket S3.",
      },
    ],
    correctOptionId: "a",
    explanation:
      "O S3 Object Lock permite armazenar objetos usando o modelo WORM (Write Once, Read Many), impedindo que um objeto seja excluído ou modificado durante um período fixo ou indefinido. No modo Compliance, nem mesmo a conta Root pode excluir o objeto durante o período de retenção.",
    examReference: "CLF-C02: Domínio 2 e 3 — Proteção de Dados, Imutabilidade e Conformidade no S3.",
    docsUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html",
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
        explanation:
          "Incorreta: A infraestrutura física (hardware, racks, cabos, geradores e instalações) é responsabilidade 100% da AWS (Segurança DA Nuvem).",
      },
      {
        id: "b",
        text: "Instalação de patches de segurança e atualizações no Sistema Operacional convidado (Guest OS) da instância.",
        explanation:
          "Correta: Como o EC2 é IaaS (Infrastructure as a Service), a AWS entrega a máquina virtual, mas a configuração, atualizações do SO convidado, firewalls internos e softwares instalados são de responsabilidade total do CLIENTE (Segurança NA Nuvem).",
      },
      {
        id: "c",
        text: "Segurança de perímetro físico das instalações da Zona de Disponibilidade.",
        explanation:
          "Incorreta: O controle de acesso biométrico, guardas e cercas dos data centers físicos é responsabilidade exclusiva da AWS.",
      },
      {
        id: "d",
        text: "Destruição segura e descarte de servidores físicos desativados.",
        explanation:
          "Incorreta: O descarte de mídia e servidores segue procedimentos rigorosos do DoD/NIST gerenciados exclusivamente pela AWS.",
      },
    ],
    correctOptionId: "b",
    explanation:
      "A AWS é responsável pela segurança 'DA' nuvem (hardware, data centers físicos, virtualização e infraestrutura global). O cliente é responsável pela segurança 'NA' nuvem (sistema operacional da instância EC2, regras de firewall/Security Groups, dados do cliente e IAM).",
    examReference: "CLF-C02: Domínio 2 — Modelo de Responsabilidade Compartilhada (Shared Responsibility Model).",
    docsUrl: "https://aws.amazon.com/compliance/shared-responsibility-model/",
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
        explanation:
          "Correta: IAM Roles fornecem credenciais temporárias gerenciadas automaticamente pelo AWS STS. Elas são rotacionadas periodicamente pela AWS, eliminando o risco de vazamento de chaves permanentes no código ou em instâncias.",
      },
      {
        id: "b",
        text: "Usar as credenciais da conta Root no arquivo de configuração da aplicação.",
        explanation:
          "Incorreta: A conta Root NUNCA deve ser usada para tarefas programáticas ou diárias. Essa é a violação de segurança mais severa na AWS.",
      },
      {
        id: "c",
        text: "Criar um usuário IAM administrativo e colar sua Access Key diretamente no repositório de código.",
        explanation:
          "Incorreta: Credenciais fixas hardcoded em código podem ser comprometidas em repositórios Git públicos ou logs, concedendo acesso indevido à sua conta.",
      },
      {
        id: "d",
        text: "Desativar temporariamente o firewall da instância EC2 para autorizar o tráfego.",
        explanation:
          "Incorreta: Firewalls e Security Groups controlam apenas portas e protocolos de rede TCP/UDP, não autenticação e autorização para APIs da AWS.",
      },
    ],
    correctOptionId: "a",
    explanation:
      "IAM Roles permitem que instâncias EC2 e funções Lambda obtenham credenciais temporárias de curto prazo rotacionadas automaticamente pelo serviço STS, eliminando a necessidade de hardcoding de chaves estáticas e seguindo o princípio do Menor Privilégio.",
    examReference: "CLF-C02: Domínio 2 — Gerenciamento de Identidade, IAM Roles e Práticas de Segurança.",
    docsUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html",
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
        explanation:
          "Correta: Cada Zona de Disponibilidade (AZ) é composta por um ou mais data centers físicos separados geograficamente por quilômetros de distância. Uma arquitetura Multi-AZ garante Alta Disponibilidade mesmo que uma AZ inteira fique offline.",
      },
      {
        id: "b",
        text: "Aumentar a memória e a CPU de uma única instância EC2 para suportar a carga de trabalho.",
        explanation:
          "Incorreta: Aumentar a capacidade de um único servidor é Escalabilidade Vertical (Scale Up). Se aquele servidor ou o data center físico onde ele reside falhar, a aplicação cairá 100%.",
      },
      {
        id: "c",
        text: "Utilizar uma única Edge Location do Amazon CloudFront para hospedar o banco de dados.",
        explanation:
          "Incorreta: Edge Locations são pontos de presença para cache de CDN, não executam bancos de dados relacionais transacionais como o Amazon RDS.",
      },
      {
        id: "d",
        text: "Comprar instâncias EC2 Reservadas em um único data center para garantir prioridade de hardware.",
        explanation:
          "Incorreta: Instâncias Reservadas são uma opção de desconto financeiro/faturamento, e não protegem contra falhas físicas se alocadas em uma única AZ.",
      },
    ],
    correctOptionId: "a",
    explanation:
      "Uma Região da AWS é composta por múltiplas Zonas de Disponibilidade (AZs) isoladas entre si, cada uma com alimentação elétrica, refrigeração e rede redundantes. A implantação em múltiplas AZs garante Alta Disponibilidade (High Availability) e Tolerância a Falhas contra a queda de um data center individual.",
    examReference: "CLF-C02: Domínio 1 — Infraestrutura Global da AWS e Tolerância a Falhas.",
    docsUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html",
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
        explanation:
          "Incorreta: Instâncias sob demanda pagam o valor de tabela cheio por segundo/hora, oferecendo flexibilidade sem compromisso, mas sem nenhum desconto.",
      },
      {
        id: "b",
        text: "Spot Instances",
        explanation:
          "Correta: As instâncias Spot vendem a capacidade ociosa de computação da AWS com descontos de até 90%. Caso a AWS precise dessa capacidade de volta, ela envia um aviso de 2 minutos antes de interromper a instância.",
      },
      {
        id: "c",
        text: "Dedicated Hosts",
        explanation:
          "Incorreta: Dedicated Hosts alocam um servidor físico inteiro exclusivo para sua empresa, sendo o modelo mais caro, tipicamente usado para licenças de software legado restritivas (BYOL).",
      },
      {
        id: "d",
        text: "Savings Plans de 3 anos",
        explanation:
          "Incorreta: Savings Plans oferecem até 72% de desconto em troca de um compromisso de consumo contínuo por 1 ou 3 anos, mas não chegam aos 90% das Spot Instances.",
      },
    ],
    correctOptionId: "b",
    explanation:
      "Instâncias Spot aproveitam a capacidade computacional ociosa da AWS com descontos de até 90%. Em contrapartida, a AWS pode recuperar a instância com um aviso prévio de 2 minutos se precisar da capacidade de volta, sendo ideal para workloads stateless e processamento batch.",
    examReference: "CLF-C02: Domínio 4 — Modelos de Compra e Otimização de Custos no EC2.",
    docsUrl: "https://aws.amazon.com/ec2/spot/",
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
        explanation:
          "Incorreta: Os servidores físicos continuam existindo nos data centers da AWS. A palavra 'serverless' significa que você não precisa gerenciá-los.",
      },
      {
        id: "b",
        text: "O cliente não gerencia, provisiona nem aplica patches em servidores, e a cobrança é baseada estritamente no consumo real.",
        explanation:
          "Correta: Na arquitetura Serverless, a AWS abstrai todo o gerenciamento de SO, dimensionamento automático e alta disponibilidade. Você só paga quando o código é executado ou requisições são processadas (sem custo por tempo ocioso).",
      },
      {
        id: "c",
        text: "O cliente deve configurar manualmente o sistema operacional Linux e instalar os drivers de rede.",
        explanation:
          "Incorreta: Isso descreve IaaS (como EC2). No Serverless, o usuário nunca tem acesso ao sistema operacional subjacente.",
      },
      {
        id: "d",
        text: "O serviço roda apenas durante o horário comercial de segunda a sexta-feira.",
        explanation:
          "Incorreta: Os serviços serverless da AWS operam 24 horas por dia, 7 dias por semana, com escalabilidade elástica instantânea sob demanda.",
      },
    ],
    correctOptionId: "b",
    explanation:
      "Na arquitetura Serverless, os servidores continuam existindo fisicamente na AWS, mas o cliente fica completamente abstraído de tarefas de infraestrutura: escalabilidade automática, tolerância a falhas e aplicação de patches são gerenciados pela AWS, sem custos por tempo ocioso.",
    examReference: "CLF-C02: Domínio 3 — Paradigma Serverless e Serviços Gerenciados da AWS.",
    docsUrl: "https://aws.amazon.com/serverless/",
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
        explanation:
          "Correta: O CloudFront é a CDN global da AWS que armazena cópias em cache do seu conteúdo estático e dinâmico em centenas de Edge Locations próximas aos usuários finais, reduzindo drasticamente a latência de trânsito internacional.",
      },
      {
        id: "b",
        text: "AWS Snowball Edge",
        explanation:
          "Incorreta: O Snowball Edge é um dispositivo físico de hardware para transporte de petabytes de dados offline para a nuvem, não um serviço de aceleração web.",
      },
      {
        id: "c",
        text: "AWS CloudTrail",
        explanation:
          "Incorreta: O CloudTrail é um serviço de auditoria e governança que registra chamadas de API feitas na sua conta da AWS, sem relação com cache de rede.",
      },
      {
        id: "d",
        text: "Amazon Elastic File System (EFS)",
        explanation:
          "Incorreta: O EFS é um sistema de arquivos compartilhado regional para instâncias EC2 e containers, não uma rede de distribuição global de conteúdo.",
      },
    ],
    correctOptionId: "a",
    explanation:
      "O Amazon CloudFront é a CDN (Content Delivery Network) da AWS. Ele distribui conteúdo usando uma rede global de centenas de Edge Locations, servindo o conteúdo em cache com a menor latência possível para o usuário final.",
    examReference: "CLF-C02: Domínio 3 — Rede de Distribuição Global, Edge Locations e CloudFront.",
    docsUrl: "https://aws.amazon.com/cloudfront/",
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
        explanation:
          "Correta: O AWS Budgets permite rastrear custos e uso de forma proativa. Você define um valor em dólares (ou uso) e configura alertas automáticos quando os custos reais ou as projeções estimadas atingirem limites como 80% ou 100%.",
      },
      {
        id: "b",
        text: "AWS Trusted Advisor (somente no plano básico)",
        explanation:
          "Incorreta: O plano básico do Trusted Advisor oferece apenas verificações de segurança e service limits essenciais, não permite definir orçamentos personalizados com alertas de projeção.",
      },
      {
        id: "c",
        text: "AWS Shield Standard",
        explanation:
          "Incorreta: O AWS Shield Standard é um serviço de proteção contra ataques DDoS na camada de rede (camadas 3 e 4), sem relação com orçamento financeiro.",
      },
      {
        id: "d",
        text: "Amazon Inspector",
        explanation:
          "Incorreta: O Inspector é uma ferramenta automatizada de avaliação de vulnerabilidades de segurança para instâncias EC2, imagens ECR e funções Lambda.",
      },
    ],
    correctOptionId: "a",
    explanation:
      "O AWS Budgets permite configurar orçamentos personalizados de custos e uso, enviando alertas em tempo real quando os limites forem atingidos ou quando as previsões matemáticas da AWS indicarem que o limite será ultrapassado no final do mês.",
    examReference: "CLF-C02: Domínio 4 — Faturamento, Alertas e Controle Orçamentário com AWS Budgets.",
    docsUrl: "https://aws.amazon.com/aws-cost-management/aws-budgets/",
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
        explanation:
          "Correta: O AWS Cost Explorer é a ferramenta analítica visual oficial para inspecionar até 12 meses de dados históricos de faturamento e projetar gastos para os próximos meses com base em aprendizado de máquina.",
      },
      {
        id: "b",
        text: "AWS Pricing Calculator",
        explanation:
          "Incorreta: O Pricing Calculator é uma calculadora web para estimar custos ANTES de criar os recursos na AWS, não analisa faturas de gastos reais já ocorridos.",
      },
      {
        id: "c",
        text: "AWS Artifact",
        explanation:
          "Incorreta: O AWS Artifact é o portal central de relatórios de auditoria e conformidade da AWS (como certificações SOC, PCI-DSS e ISO).",
      },
      {
        id: "d",
        text: "AWS Systems Manager",
        explanation:
          "Incorreta: O Systems Manager é uma central de operações para gerenciamento de frotas de instâncias EC2, automação de comandos e inventário de nós.",
      },
    ],
    correctOptionId: "a",
    explanation:
      "O AWS Cost Explorer fornece uma interface gráfica interativa para analisar gastos dos últimos meses e projetar faturas futuras. O AWS Pricing Calculator, por outro lado, é usado para estimar custos ANTES de criar os recursos.",
    examReference: "CLF-C02: Domínio 4 — Análise Financeira, Visualização de Custos e AWS Cost Explorer.",
    docsUrl: "https://aws.amazon.com/aws-cost-management/aws-cost-explorer/",
  },
];
