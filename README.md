# 🛡️ Forja de Software — Portfolio Fullstack & Cloud Infrastructure

[![Live Demo](https://img.shields.io/badge/Production-weriton.dev-amber?style=for-the-badge&logo=googlechrome&logoColor=white)](https://weriton.dev)
[![CI/CD Pipeline](https://img.shields.io/github/actions/workflow/status/weritonpetreca/portfolio/deploy.yml?branch=main&style=for-the-badge&logo=githubactions&logoColor=white&label=Deploy%20AWS)](https://github.com/weritonpetreca/portfolio/actions/workflows/deploy.yml)
[![AWS Serverless](https://img.shields.io/badge/AWS-Serverless_ARM64-orange?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)
[![React](https://img.shields.io/badge/React_19.2-Vite_8.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![DevSecOps](https://img.shields.io/badge/Security-OIDC_Zero_Keys-emerald?style=for-the-badge&logo=githubactions&logoColor=white)](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)

> **"Dogfooding de Engenharia de Software:"** Este repositório não abriga apenas uma página estática de apresentação, mas um **sistema fullstack cloud-native em produção**, projetado, testado e implantado com **DevSecOps, Infraestrutura como Código (IaC) Multi-Ambiente, Arquitetura Serverless na AWS e Observabilidade**.

---

## 📌 Visão Geral & Filosofia de Engenharia

Este repositório contém o código-fonte aberto do portfólio profissional de **Weriton Petreca** ([weriton.dev](https://weriton.dev)). O objetivo arquitetural é demonstrar, na própria infraestrutura que serve o portfólio, as mesmas práticas de engenharia aplicadas em sistemas corporativos de missão crítica:

* **Arquitetura Desacoplada (Edge SPA + Serverless API):** Frontend em React 19 + TypeScript distribuído globalmente via CDN em múltiplas camadas (**Cloudflare Edge ➔ AWS CloudFront ➔ Amazon S3 privado com OAC**), consumindo um microsserviço serverless isolado (**API Gateway HTTP API v2 ➔ AWS Lambda ARM64 ➔ Amazon SES**).
* **Segurança Zero-Trust (OIDC Sem Chaves Estáticas):** Autenticação entre GitHub Actions e AWS realizada exclusivamente via **OpenID Connect (`AssumeRoleWithWebIdentity`)** com tokens efêmeros. Nenhuma credencial de longa duração (`AWS_ACCESS_KEY_ID`) existe no GitHub.
* **Defesa em Profundidade no Backend de Contato:**
  1. **Throttling na Borda:** Rate limiting nativo no API Gateway HTTP API (`ThrottlingRateLimit: 2 req/s`, `BurstLimit: 5`).
  2. **Cloudflare Turnstile (Server-Side Siteverify):** Validação criptográfica do token de desafio no backend Python com extração prioritária do IP real via cabeçalho `CF-Connecting-IP`.
  3. **Honeypot & Time-Trap Tolerante a Clock Skew:** Bots que preenchem campos ocultos (`website_hp`) ou submetem o formulário em tempo inumano (`0 <= elapsed_ms < 2500ms`) recebem *Silent Drop* (`200 OK` sintético sem acionar o Amazon SES), protegendo a reputação do domínio e a cota da AWS sem penalizar usuários legítimos com relógio local adiantado.
  4. **Prevenção contra Header Injection & Memory DoS:** Limite estrito de payload (`10 KB` em bytes UTF-8), suporte a decodificação `isBase64Encoded` e sanitização de quebras de linha (`\r\n`) nos cabeçalhos do e-mail.
* **Separação de Produtos via Feature Flags (`Fail-Closed`):** A integração com o ecossistema externo **Cloudwardens** (`cloudwardens.weriton.dev`, mantido em repositório privado dedicado) é governada em tempo de build por `VITE_ENABLE_CLOUDWARDENS` (`false` por padrão em Produção, exibindo o selo *🚧 Em Desenvolvimento · Em Breve*, e `true` em Staging).

---

## 🏗️ Arquitetura do Sistema

O **weriton.dev** combina distribuição estática na borda com computação serverless sob demanda na AWS:

![Arquitetura do Sistema - weriton.dev](./docs/img/architecture.png)

### ⚖️ Decisões de Arquitetura & Trade-offs (ADRs)

| Decisão Técnica | Alternativa Considerada | Por que esta abordagem foi escolhida? |
| :--- | :--- | :--- |
| **AWS Lambda Python 3.12 em ARM64 (Graviton2)** | Containers (ECS/Fargate) ou Lambda x86_64 | Tráfego de formulário de portfólio é esparso (*spiky*). Lambda em Graviton2 oferece **custo zero em ociosidade (Scale-to-Zero)**, cold start sub-segundo em Python 3.12 e custo/performance ~20% melhor que x86. |
| **Condicional `IsProd` na Identidade SES (`template.yaml`)** | Criar `AWS::SES::EmailIdentity` em todas as stacks | No Amazon SES, uma identidade de e-mail verificada é um *singleton* por conta/região. A condição `IsProd` permite que a stack `staging` coexista na mesma conta AWS reutilizando a ARN da identidade SES sem colisão no CloudFormation. |
| **3 Camadas de Cache S3 (`immutable` vs `stale-while-revalidate` vs `must-revalidate`)** | `must-revalidate` para todos os arquivos | Bundles Vite com hash no nome (`assets/*`) nunca mudam de conteúdo (cache de 1 ano). Imagens progressivas (`images/*`) usam cache de 7 dias com revalidação em background. Apenas `index.html` exige revalidação imediata, reduzindo latência (LCP) e tráfego de origem. |
| **Estabilidade Referencial no Turnstile (`useRef` Latest Ref Pattern)** | Passar callbacks inline diretamente no `useEffect` | Em React, callbacks inline mudam de referência a cada tecla digitada no formulário pai. Isolar `onVerify`, `onExpire` e `onError` em `useRef` impede que o iframe da Cloudflare seja destruído e recarregado durante a digitação. |

---

## 🛠️ Tech Stack & Qualidade

### **Frontend & Experiência do Usuário (`frontend/`)**
* **Core:** React 19.2, TypeScript 6.0 (Strict Mode), Vite 8.1.
* **Roteamento & SEO:** React Router v7, `react-helmet-async` (Metadados dinâmicos, Open Graph, Twitter Cards, `canonical`, `noindex` em rotas 404 e Schema.org `Person` JSON-LD).
* **Estilização & UI:** Tailwind CSS v4.3 (`@theme` tokens nativos), Motion 12.42, Canvas HTML5 2D para partículas atmosféricas (`EmbersCanvas`).
* **Acessibilidade (WCAG 2.2 AA) & Performance:**
  * *Focus Trap* de teclado (`Tab` / `Shift+Tab` / `Escape`) e restauração automática de foco no modal LGPD (`PrivacyModal.tsx`).
  * Respeito nativo à diretiva de sistema `prefers-reduced-motion: reduce` nas animações e efeitos de inclinação 3D.
  * ScrollSpy de navegação ativa com indicador luminoso (`aria-current="location"`), barra superior de progresso de leitura e botão flutuante `BackToTopButton` com anel SVG dinâmico.
  * Imagens de fundo otimizadas em JPEG progressivo (redução de 83% no peso total de imagem) e desativação de `background-attachment: fixed` em telas mobile (`bg-scroll md:bg-fixed`) para eliminar gargalos de repintura de GPU no iOS Safari.
* **Testes & Linter:** Vitest 4.1, React Testing Library (`12/12` testes passando) e Oxlint 1.72 (Linter em Rust com `0` avisos/erros).

### **Backend Serverless de Contato (`backend-contact/`)**
* **Runtime & IaC:** Python 3.12 (`arm64`), AWS SAM (`template.yaml` + `samconfig.toml` parametrizado para `staging` e `prod`), CloudFormation Bootstrap (`infra/bootstrap/template.yaml`).
* **Serviços AWS:** AWS Lambda (com AWS X-Ray Active Tracing), Amazon API Gateway HTTP API v2 (CORS na borda + Throttling), Amazon SES, AWS Systems Manager (SSM Parameter Store).
* **Testes & DevSecOps:** Pytest + `pytest-mock` (`14/14` testes unitários cobrindo fluxos de sucesso, payload nulo, Base64, Honeypot, Time-Trap, Clock Skew, Turnstile e falhas do SES), Bandit (SAST) e Flake8.

---

## 🚀 Pipeline CI/CD Multi-Ambiente (GitHub Actions)

A esteira de entrega contínua ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) é dividida em 3 jobs encadeados (`deploy-bootstrap` ➔ `deploy-backend` ➔ `deploy-frontend`) e suporta execução automática por branch (`main` e `staging`) ou disparo manual (`workflow_dispatch`):

![Pipeline DevSecOps - GitHub Actions](./docs/img/pipeline.png)

1. **`deploy-bootstrap`:** Resolve dinamicamente o ambiente alvo (`prod` na `main` com `VITE_ENABLE_CLOUDWARDENS=false`; `staging` com `VITE_ENABLE_CLOUDWARDENS=true`), autentica via AWS OIDC e garante a existência da stack de fundação (`portfolio-bootstrap`: Bucket S3 de artefatos com encriptação AES-256, bloqueio público e ciclo de vida FinOps de 7 dias).
2. **`deploy-backend`:** Executa os *Quality Gates* de Python (**Flake8**, **Bandit SAST** e **Pytest**), compila o pacote serverless via `sam build` e implanta a stack CloudFormation correspondente (`portfolio-backend-contact` em Produção ou `portfolio-backend-contact-staging` em Homologação), exportando a URL do HTTP API no SSM Parameter Store.
3. **`deploy-frontend`:** Lê o endpoint da API diretamente do SSM Parameter Store, executa os *Quality Gates* de Node.js (**NPM Audit**, **Oxlint** e **Vitest**), gera o bundle otimizado de produção com Vite, realiza o sync em 3 camadas de cache no Amazon S3 e invalida automaticamente as bordas do **AWS CloudFront** e da **Cloudflare**.

---

## 📂 Estrutura do Repositório

```text
.
├── .github/
│   └── workflows/
│       ├── deploy.yml                  # Pipeline CI/CD Multi-Ambiente (staging / prod)
│       └── destroy.yml                 # Workflow para teardown seletivo de stacks AWS
├── backend-contact/                    # Microsserviço Serverless de Contato (AWS SAM + Python)
│   ├── events/
│   │   └── event.json                  # Evento sintético para testes locais (API Gateway v2)
│   ├── src/
│   │   └── app.py                      # Handler Lambda em Python 3.12 (Graviton2 ARM64)
│   ├── tests/
│   │   └── test_handler.py             # Suíte de testes unitários e de segurança (14 testes Pytest)
│   ├── env.json                        # Template de variáveis para execução com SAM Local
│   ├── pytest.ini                      # Configuração de paths do Pytest
│   ├── requirements.txt                # Dependências de runtime (boto3)
│   ├── samconfig.toml                  # Perfis de deploy multi-ambiente (staging / prod)
│   └── template.yaml                   # Infraestrutura como Código (HTTP API, Lambda, SES, SSM)
├── docs/
│   └── img/                            # Diagramas de arquitetura e pipeline CI/CD
├── frontend/                           # Aplicação SPA (React 19 + TypeScript 6 + Vite 8)
│   ├── public/                         # Assets estáticos, ícones, sitemap, manifesto e imagens otimizadas
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/                 # Header (ScrollSpy + Progress Bar), Footer, Seo, ScrollToTop
│   │   │   └── ui/                     # BackToTopButton, Button, Divider, EmbersCanvas, PrivacyModal, TurnstileWidget
│   │   ├── data/
│   │   │   └── projects.ts             # Catálogo tipado de projetos, métricas e fluxos de arquitetura
│   │   ├── lib/
│   │   │   ├── config.ts               # Resolução de Feature Flags e URLs externas (Fail-Closed)
│   │   │   └── contact.ts              # Cliente HTTP tipado para a API de Contato
│   │   ├── pages/
│   │   │   ├── professional/           # Página Profissional e suas 8 seções (Hero + Etapas I a VII)
│   │   │   └── NotFoundPage.tsx        # Página 404 customizada com diretiva SEO noindex
│   │   ├── styles/
│   │   │   └── index.css               # Design System (@theme) em Tailwind CSS v4
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── router.tsx                  # Roteamento declarativo da aplicação
│   ├── tests/                          # Suíte de testes automatizados (Vitest + Testing Library)
│   ├── .env.example                    # Exemplo documentado de variáveis de ambiente
│   ├── index.html                      # Entrypoint HTML com metadados SEO, Open Graph e JSON-LD
│   ├── package.json
│   └── vite.config.ts
├── infra/
│   └── bootstrap/
│       └── template.yaml               # Stack CloudFormation de Fundação (S3 Artifacts & SSM)
├── .gitattributes                      # Normalização estrita de quebras de linha (LF)
├── .gitignore
└── README.md
```

---

## 🧪 Como Executar e Testar Localmente

### **Pré-requisitos**
* **Node.js** `24.x` ou superior
* **Python** `3.12.x` ou superior
* **AWS SAM CLI & Docker** *(opcional, apenas para invocar a função Lambda localmente via container)*

### **1. Frontend (Desenvolvimento, Linter e Testes)**

```bash
# Clone o repositório
git clone https://github.com/weritonpetreca/portfolio.git
cd portfolio/frontend

# Instale as dependências de forma determinística
npm ci

# Inicie o servidor de desenvolvimento (http://localhost:5173)
npm run dev

# Execute a análise estática (Oxlint) e os testes automatizados (Vitest)
npm run lint
npm run test
```

### **2. Backend Serverless de Contato (Testes Unitários)**

```bash
cd ../backend-contact

# Crie e ative um ambiente virtual Python (caso ainda não possua)
python3 -m venv .venv
source .venv/bin/activate

# Instale as dependências de runtime e teste
pip install -r requirements.txt
pip install pytest pytest-mock bandit flake8

# Execute a suíte de testes unitários e o scanner de segurança SAST
pytest -v
bandit -r src/ --severity-level high
```

---

## ✉️ Contato & Redes Profissionais

* **Portfólio em Produção:** [weriton.dev](https://weriton.dev)
* **LinkedIn:** [linkedin.com/in/weriton-petreca](https://linkedin.com/in/weriton-petreca)
* **GitHub:** [github.com/weritonpetreca](https://github.com/weritonpetreca)
* **Credly (Certificações Oficiais):** [credly.com/users/weriton-luis-petreca](https://www.credly.com/users/weriton-luis-petreca)
* **WhatsApp:** [Iniciar conversa](https://wa.me/5535997231989?text=Ol%C3%A1%20Weriton,%20vi%20seu%20portf%C3%B3lio!)
