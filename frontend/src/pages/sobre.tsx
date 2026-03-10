// src/pages/sobre.tsx
import SEO from "@/components/common/SEO";
import Layout from "@/components/common/Layout";
import CTA from "@/components/homepage/CTA";

export default function Sobre() {
  return (
    <>
      <SEO
        title="Sobre a Gedui | Nossa História e Missão"
        description="Conheça a história da Gedui e nossa missão de transformar a educação através da tecnologia. Valores, equipe e compromisso com a excelência."
        keywords="sobre gedui, história, missão, valores, educação, tecnologia"
        image="/og-image-sobre.png"
      />

      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-sky-50 to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transformando a educação através da tecnologia
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Nossa missão é empoderar instituições de ensino com ferramentas
              que facilitam a gestão e melhoram a experiência educacional.
            </p>
          </div>
        </section>

        {/* História */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Nossa História
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p>
                A Gedui nasceu da observação de um problema comum em
                instituições de ensino: a dificuldade de gerenciar processos
                educacionais de forma eficiente e integrada.
              </p>
              <p>
                Em 2020, nossa equipe de educadores e desenvolvedores se uniu
                com o objetivo de criar uma plataforma que realmente atendesse
                às necessidades das instituições, desde pequenas escolas até
                grandes universidades.
              </p>
              <p>
                Hoje, com mais de 500 instituições parceiras e 50 mil alunos
                ativos, continuamos evoluindo nossa plataforma para oferecer a
                melhor experiência educacional possível.
              </p>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🎯",
                  title: "Foco no Cliente",
                  description:
                    "Suas necessidades guiam nossas decisões e desenvolvimento.",
                },
                {
                  icon: "💡",
                  title: "Inovação Contínua",
                  description:
                    "Sempre buscamos as melhores soluções e tecnologias.",
                },
                {
                  icon: "🤝",
                  title: "Parceria",
                  description:
                    "Crescemos junto com nossos clientes, como verdadeiros parceiros.",
                },
              ].map((valor, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-sm text-center"
                >
                  <div className="text-5xl mb-4">{valor.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {valor.title}
                  </h3>
                  <p className="text-gray-600">{valor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Números */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Gedui em Números
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "500+", label: "Instituições Parceiras" },
                { number: "50k+", label: "Alunos Ativos" },
                { number: "98%", label: "Satisfação" },
                { number: "24/7", label: "Suporte" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-sky-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTA variant="simple" />
      </Layout>
    </>
  );
}
