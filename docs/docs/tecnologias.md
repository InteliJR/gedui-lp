---
sidebar_position: 3
---

# ⚙️ Tecnologias

## 🗓 Informações Gerais

- **Nome do Projeto:** Refatoração e Modernização do Site Institucional Gedui

- **Tech Lead:** [Thiago Gomes]

- **Data de Entrada na Área:** [04/11/2025]

- **Data Estimada de Conclusão da Área:** [04/11/2025]


## Checklist de Entrada e Saída da Área de Tecnologia

### ✅ Checklist de Entrada

- [ ] Documento de Visão de Produto validado
- [ ] Protótipos de alta fidelidade aprovados
- [ ] Materiais de identidade visual disponíveis

### 📤 Checklist de Saída

- [ ] Stack definida e aprovada
- [ ] Diagrama de arquitetura completo
- [ ] Plano de implantação claro
- [ ] Documento validado com o time de Desenvolvimento

## Stack Tecnológica

### Frontend
- **Framework:** Next.js 14
- **Linguagem principal:** TypeScript
- **Estratégia de renderização:** Static Site Generation (SSG)
- **Ferramentas adicionais:** 
  - TailwindCSS para estilização
  - React Hook Form para formulários
  - Axios para requisições HTTP
- **Justificativa da escolha:**
  - Next.js com SSG garante performance máxima e SEO otimizado para landing page
  - TypeScript previne erros e melhora manutenibilidade
  - TailwindCSS acelera desenvolvimento com utility-first approach

### Backend (Sistema de Agendamento)
- **Arquitetura:** Serverless com AWS
- **Serviços principais:**
  - **API Gateway:** Exposição de endpoints REST
  - **Lambda Functions:** Lógica de negócio (Node.js/TypeScript)
  - **DynamoDB:** Banco de dados NoSQL para agendamentos
  - **SES (Simple Email Service):** Envio de notificações por email
  - **Cognito:** Autenticação do painel administrativo
- **Justificativa da escolha:**
  - Arquitetura serverless elimina gestão de servidores e reduz custos
  - Escalabilidade automática conforme demanda
  - Pay-per-use ideal para landing pages com tráfego variável
  - Integração nativa entre serviços AWS simplifica desenvolvimento

### Hospedagem e Deploy
- **Frontend:** AWS S3 + CloudFront (CDN)
- **Backend:** AWS Lambda + API Gateway
- **Domínio e DNS:** Route 53 ou Cloudflare
- **SSL/TLS:** AWS Certificate Manager (ACM)

### Outras Tecnologias
- **Internacionalização:** next-i18next (suporte a PT-BR, EN, ES)
- **Validação de dados:** Zod (TypeScript-first schema validation)
- **Monitoramento:** CloudWatch Logs e métricas
- **Versionamento:** Git + GitHub

## Arquitetura da Solução

### Visão Geral da Arquitetura

O projeto consiste em uma **landing page estática gerada com Next.js SSG** hospedada em S3/CloudFront para máxima performance, integrada a um **backend serverless AWS** para funcionalidades dinâmicas do sistema de agendamento.

**Componentes principais:**
- **Landing Page (Next.js SSG):** Páginas institucionais, blog e interface de agendamento
- **API Serverless (AWS Lambda):** Gestão de agendamentos, autenticação admin e notificações
- **Painel Admin (Next.js SSR):** Interface administrativa para gestão da agenda
- **Banco de Dados (DynamoDB):** Armazenamento de agendamentos e configurações

### Fluxo de Agendamento

**Cliente agendando demonstração:**
1. Cliente acessa landing page e visualiza calendário de horários disponíveis
2. Preenche formulário e confirma agendamento
3. Frontend chama API Gateway → Lambda processa e salva no DynamoDB
4. Lambda dispara SES enviando emails para cliente e equipe Gedui
5. Cliente recebe confirmação por email com detalhes e link de cancelamento

**Admin gerenciando agendamentos:**
1. Admin acessa painel protegido (autenticação via Cognito)
2. Visualiza agendamentos em calendário/lista (dados do DynamoDB via API)
3. Pode editar, cancelar ou marcar como realizado
4. Alterações disparam Lambda que envia emails de notificação via SES

### Diagrama da Arquitetura

```
┌──────────────────────────────────────────────────────────────┐
│                         USUÁRIOS                              │
└───────────────────┬──────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────────┐
│                 CloudFront CDN (HTTPS)                        │
│              • Cache global de assets                         │
│              • SSL/TLS automático                             │
└────────┬──────────────────────────────┬──────────────────────┘
         │                              │
         │ Landing Page                 │ Painel Admin
         ▼                              ▼
┌─────────────────────┐      ┌─────────────────────────────────┐
│   S3 Bucket         │      │   Next.js SSR (Admin Panel)     │
│   (Next.js SSG)     │      │   • Hospedado em Lambda/Vercel  │
│                     │      │   • Protegido por Cognito       │
│  • Páginas estáticas│      └─────────────┬───────────────────┘
│  • Blog posts       │                    │
│  • Assets otimizados│                    │
└─────────┬───────────┘                    │
          │                                │
          │ API calls                      │ API calls
          └────────────┬───────────────────┘
                       │
                       ▼
          ┌────────────────────────────────────────┐
          │      API Gateway (REST)                │
          │  • /agendamentos (GET, POST, PUT, DEL) │
          │  • /disponibilidade (GET)              │
          │  • /auth (POST)                        │
          └────────────┬───────────────────────────┘
                       │
                       ▼
          ┌────────────────────────────────────────┐
          │      Lambda Functions                  │
          │  ┌──────────────────────────────────┐  │
          │  │ • AgendarDemonstracaoHandler     │  │
          │  │ • ListarAgendamentosHandler      │  │
          │  │ • EditarAgendamentoHandler       │  │
          │  │ • EnviarNotificacaoHandler       │  │
          │  └──────────────────────────────────┘  │
          └─────┬──────────────────────┬───────────┘
                │                      │
                │ Leitura/Escrita      │ Dispara
                ▼                      ▼
     ┌────────────────────┐   ┌──────────────────┐
     │    DynamoDB        │   │   AWS SES        │
     │                    │   │                  │
     │  • Agendamentos    │   │  • Email cliente │
     │  • Configurações   │   │  • Email Gedui   │
     │  • Horários        │   │  • Templates     │
     └────────────────────┘   └──────────────────┘
              ▲
              │ Autenticação Admin
              │
     ┌────────────────────┐
     │   AWS Cognito      │
     │   • User Pool      │
     │   • JWT tokens     │
     └────────────────────┘
```

### Modelo de Dados (DynamoDB)

#### Tabela: Agendamentos

```typescript
{
  PK: "AGENDAMENTO#<UUID>",        // Partition Key
  SK: "METADATA",                  // Sort Key
  id: "uuid-v4",
  clienteNome: "João Silva",
  clienteEmail: "joao@empresa.com",
  clienteTelefone: "+55 11 99999-9999",
  clienteEmpresa: "Empresa XYZ",
  observacoes: "Interessado em plano EDU",
  dataHorario: "2025-11-15T14:00:00Z",  // ISO 8601
  status: "CONFIRMADO | CANCELADO | REALIZADO",
  segmento: "CORP | EDU",
  idioma: "pt-BR | en | es",
  criadoEm: "2025-11-04T10:30:00Z",
  atualizadoEm: "2025-11-04T10:30:00Z",
  notificacoesEnviadas: {
    confirmacaoCliente: true,
    notificacaoGedui: true,
    lembrete24h: false
  }
}
```

**Índices Secundários:**
- **GSI1:** `status-dataHorario-index` (para filtrar por status e ordenar por data)
- **GSI2:** `clienteEmail-criadoEm-index` (para buscar agendamentos por cliente)

#### Tabela: Configuracoes

```typescript
{
  PK: "CONFIG#HORARIOS",
  SK: "METADATA",
  diasSemana: {
    "segunda": { inicio: "09:00", fim: "18:00", intervalo: 60 },
    "terca": { inicio: "09:00", fim: "18:00", intervalo: 60 },
    // ...
  },
  horariosExcecao: [
    { data: "2025-12-25", motivo: "Feriado" }
  ],
  duracaoDemonstracao: 60,  // minutos
  atualizadoEm: "2025-11-04T10:30:00Z"
}
```

### Integração com Calendários Externos (Opcional)

**Abordagem Recomendada:** Sistema próprio conforme arquitetura descrita acima.

**Alternativa (se solicitado pelo cliente):**
O sistema pode ser adaptado para integração com serviços externos:
- **Google Calendar API:** Sincronização bidirecional de agendamentos
- **Calendly:** Embed do widget ou integração via API/Webhooks
- **Outlook Calendar:** Microsoft Graph API

**Considerações:**
- Integração com calendários externos adiciona complexidade e dependências
- Requer gestão de tokens OAuth e webhooks
- Sistema próprio oferece maior controle e customização
- Decisão final deve ser validada com o cliente após apresentação de ambas opções

## Estrutura de Implantação

### Ambiente de Desenvolvimento

**Variáveis de ambiente principais:**

```bash
# .env.local (Frontend)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENV=development

# AWS SDK (Backend local)
AWS_REGION=us-east-1
AWS_ENDPOINT_URL=http://localhost:4566  # LocalStack
DYNAMODB_TABLE_NAME=gedui-agendamentos-dev
SES_FROM_EMAIL=noreply@gedui.local
COGNITO_USER_POOL_ID=local-pool-id
```

### Ambiente de Produção

**URLs:**
- Landing Page: `https://gedui.com.br`
- API Backend: `https://api.gedui.com.br`
- Painel Admin: `https://admin.gedui.com.br`

**Estratégia de deploy:**
- **Frontend (S3 + CloudFront):** Deploy automático via GitHub Actions ao merge na branch `main`
- **Backend (Lambda):** Deploy via AWS SAM ou Serverless Framework com CI/CD
- **Invalidação de cache CloudFront automática após deploy**

**Infraestrutura AWS:**
- **Frontend:** S3 (bucket privado) + CloudFront (distribuição pública)
- **Backend:** API Gateway + Lambda Functions (Node.js 20.x runtime)
- **Banco:** DynamoDB (on-demand pricing)
- **Email:** SES (região us-east-1)
- **Autenticação:** Cognito User Pool
- **DNS:** Route 53 ou Cloudflare
- **Certificados SSL:** ACM (AWS Certificate Manager)

**Monitoramento:**
- **CloudWatch Logs:** Logs de Lambda e erros
- **CloudWatch Alarms:** Alertas para falhas e latência

### Diagrama de Implantação

**Desenvolvimento:**
```
┌────────────────────────────────────────┐
│   Máquina do Desenvolvedor             │
│  ┌──────────────────────────────────┐  │
│  │  Next.js Dev Server (port 3000)  │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

**Produção:**
```
┌────────────────────────────────────────────────┐
│              Route 53 / Cloudflare              │
│         gedui.com.br → CloudFront              │
└─────────────────┬──────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────────────┐
│          CloudFront (CDN Global)                 │
│          • SSL/TLS (ACM)                         │
│          • Cache de assets                       │
│          • GZIP/Brotli compression               │
└────┬──────────────────────────┬──────────────────┘
     │                          │
     │ Static files             │ API calls
     ▼                          ▼
┌──────────────┐     ┌─────────────────────────────┐
│  S3 Bucket   │     │   API Gateway (Regional)    │
│  (Private)   │     │   • REST API                │
│              │     │   • Throttling              │
│  • HTML/CSS  │     │   • API Keys                │
│  • JS bundles│     └──────────┬──────────────────┘
│  • Images    │                │
└──────────────┘                ▼
                    ┌─────────────────────────────┐
                    │  Lambda Functions (VPC?)    │
                    │  • Auto-scaling             │
                    │  • Timeout: 30s             │
                    │  • Memory: 512MB            │
                    └───┬──────────────┬──────────┘
                        │              │
                        ▼              ▼
              ┌────────────────┐  ┌──────────┐
              │   DynamoDB     │  │   SES    │
              │  • On-demand   │  │          │
              │  • Encryption  │  └──────────┘
              │  • Backups     │
              └────────────────┘
```

## Considerações de Segurança

**Políticas de CORS:**
- API Gateway configurado para aceitar requests apenas de `gedui.com.br`, `admin.gedui.com.br` e localhost (dev)
- Headers CORS apropriados configurados no API Gateway

**Proteção de dados sensíveis:**
- **Dados em trânsito:** HTTPS obrigatório (CloudFront + ACM)
- **Dados em repouso:** DynamoDB com encryption at rest habilitada
- **Emails:** Nunca expor endereços completos no frontend, usar mascaramento se necessário
- **Logs:** Nunca logar informações sensíveis (telefones, emails completos)

**Gestão de segredos:**
- **Desenvolvimento:** Variáveis de ambiente em `.env.local` (não versionado)
- **Produção:** AWS Systems Manager Parameter Store ou Secrets Manager
- **API Keys:** Rotação periódica recomendada

**Autenticação e autorização:**
- **Painel Admin:** Cognito User Pool com MFA recomendado
- **API:** JWT tokens validados por Lambda Authorizer
- **Público (landing page):** Sem autenticação, apenas rate limiting

**Rate Limiting:**
- API Gateway configurado com throttling: 1000 req/s burst, 500 req/s steady state
- Endpoint de agendamento: 10 req/min por IP para prevenir spam

**Validação de Entrada:**
- Validação rigorosa com Zod em todos os endpoints
- Sanitização de inputs para prevenir XSS
- DynamoDB previne SQL injection por natureza (NoSQL)

**Headers de Segurança:**
- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

**Backup e Recuperação:**
- DynamoDB Point-in-Time Recovery (PITR) habilitado
- Backup automático diário para S3
- Plano de disaster recovery documentado

---

## Próximos Passos

1. **Validar stack com o cliente** (especialmente decisão sobre calendário próprio vs. integração externa)
2. **Configurar repositório** e estrutura de pastas
3. **Setup de ambiente AWS** (contas, IAM roles, serviços)
4. **Implementar CI/CD pipeline**
5. **Iniciar desenvolvimento** após aprovação de protótipos