# 🛡️ Forja de Software — Portfolio Fullstack & Cloud Infrastructure

[![Live Demo](https://img.shields.io/badge/Production-weriton.dev-amber?style=for-the-badge&logo=googlechrome&logoColor=white)](https://weriton.dev)
[![AWS Serverless](https://img.shields.io/badge/AWS-Serverless-orange?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![React](https://img.shields.io/badge/React_19-Vite_6-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![DevSecOps](https://img.shields.io/badge/Security-OIDC_Zero_Keys-emerald?style=for-the-badge&logo=githubactions&logoColor=white)](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)

> **"Dogfooding de Engenharia de Software:"** Este não é apenas um site estático de apresentação, mas um **produto cloud-native em produção**, projetado e implantado seguindo princípios rígidos de **DevSecOps, Infraestrutura como Código (IaC), Arquitetura Serverless e Alta Disponibilidade na AWS**.

---

## 📌 Visão Geral & Filosofia de Design

O repositório abriga a aplicação **Fullstack & Serverless** do portfólio de **Weriton Petreca** ([weriton.dev](https://weriton.dev)). O projeto foi concebido para resolver o problema comum de "portfólios vitrine" sem profundidade técnica, transformando a própria plataforma de apresentação em um **estudo de caso vivo** de arquitetura de software, resiliência e entrega contínua.

### 🎯 Destaques Arquiteturais
* **Arquitetura Desacoplada (Decoupled SPA + Serverless API):** Frontend React superleve servido globalmente via edge locations (CloudFront + S3), consumindo uma API Serverless isolada para eventos de contato.
* **Segurança Zero-Trust / Zero Fixed Keys:** Autenticação entre GitHub Actions e AWS realizada exclusivamente via **AWS OIDC (OpenID Connect)**. Nenhuma chave de acesso fixa (`AWS_ACCESS_KEY_ID`) vive no repositório.
* **Dual-Persona & Identidade Isolada:** Suporte a duas rotas com identidades visuais e temáticas completamente isoladas através de encapsulamento CSS e SEO dinâmico (`/` para a persona Profissional DevSecOps e `/witcher-realm` para a extensão experimental).
* **SEO Industrial & Open Graph:** Injeção dinâmica de Metadados, Open Graph Cards, Twitter Cards, Favicons dinâmicos alternados por rota e Dados Estruturados em **JSON-LD (Schema.org)** para autoridade no Google.

---

## 🏗️ Arquitetura do Sistema

O **weriton.dev** segue uma arquitetura desacoplada e *serverless-first*, combinando a entrega global de assets estáticos com microsserviços sob demanda na AWS:

![Arquitetura do Sistema - weriton.dev](./docs/img/architecture.png)

---

## 🛠️ Tech Stack & Ferramentas

### **Frontend & UX**
* **Core:** React 19, TypeScript, Vite.
* **Roteamento & SEO:** React Router v7, `react-helmet-async` (Injeção de Metadados e JSON-LD em tempo de execução).
* **Estilização & Design System:** Tailwind CSS v4, Fontes Google (IBM Plex Sans/Mono, Cinzel, Spectral).
* **Testes & Qualidade:** Vitest, Testing Library, ESLint, Prettier.

### **Backend Serverless**
* **Runtime:** Python 3.12 executado em arquitetura **ARM64 (AWS Graviton)** para otimização de custo/performance.
* **Framework IaC:** AWS SAM (Serverless Application Model) / CloudFormation.
* **Serviços AWS:** AWS Lambda, Amazon API Gateway, Amazon SES, AWS SSM Parameter Store.
* **Testes Backend:** Pytest, `pytest-mock`, Boto3 mock.

### **DevSecOps & CI/CD**
* **CI/CD Orchestrator:** GitHub Actions (Pipeline multi-job resiliente).
* **Autenticação Cloud:** AWS OIDC (OpenID Connect) para assunção de Roles temporárias.
* **Estratégia de Cache:** Revalidação seletiva S3/CloudFront com invalidação automática de edge cache (`/*`).

---

## 🚀 Pipeline CI/CD (GitHub Actions)

A esteira de entrega contínua é dividida em **3 Jobs encadeados**, garantindo que nenhum código quebre em produção e que os artefatos de infraestrutura sejam versionados com segurança:

A implantação contínua é automatizada via **GitHub Actions** em uma pipeline de 3 estágios sequenciais com garantias automatizadas de qualidade:

![Pipeline DevSecOps - GitHub Actions](./docs/img/pipeline.png)

### **Políticas de Cache do S3:**
1. **Static Assets (`dist/assets/*`):** `max-age=31536000, immutable` (Aproveitamento total da CDN).
2. **Entrypoints (`index.html`, `robots.txt`, `sitemap.xml`):** `max-age=0, no-cache, no-store, must-revalidate` (Garante que novos deploys sejam refletidos instantaneamente para os usuários).

---

## 📂 Estrutura do Repositório

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml            # Pipeline CI/CD completa (Bootstrap, SAM, Frontend)
├── backend-contact/              # Microserviço Serverless de Contato (AWS SAM + Python)
│   ├── src/                      # Código-fonte da função Lambda
│   ├── tests/                    # Testes unitários com Pytest
│   ├── template.yaml             # Definição de Infraestrutura Serverless (SAM)
│   └── samconfig.toml            # Configurações do ambiente de deploy SAM
├── infra/                        # Stacks globais de Infraestrutura como Código
│   └── bootstrap/                # Template CloudFormation para SSM e S3 de artefatos
├── public/                       # Assets estáticos globais (Favicons dinâmicos, OG-Images, PDF CV)
│   ├── favicon.ico               # Favicon principal (Monograma Forja W)
│   ├── witcher-favicon.ico       # Favicon dinâmico (Rota /witcher-realm)
│   ├── og-image.png              # Open Graph Card (1200x630) para redes sociais
│   ├── robots.txt                # Diretivas de indexação para bots
│   └── sitemap.xml               # Mapeamento canônico de URLs
├── src/                          # Código-fonte do Frontend (React + TypeScript)
│   ├── components/               # Componentes UI reutilizáveis (Header, Footer, Cards, Form)
│   ├── layout/                   # Layouts e componente dinâmico <Seo/>
│   ├── pages/                    # Rotas da aplicação (Professional & Witcher Realm)
│   └── lib/                      # Utilitários de comunicação com a API REST
└── package.json                  # Scripts e dependências do projeto
```

---

## 🧪 Como Rodar o Projeto Localmente

### **Pré-requisitos**
* Node.js `24.x` ou superior
* Python `3.12.x` (para o backend local)
* AWS SAM CLI & Docker (opcional, para emular Lambda localmente)

### **1. Executando o Frontend**

```bash
# Clone o repositório
git clone https://github.com/weritonpetreca/portfolio.git
cd portfolio

# Instale as dependências
npm ci

# Execute o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no seu navegador.

### **2. Executando Testes Unitários**

```bash
# Testes do Frontend (Vitest)
npm run test

# Testes do Backend (Pytest)
cd backend-contact
pytest
```

---

## 🛡️ Práticas de Segurança Implementadas

* **Princípio do Menor Privilégio (IAM Roles):** As roles temporárias do GitHub Actions possuem permissões estritamente limitadas para os buckets e stacks necessárias.
* **CORS Rígido:** A API do formulário de contato aceita requisições unicamente originadas do domínio oficial `[https://weriton.dev](https://weriton.dev)`.
* **Sanitização & Validação de Input:** Validação de payload tanto no frontend (max length, limites de caracteres e regex) quanto no backend Python antes do disparo via SES.
* **Headers de Segurança CloudFront:** Aplicação de cabeçalhos de segurança contra XSS, Clickjacking e MIME Sniffing.

---

## ✉️ Contato & Redes Profissionais

* **Portfólio em Produção:** [weriton.dev](https://weriton.dev)
* **LinkedIn:** [linkedin.com/in/weriton-petreca](https://linkedin.com/in/weriton-petreca)
* **Credly (Certificações):** [credly.com/users/weriton-luis-petreca](https://www.credly.com/users/weriton-luis-petreca)
* **WhatsApp:** [Enviar mensagem](https://wa.me/5535997231989?text=Ol%C3%A1%20Weriton,%20vi%20seu%20portf%C3%B3lio!)

---

<p align="center">
  <sub>Forjado com orgulho usando React, TypeScript, AWS Serverless e princípios DevSecOps. © 2026 Weriton Petreca.</sub>
</p>