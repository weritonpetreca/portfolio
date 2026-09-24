import type { Card, CardSynergy } from "./types";

export const CLOUDWARDENS_SYNERGIES: CardSynergy[] = [
  {
    id: "synergy-reactive-serverless",
    name: "Arquitetura Reativa Serverless",
    requiredTags: ["serverless", "database"],
    description: "Autômatos e o Livro Negro operam em milissegundos sem servidores ociosos.",
    bonusPower: 4,
    bonusDefense: 2,
    bonusEther: 1,
  },
  {
    id: "synergy-edge-cache",
    name: "Bastião da Borda Acelerada",
    requiredTags: ["storage", "edge"],
    description: "O Cofre protegido pelo Manto Veloz distribui réplicas ultrarrápidas pelo mundo.",
    bonusPower: 3,
    bonusDefense: 5,
    healFortress: 2,
  },
  {
    id: "synergy-zero-trust",
    name: "Muralha do Menor Privilégio",
    requiredTags: ["security", "compute"],
    description: "Sentinelas armados apenas com as credenciais estritamente necessárias para a missão.",
    bonusPower: 2,
    bonusDefense: 6,
    bonusEther: 1,
  },
  {
    id: "synergy-elastic-scale",
    name: "Elasticidade Híbrida da Guilda",
    requiredTags: ["compute", "serverless"],
    description: "Cargas pesadas sustentadas por sentinelas com picos absorvidos pela forja instantânea.",
    bonusPower: 5,
    bonusDefense: 2,
    healFortress: 3,
  },
  {
    id: "synergy-resilient-messaging",
    name: "Desacoplamento por Mensageria",
    requiredTags: ["messaging", "compute"],
    description: "Filas de mensageiros absorvem rajadas súbitas sem sobrecarregar a infraestrutura.",
    bonusPower: 4,
    bonusDefense: 4,
    bonusEther: 2,
  },
];

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
    level: 1,
    synergyTags: ["storage"],
    runeSymbol: "ᛞ", // Ingwaz: Proteção e armazenamento
    flavorText:
      "Forjado nas montanhas mais altas do Domínio de Âmbar, este cofre preserva manuscritos com 11 noves de durabilidade imutável.",
    technicalExplanation:
      "Armazenamento de objetos escalável para dados não estruturados com 99.999999999% (11 9s) de durabilidade e suporte nativo a Object Lock, versionamento e criptografia KMS.",
    examTip:
      "Dica CLF-C02: O Amazon S3 armazena objetos (arquivos) em Buckets com chaves e metadados. Não é um sistema de arquivos de blocos (como EBS) nem relacional (como RDS).",
    counters: ["anomaly-data-loss"],
    artPrompt:
      "A colossal, impenetrable stone and obsidian vault carved into a misty alpine mountain summit, glowing golden runic inscriptions etched on iron doors, ancient dwarven lock mechanisms, atmospheric storm clouds parting with divine amber sunlight, highly detailed dark fantasy oil painting style, cinematic composition, intricate textures, 8k resolution, trending on ArtStation",
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
    level: 1,
    synergyTags: ["serverless", "compute"],
    runeSymbol: "ᚦ", // Thurisaz: Força de ataque reativa
    flavorText:
      "Autômatos arcanos que despertam em fração de segundo quando um sinal é emitido, cumprindo sua missão e retornando ao pó sem cobrar pelo tempo de repouso.",
    technicalExplanation:
      "Serviço de computação orientada a eventos (FaaS). Executa código em resposta a gatilhos sem provisionamento ou gerenciamento de servidores, com cobrança estrita por milissegundo de execução.",
    examTip:
      "Dica CLF-C02: O AWS Lambda é o pilar serverless da AWS. O usuário é responsável apenas pelo código e configurações; a AWS cuida do patch de SO, escalabilidade e infraestrutura.",
    counters: ["anomaly-traffic-spike"],
    artPrompt:
      "An arcane clockwork forge deep inside a crystalline cavern, mechanical brass and iron automatons assembling themselves spontaneously from fiery runic sigils, cyan and amber energy sparks, volumetric steam and embers, dark fantasy gothic aesthetic, dramatic rim lighting, intricate gears, Masterpiece digital oil painting",
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
    level: 1,
    synergyTags: ["compute"],
    runeSymbol: "ᛏ", // Tiwaz: O guerreiro em guarda
    flavorText:
      "Um guerreiro de armadura pesada com controle total sobre suas lâminas, sistema de batalha e porte de carga. Permanece de prontidão dia e noite.",
    technicalExplanation:
      "Capacidade computacional segura e redimensionável na nuvem (IaaS). Concede controle completo de nível de sistema operacional (Linux/Windows), memória, CPU e armazenamento acoplado.",
    examTip:
      "Dica CLF-C02: Instâncias EC2 possuem modelos de compra cruciais para a prova: On-Demand (sem fidelidade), Reserved Instances / Savings Plans (desconto de até 72% por 1 ou 3 anos) e Spot Instances (desconto de até 90% para cargas tolerantes a interrupção).",
    counters: ["anomaly-spof"],
    artPrompt:
      "A towering sentinel knight in blackened gothic plate armor standing guard atop a stone fortress rampart overlooking a vast kingdom, glowing runic visor, wielding a broadsword infused with elemental lightning, atmospheric fog and embers, epic medieval dark fantasy art, photorealistic texture, Frank Frazetta inspired lighting",
  },
  {
    id: "guardian-dynamodb",
    name: "O Livro Negro de Nomes",
    awsService: "Amazon DynamoDB",
    serviceCategory: "Banco de Dados NoSQL",
    domain: "technology",
    type: "guardian",
    rarity: "epic",
    power: 8,
    defense: 7,
    energyCost: 3,
    level: 1,
    synergyTags: ["database", "serverless"],
    runeSymbol: "ᚨ", // Ansuz: Sabedoria e registros
    flavorText:
      "Um tomo arcano que encontra qualquer registro entre bilhões de nomes em tempo de um piscar de olhos, independentemente do tamanho da biblioteca.",
    technicalExplanation:
      "Banco de dados NoSQL de chave-valor e documentos gerenciado e totalmente serverless. Oferece desempenho consistente de milissegundos de um dígito em qualquer escala com replicação Multi-AZ automática.",
    examTip:
      "Dica CLF-C02: DynamoDB é NoSQL e chave-valor (Key-Value/Document). Se a questão do exame exigir ACID relacional com joins SQL complexos, a resposta costuma ser Amazon RDS ou Aurora.",
    counters: ["anomaly-dead-letters"],
    artPrompt:
      "A massive mystical tome floating above a stone pedestal in an ancient library, pages made of shimmering black obsidian parchment covered with lightning-fast glowing golden runes, crackling electric arcane aura, dark fantasy grimoire, cinematic depth of field, hyperdetailed",
  },
  {
    id: "guardian-cloudfront",
    name: "O Manto dos Portais Rápidos",
    awsService: "Amazon CloudFront",
    serviceCategory: "Rede de Entrega de Conteúdo (CDN)",
    domain: "technology",
    type: "guardian",
    rarity: "rare",
    power: 7,
    defense: 9,
    energyCost: 2,
    level: 1,
    synergyTags: ["edge", "networking"],
    runeSymbol: "ᛖ", // Ehwaz: Movimento e velocidade
    flavorText:
      "Uma rede invisível de espelhos e portais espalhados pelas fronteiras do continente, entregando mensagens quase instantaneamente a quem as pede.",
    technicalExplanation:
      "Content Delivery Network (CDN) global e seguro. Faz cache de conteúdos estáticos e dinâmicos em centenas de Edge Locations ao redor do mundo, reduzindo a latência e protegendo a origem.",
    examTip:
      "Dica CLF-C02: O CloudFront utiliza Edge Locations da infraestrutura global da AWS para armazenar em cache o conteúdo próximo dos usuários finais, integrando-se nativamente com AWS Shield contra ataques DDoS.",
    counters: ["anomaly-traffic-spike"],
    artPrompt:
      "A spectral archmage in midnight-blue hooded robes weaving a network of glowing speed portals across a continental map, arcane ley lines connecting distant watchtowers at lightspeed, twilight sky, mystical particle trails, cinematic fantasy concept art",
  },
  {
    id: "guardian-iam",
    name: "O Selo das Chaves Reais",
    awsService: "AWS IAM",
    serviceCategory: "Segurança & Identidade",
    domain: "security",
    type: "guardian",
    rarity: "legendary",
    power: 9,
    defense: 10,
    energyCost: 4,
    level: 1,
    synergyTags: ["security"],
    runeSymbol: "ᛉ", // Algiz: Proteção suprema e santuário
    flavorText:
      "Ninguém adentra as câmaras do rei sem portar o selo exato de sua função. Quem não é esperado, não tem permissão para sequer tocar a maçaneta.",
    technicalExplanation:
      "AWS Identity and Access Management. Gerencia usuários, grupos, papéis (Roles) e políticas JSON com base no princípio do Menor Privilégio (Least Privilege), autenticação multifator (MFA) e controle granular.",
    examTip:
      "Dica CLF-C02: Nunca use o usuário Root no dia a dia. Crie usuários e Roles IAM específicos. O IAM é um serviço global (não requer seleção de região) e é gratuito.",
    counters: ["anomaly-root-breach"],
    artPrompt:
      "A solemn inquisitor paladin holding a glowing golden sovereign key and a heavy ceremonial wax seal, surrounded by floating runic lockets that open only for the worthy, gothic vaulted cathedral interior, shafts of stained-glass light, highly detailed medieval illustration",
  },
  {
    id: "guardian-sqs",
    name: "O Mensageiro das Sombras",
    awsService: "Amazon SQS",
    serviceCategory: "Mensageria e Filas",
    domain: "technology",
    type: "guardian",
    rarity: "rare",
    power: 6,
    defense: 9,
    energyCost: 2,
    level: 1,
    synergyTags: ["messaging", "serverless"],
    runeSymbol: "ᚱ", // Raidho: Mensageiro e jornada
    flavorText:
      "Um correio encapuzado que guarda mensagens em bolsas encantadas. Se o destinatário estiver ocupado, as cartas aguardam em segurança sem jamais se perderem.",
    technicalExplanation:
      "Serviço de enfileiramento de mensagens distribuído e totalmente gerenciado. Desacopla componentes de aplicações distribuídas, garantindo que picos de requisições não derrubem sistemas downstream.",
    examTip:
      "Dica CLF-C02: O Amazon SQS desacopla sistemas e garante que mensagens fiquem retidas até serem processadas. Filas padrão oferecem throughput ilimitado; Filas FIFO garantem ordem estrita.",
    counters: ["anomaly-dead-letters", "anomaly-traffic-spike"],
    artPrompt:
      "A mysterious hooded courier walking through a moonlit gothic alleyway carrying an enchanted satchel overflowing with glowing wax-sealed missives, dark fantasy atmosphere, misty cobblestones, eerie lantern light",
  },

  // ==========================================
  // ANOMALIAS DA NUVEM (Vulnerabilidades e Falhas)
  // ==========================================
  {
    id: "anomaly-spof",
    name: "O Gargalo Fatal",
    awsService: "Ponto Único de Falha (SPOF)",
    serviceCategory: "Falha de Arquitetura",
    domain: "cloud-concepts",
    type: "anomaly",
    rarity: "rare",
    power: 7,
    defense: 6,
    energyCost: 3,
    level: 1,
    runeSymbol: "ᚻ", // Hagalaz: Ruína e granizo
    flavorText:
      "Uma ponte estreita sustentada por uma única pilastra de calcário desgastada. Quando ela quebrar, todo o reino ficará isolado no abismo.",
    technicalExplanation:
      "Single Point of Failure (SPOF). Ocorre quando um sistema depende de um componente individual sem redundância. Se este componente falhar, o serviço inteiro entra em indisponibilidade.",
    examTip:
      "Dica CLF-C02: Para eliminar SPOFs na AWS, utilize arquiteturas Multi-AZ com Elastic Load Balancers (ALB/NLB) e Auto Scaling Groups distribuídos geograficamente.",
    weakness: "guardian-ec2",
    artPrompt:
      "A crumbling medieval stone bridge spanning a terrifying chasm with a single cracked keystone trembling under immense weight, ominous ravens circling, dark stormy sky, impending structural collapse, gothic dark fantasy landscape",
  },
  {
    id: "anomaly-root-breach",
    name: "O Olho Invasor da Coroa",
    awsService: "Exposição de Usuário Root",
    serviceCategory: "Violação de Segurança",
    domain: "security",
    type: "anomaly",
    rarity: "legendary",
    power: 10,
    defense: 8,
    energyCost: 4,
    level: 1,
    runeSymbol: "ᚾ", // Nauthiz: Necessidade e risco iminente
    flavorText:
      "Um espião mascarado que roubou a coroa do imperador e seus carimbos sagrados. Ele tem poder de decretar a dissolução de todas as províncias.",
    technicalExplanation:
      "Comprometimento das credenciais do AWS Root Account. O usuário Root possui acesso irrestrito a todos os recursos e dados de faturamento, tornando sua violação um desastre absoluto.",
    examTip:
      "Dica CLF-C02: As melhores práticas da AWS exigem: bloquear o Root com MFA físico/virtual, nunca criar Access Keys para o Root e utilizar usuários IAM ou IAM Identity Center para tarefas diárias.",
    weakness: "guardian-iam",
    artPrompt:
      "A shadowy ghostly thief hand picking a royal throne room vault lock with a glowing skeleton key, venomous purple mist creeping on marble floors, crimson moonlight through high arched windows, dark fantasy suspense",
  },
  {
    id: "anomaly-traffic-spike",
    name: "A Maré Devoradora de Tráfego",
    awsService: "Pico Inesperado de Requisições / DDoS",
    serviceCategory: "Gargalo de Disponibilidade",
    domain: "technology",
    type: "anomaly",
    rarity: "epic",
    power: 8,
    defense: 7,
    energyCost: 3,
    level: 1,
    runeSymbol: "ᛁ", // Isa: Estagnação por sobrecarga
    flavorText:
      "Centenas de milhares de viajantes batem aos portões da cidade no mesmo minuto. Sem pontes largas e guardas adicionais, os portões arrebentarão.",
    technicalExplanation:
      "Sobrecarga de tráfego volumétrico ou ataque de negação de serviço (DDoS). Esgota sockets de rede, conexões de banco de dados e CPU dos servidores centrais.",
    examTip:
      "Dica CLF-C02: A AWS combate picos e DDoS combinando Amazon CloudFront (absorve requisições na borda), AWS Shield (proteção DDoS gerenciada) e AWS WAF (filtragem de tráfego web malicioso).",
    weakness: "guardian-cloudfront",
    artPrompt:
      "A colossal tidal wave made of shadowy swarming wraiths crashing violently against a coastal cliffside fortress, foaming sea, apocalyptic stormy sky, dark fantasy epic warfare",
  },
  {
    id: "anomaly-bill-spike",
    name: "O Dreno Oculto do Tesouro",
    awsService: "Custos Descontrolados em Nuvem",
    serviceCategory: "Gargalo Financeiro",
    domain: "billing",
    type: "anomaly",
    rarity: "rare",
    power: 6,
    defense: 6,
    energyCost: 2,
    level: 1,
    runeSymbol: "ᛃ", // Jera: Ciclos e colheitas (ou perdas)
    flavorText:
      "Uma fissura invisível no chão do cofre por onde escorrem moedas de ouro sem parar. Apenas no fim do mês o tesoureiro descobre que os cofres estão vazios.",
    technicalExplanation:
      "Consumo não planejado de recursos de nuvem (ex: instâncias superdimensionadas ociosas, snapshots esquecidos, egress de dados desnecessário).",
    examTip:
      "Dica CLF-C02: Utilize o AWS Cost Explorer para analisar tendências históricas, AWS Budgets para configurar alertas proativos antes que a conta estoure, e AWS Cost Anomaly Detection baseado em ML.",
    weakness: "guardian-ec2",
    artPrompt:
      "A demonic goblin-like treasure leech siphoning gold coins from an ornate chest with an insatiable mouth, scattered rubies, dark damp dungeon vault, glowing avaricious yellow eyes, dark fantasy creature art",
  },
  {
    id: "anomaly-dead-letters",
    name: "A Fila das Mensagens Esquecidas",
    awsService: "Dead Letter Queue / Mensagens Corrompidas",
    serviceCategory: "Falha de Processamento",
    domain: "technology",
    type: "anomaly",
    rarity: "common",
    power: 5,
    defense: 7,
    energyCost: 2,
    level: 1,
    runeSymbol: "ᛈ", // Perthro: O enigma oculto
    flavorText:
      "Milhares de cartas enviadas para destinatários inexistentes empilham-se nas agências dos correios até que os mensageiros não consigam mais trabalhar.",
    technicalExplanation:
      "Mensagens venenosas (poison pills) que causam erro fatal nos consumidores repetidamente, bloqueando a fila de processamento sem Dead-Letter Queue (DLQ).",
    examTip:
      "Dica CLF-C02: O Amazon SQS suporta Dead-Letter Queues (DLQ) para isolar mensagens que falharam no processamento após um número máximo de tentativas (maxReceiveCount), permitindo análise sem perda de dados.",
    weakness: "guardian-dynamodb",
    artPrompt:
      "A forgotten dungeon catacomb filled with piles of glowing wax-sealed parchment letters tangled in spectral cobwebs, ghostly lanterns, somber melancholy atmosphere, dark fantasy illustration",
  },
  {
    id: "anomaly-data-loss",
    name: "O Abismo do Esquecimento",
    awsService: "Perda de Dados por Falta de Backup/Replicação",
    serviceCategory: "Catástrofe de Armazenamento",
    domain: "technology",
    type: "anomaly",
    rarity: "epic",
    power: 9,
    defense: 8,
    energyCost: 4,
    level: 1,
    runeSymbol: "ᚲ", // Kaunan: Chama devoradora
    flavorText:
      "Um incêndio arcanamente ateado consome o único tomo existente de leis da cidade. Nenhum duplicado jamais havia sido escrito.",
    technicalExplanation:
      "Falha catastrófica de integridade decorrente de ausência de backups periódicos, falta de versionamento e inexistência de replicação entre regiões (Cross-Region Replication).",
    examTip:
      "Dica CLF-C02: O AWS Backup centraliza e automatiza a proteção de dados em múltiplos serviços (EBS, RDS, S3, DynamoDB, EFS) em conformidade com RTO e RPO corporativos.",
    weakness: "guardian-s3",
    artPrompt:
      "A terrifying cosmic abyss tearing open inside an ancient library, sucking crumbling scrolls and books into an endless void of black holes and violet cosmic dust, apocalyptic dark fantasy",
  },
];
