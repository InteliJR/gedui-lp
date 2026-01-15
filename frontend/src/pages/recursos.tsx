// src/pages/recursos.tsx
import SEO from "@/components/common/SEO";
import Layout from "@/components/common/Layout";
import CTA from "@/components/homepage/CTA";

export default function Recursos() {
  const recursos = [
    {
      categoria: "Gestão Acadêmica",
      items: [
        {
          icon: "📚",
          title: "Gestão de Cursos",
          description:
            "Crie e organize cursos, trilhas de aprendizado e conteúdos estruturados.",
        },
        {
          icon: "📝",
          title: "Avaliações Inteligentes",
          description:
            "Provas, quizzes e atividades com correção automática e feedback personalizado.",
        },
        {
          icon: "📊",
          title: "Relatórios Completos",
          description:
            "Dashboards com insights sobre desempenho e engajamento dos alunos.",
        },
      ],
    },
    {
      categoria: "Portal do Aluno",
      items: [
        {
          icon: "👤",
          title: "Perfil Personalizado",
          description:
            "Interface intuitiva para alunos acompanharem seu progresso de aprendizado.",
        },
        {
          icon: "🎓",
          title: "Certificados Digitais",
          description:
            "Emissão automática de certificados ao completar cursos e trilhas.",
        },
        {
          icon: "📱",
          title: "App Mobile",
          description:
            "Acesse conteúdos e aulas em qualquer lugar, a qualquer momento.",
        },
      ],
    },
    {
      categoria: "Comunicação",
      items: [
        {
          icon: "💬",
          title: "Chat Integrado",
          description:
            "Comunicação em tempo real entre alunos, professores e administração.",
        },
        {
          icon: "📧",
          title: "Notificações",
          description:
            "Sistema inteligente de notificações por email, SMS e push.",
        },
        {
          icon: "🗣️",
          title: "Fóruns de Discussão",
          description:
            "Espaços colaborativos para debates e compartilhamento de conhecimento.",
        },
      ],
    },
    {
      categoria: "Integrações",
      items: [
        {
          icon: "🎥",
          title: "Videoconferência",
          description:
            "Integração nativa com Zoom, Google Meet e Microsoft Teams.",
        },
        {
          icon: "☁️",
          title: "Cloud Storage",
          description: "Conecte-se com Google Drive, OneDrive e Dropbox.",
        },
        {
          icon: "🔗",
          title: "API Completa",
          description:
            "Integre com seus sistemas existentes através de nossa API REST.",
        },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Recursos e Funcionalidades | Gedui"
        description="Conheça todos os recursos da plataforma Gedui: gestão de cursos, portal do aluno, avaliações, relatórios, integrações e muito mais."
        keywords="recursos gedui, funcionalidades, gestão de cursos, LMS, plataforma educacional"
        image="/og-image-recursos.png"
      />

      <Layout>
        {/* Hero */}
        <section className="bg-gradient-to-br from-sky-50 to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Recursos Completos para sua Instituição
            </h1>
            <p className="text-xl text-gray-700">
              Tudo que você precisa para oferecer experiências educacionais de
              excelência
            </p>
          </div>
        </section>

        {/* Recursos por Categoria */}
        {recursos.map((categoria, idx) => (
          <section
            key={idx}
            className={idx % 2 === 0 ? "py-20 bg-white" : "py-20 bg-gray-50"}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                {categoria.categoria}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categoria.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA Final */}
        <CTA />
      </Layout>
    </>
  );
}
