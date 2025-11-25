// src/components/sections/Features.tsx

export default function Features() {
  const features = [
    {
      icon: "📚",
      title: "Gestão de Cursos",
      description:
        "Crie, organize e gerencie cursos com facilidade. Estruture trilhas de aprendizado personalizadas.",
    },
    {
      icon: "👥",
      title: "Portal do Aluno",
      description:
        "Interface intuitiva para alunos acompanharem seu progresso, acessarem materiais e interagirem.",
    },
    {
      icon: "📊",
      title: "Analytics Avançado",
      description:
        "Dashboards completos com insights sobre desempenho, engajamento e resultados de aprendizado.",
    },
    {
      icon: "🎯",
      title: "Avaliações Inteligentes",
      description:
        "Criação de provas, quizzes e atividades com correção automática e feedback personalizado.",
    },
    {
      icon: "💬",
      title: "Comunicação Integrada",
      description:
        "Chat, fóruns e notificações para manter toda a comunidade educacional conectada.",
    },
    {
      icon: "🔗",
      title: "Integrações",
      description:
        "Conecte-se com as principais ferramentas do mercado: Zoom, Google Workspace, Microsoft 365.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tudo que você precisa em uma plataforma
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Recursos completos para transformar a experiência educacional da sua
            instituição
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/recursos"
            className="inline-block text-sky-600 font-semibold hover:text-sky-700 transition-colors"
          >
            Ver todos os recursos →
          </a>
        </div>
      </div>
    </section>
  );
}
