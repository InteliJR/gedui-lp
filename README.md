# 📘 Gedui Landing Page

Refatoração completa do site institucional da Gedui com nova identidade visual e integração com Calendly para agendamento automatizado de demonstrações.

**Cliente:** Gedui - Ecossistema Educacional  
**Setor:** EdTech / Educação Corporativa

🔗 **[Acessar Site](https://gedui.com.br)** | 📚 **[Documentação Completa](https://intelijr.github.io/gedui-lp/)**

---

## 🚀 Tecnologias

### Frontend

- **Next.js 14** (Pages Router) - Framework React com SSG
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização utility-first
- **React Hook Form** - Gerenciamento de formulários
- **next-i18next** - Internacionalização (PT-BR, EN, ES)
- **React Calendly** - Integração de agendamentos

### Infraestrutura (AWS)

- **S3 + CloudFront** - Hospedagem e CDN global
- **Route 53** - DNS
- **Certificate Manager** - SSL/TLS
- **CloudWatch** - Monitoramento

### Sistema de Agendamento

- **Calendly** (Plano Free)
  - Widget inline e popup
  - Integração com Google Calendar
  - Notificações automáticas

---

## 🛠️ Como Rodar

### Pré-requisitos

- Node.js 20.x ou superior
- npm ou yarn

### Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/inteli-junior/gedui-lp.git
cd gedui-lp/frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:3000`

### Build para Produção

```bash
# Gerar build estático otimizado
npm run build

# Exportar para deploy (SSG)
npm run export
```

Arquivos estáticos serão gerados em `/out`

---

## 🗂️ Estrutura do Projeto

```
gedui-lp/
├── .github/
│   └── workflows/
│       ├── deploy_docusaurus.yml    # Deploy da documentação
│       └── restrict_prs.yml         # Controle de PRs
│
├── docs/                            # Documentação (Docusaurus)
│   ├── intro.md
│   ├── visao-produto.md
│   ├── design.md
│   ├── tecnologias.md
│   └── desenvolvimento.md
│
└── frontend/                        # Aplicação Next.js
    ├── public/
    │   ├── favicon.ico
    │   ├── robots.txt
    │   └── sitemap.xml
    │
    └── src/
        ├── components/
        │   ├── common/              # Componentes reutilizáveis
        │   │   ├── SEO.tsx          # Meta tags e SEO
        │   │   ├── OrganizationSchema.tsx
        │   │   ├── Layout.tsx       # Header + Footer wrapper
        │   │   ├── Header.tsx
        │   │   └── Footer.tsx
        │   │
        │   └── sections/            # Seções da landing page
        │       ├── Hero.tsx
        │       ├── Recursos.tsx
        │       ├── Depoimentos.tsx
        │       ├── BlogPreview.tsx
        │       └── CTA.tsx
        │
        ├── pages/                   # Rotas (Pages Router)
        │   ├── index.tsx            # Homepage
        │   ├── sobre.tsx            # Página Sobre
        │   ├── recursos.tsx         # Página Recursos
        │   ├── contato.tsx          # Página Contato
        │   ├── _app.tsx             # App wrapper
        │   ├── _document.tsx        # Document config
        │   │
        │   └── blog/                # Blog
        │       ├── index.tsx        # Lista de posts
        │       └── [slug].tsx       # Post individual
        │
        └── styles/
            └── globals.css          # Estilos globais
```

---

## 🌐 Variáveis de Ambiente

Crie `.env.local` na pasta `frontend/`:

```bash
# Site URL
NEXT_PUBLIC_SITE_URL=https://gedui.com.br

# Calendly
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/gedui/demonstracao

# Analytics (opcional)
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX

# Ambiente
NEXT_PUBLIC_ENV=production
```

**⚠️ Importante:** Nunca exponha credenciais AWS no frontend. Use apenas em CI/CD.

---

## 📄 Páginas Disponíveis

- `/` - Homepage
- `/sobre` - Institucional
- `/recursos` - Funcionalidades
- `/contato` - Formulário de contato
- `/blog` - Lista de posts
- `/blog/[slug]` - Post individual

---

## 🎨 Customização

### Adicionar Nova Página

1. Criar arquivo em `src/pages/nome-da-pagina.tsx`
2. Usar o template padrão:

```tsx
import SEO from "@/components/common/SEO";
import Layout from "@/components/common/Layout";

export default function NovaPagina() {
  return (
    <>
      <SEO
        title="Título | Gedui"
        description="Descrição de 150-160 caracteres"
        keywords="palavra1, palavra2"
      />
      <Layout>
        <section className="py-20">{/* Conteúdo */}</section>
      </Layout>
    </>
  );
}
```

### Modificar Cores

Editar `tailwind.config.ts` ou variáveis CSS em `globals.css`

### Integrar Calendly

```tsx
import { InlineWidget } from "react-calendly";

<InlineWidget
  url="https://calendly.com/gedui/demo"
  styles={{ height: "700px" }}
/>;
```

---

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificar código
npm run type-check   # Verificar tipos TypeScript
```

---

## 📊 SEO e Performance

### Implementado

- ✅ Meta tags otimizadas (Open Graph, Twitter Cards)
- ✅ Schema.org (Organization, WebPage, Article)
- ✅ Sitemap.xml e robots.txt
- ✅ SSG (Static Site Generation) para máxima performance
- ✅ Imagens otimizadas
- ✅ Canonical URLs

### Validar

- [Schema Validator](https://validator.schema.org/)
- [Open Graph Debugger](https://www.opengraph.xyz/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 🚀 Deploy

### Automático (GitHub Actions)

Push para `main` → Deploy automático para AWS S3 + CloudFront

### Manual

```bash
cd frontend
npm run build
npm run export

# Fazer upload da pasta /out para S3
aws s3 sync out/ s3://seu-bucket --delete
aws cloudfront create-invalidation --distribution-id SEU_ID --paths "/*"
```

---

## 📚 Documentação Adicional

A documentação técnica completa está disponível em:  
**[intelijr.github.io/gedui-lp](https://intelijr.github.io/gedui-lp/)**

Inclui:

- Visão de Produto
- Design System
- Arquitetura e Tecnologias
- Guia de Desenvolvimento

---

## 👥 Time do Projeto

Conheça quem participou do desenvolvimento deste projeto:

- **[Nome do Designer]** - UI/UX Designer  
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/usuario1)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/usuario1)

- **[Nome do Dev Frontend]** - Desenvolvedor Frontend  
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/usuario2)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/usuario2)

- **[Nome do Tech Lead]** - Tech Lead / DevOps  
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/usuario3)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/usuario3)

