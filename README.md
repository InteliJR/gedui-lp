# 📘 Gedui Landing Page

Refatoração completa do site institucional da Gedui, aplicando nova identidade visual e implementando sistema automatizado de agendamento de demonstrações. Projeto desenvolvido para modernizar a presença digital da empresa no setor de educação corporativa e tecnologia educacional.

**Cliente:** Gedui - Ecossistema Educacional  
**Setor:** EdTech / Educação Corporativa

Acesse a solução por meio deste [🔗 Link](https://gedui.com.br)

---

## 📄 Documentação

A documentação completa do projeto pode ser acessada através do link abaixo:  

**[📚 Documentação do Projeto](https://intelijr.github.io/gedui-lp/)**

> A documentação é mantida utilizando o [Docusaurus](https://docusaurus.io/). Para informações sobre como configurar e manter a documentação, consulte o [guia de configuração](./docs/README.md).

---

## 🚀 Tecnologias Utilizadas

### Frontend
- Next.js 14
- TypeScript
- TailwindCSS
- Framer Motion
- React Hook Form
- next-i18next

### Backend (Serverless)
- AWS Lambda
- API Gateway
- DynamoDB
- SES (Simple Email Service)
- Cognito

### Infraestrutura
- AWS S3
- CloudFront
- Route 53
- Certificate Manager

### Ferramentas
- Figma
- GitHub Actions
- Zod

---

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
- Node.js 20.x ou superior
- npm ou yarn
- Conta AWS configurada (para backend)

### Desenvolvimento Local (Frontend)

```bash
# Clone o repositório
git clone https://github.com/inteli-junior/gedui-lp.git

# Acesse o diretório do projeto
cd gedui-lp

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas credenciais

# Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:3000`

### Build para Produção (SSG)

```bash
# Gerar build estático otimizado
npm run build

# Testar o build localmente
npm run start
```

Arquivos estáticos serão gerados em `/out` (Next.js export)

### Deploy na AWS

> ⚠️ **Todo o deploy é feito via AWS Console (interface gráfica)**

#### 1. Deploy do Frontend (S3 + CloudFront)

1. **Build do projeto localmente:**
   ```bash
   npm run build
   ```
   Arquivos estáticos serão gerados na pasta `/out`

2. **Upload para S3 via Console:**
   - Acesse o AWS Console → S3
   - Navegue até o bucket `gedui-site-bucket`
   - Clique em "Upload" e selecione todos os arquivos da pasta `/out`
   - Aguarde conclusão do upload

3. **Invalidar cache do CloudFront:**
   - Acesse AWS Console → CloudFront
   - Selecione a distribuição do site
   - Vá em "Invalidations" → "Create Invalidation"
   - Digite `/*` no campo de paths
   - Confirme a invalidação

#### 2. Deploy do Backend (Lambda + API Gateway)

> ⚠️ **Nota:** O backend é gerenciado via AWS Console. Não há necessidade de rodar localmente.

**Configuração via AWS Console:**

1. **DynamoDB:** Criar tabela `gedui-agendamentos` conforme schema na documentação
2. **Lambda:** Fazer upload das funções via Console ou AWS CLI
3. **API Gateway:** Configurar endpoints REST apontando para as Lambdas
4. **SES:** Verificar domínio e configurar templates de email
5. **Cognito:** Criar User Pool para autenticação do painel admin

---

## 🗂️ Estrutura de Diretórios

```bash
.
├── .github/                       # Configurações de CI/CD e workflows
│   └── workflows/
│       └── deploy.yml             # GitHub Actions para deploy automático
│
├── backend/                       # Código backend (Lambdas)
│   ├── src/
│   │   ├── handlers/              # Lambda handlers
│   │   │   ├── agendamento.ts
│   │   │   ├── notificacao.ts
│   │   │   └── auth.ts
│   │   ├── services/              # Lógica de negócio
│   │   └── utils/                 # Utilidades e helpers
│   ├── template.yaml              # AWS SAM template (opcional)
│   └── package.json
│
├── public/                        # Assets estáticos
│   ├── images/
│   ├── fonts/
│   └── locales/                   # Traduções (PT-BR, EN, ES)
│
├── src/                           # Código fonte frontend
│   ├── app/                       # App Router (Next.js 14)
│   │   ├── [locale]/              # Rotas internacionalizadas
│   │   │   ├── page.tsx           # Home
│   │   │   ├── corp/              # Páginas CORP
│   │   │   ├── edu/               # Páginas EDU
│   │   │   ├── blog/              # Blog
│   │   │   └── agendar/           # Sistema de agendamento
│   │   └── admin/                 # Painel administrativo
│   ├── components/                # Componentes React
│   │   ├── ui/                    # Componentes de UI reutilizáveis
│   │   ├── layout/                # Header, Footer, Navigation
│   │   └── calendar/              # Componentes do calendário
│   ├── lib/                       # Utilitários e configurações
│   │   ├── api.ts                 # Cliente API
│   │   ├── aws.ts                 # Configurações AWS
│   │   └── validations.ts         # Schemas Zod
│   ├── styles/                    # Estilos globais
│   └── types/                     # TypeScript types
│
├── docs/                          # Documentação Docusaurus
│   ├── docs/
│   │   ├── visao-produto.md       # Visão de Produto
│   │   ├── design.md              # Design
│   │   ├── tecnologias.md         # Arquitetura e Tecnologias
│   │   └── desenvolvimento.md     # Guia de Desenvolvimento
│   └── docusaurus.config.js
│
├── .env.example                   # Exemplo de variáveis de ambiente
├── .gitignore                     # Arquivos ignorados pelo Git
├── next.config.js                 # Configuração Next.js
├── tailwind.config.js             # Configuração TailwindCSS
├── tsconfig.json                  # Configuração TypeScript
├── package.json
└── README.md                      # Este documento
```

---

## 🌐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
# API Backend
NEXT_PUBLIC_API_URL=https://api.gedui.com.br

# Site URL
NEXT_PUBLIC_SITE_URL=https://gedui.com.br

# AWS (não expor no frontend - apenas para build/deploy)
AWS_REGION=us-east-1
AWS_S3_BUCKET=gedui-site-bucket
AWS_CLOUDFRONT_DISTRIBUTION_ID=EDISTRIBUTION123

# Ambiente
NEXT_PUBLIC_ENV=production
```

---

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build e Deploy
npm run build            # Gera build otimizado para produção (SSG)
npm run start            # Testa o build localmente
npm run export           # Exporta site estático para /out

# Qualidade de Código
npm run lint             # Executa ESLint
npm run type-check       # Verifica tipos TypeScript
npm run format           # Formata código com Prettier

# Testes
npm run test             # Executa testes unitários
npm run test:e2e         # Executa testes E2E com Playwright
```

---

## 🎨 Design System

O projeto utiliza a nova identidade visual da Gedui com:
- **Paleta de cores:** Definida nos materiais de marca
- **Tipografia:** Fontes da identidade corporativa
- **Componentes:** Sistema de design documentado no Figma

**Acesso ao Figma:** [Link para o projeto no Figma]

---

## 🔐 Acesso ao Painel Admin

O painel administrativo está disponível em `/admin` e requer autenticação via AWS Cognito.

**URL:** `https://gedui.com.br/admin`

Para criar novos usuários administradores:
```bash
aws cognito-idp admin-create-user \
  --user-pool-id us-east-1_XXXXXXXXX \
  --username admin@gedui.com.br \
  --temporary-password TempPass123! \
  --user-attributes Name=email,Value=admin@gedui.com.br
```

---

## 👥 Time do Projeto

Conheça quem participou do desenvolvimento deste projeto:

- **[Nome do Designer]** (UI/UX Designer)  
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/usuario2)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/usuario2)

- **[Nome do Dev Frontend]** (Desenvolvedor Frontend)  
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/usuario3)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/usuario3)

- **[Nome do Dev Backend]** (Desenvolvedor Backend/AWS)  
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/usuario4)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/usuario4)

---

## 📝 Licença

Este projeto foi desenvolvido pela [Inteli Júnior](https://intelijr.com.br) para a Gedui.  
Todos os direitos reservados © 2025 Gedui.

