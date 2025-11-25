// src/components/sections/Testimonials.tsx

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "O Gedui transformou completamente a forma como gerenciamos nossos cursos. A plataforma é intuitiva e os alunos adoram!",
      author: "Maria Silva",
      role: "Diretora Acadêmica",
      company: "Instituto Educacional ABC",
      avatar: "👩‍💼",
    },
    {
      quote:
        "Implementamos o Gedui e vimos um aumento de 40% no engajamento dos alunos. Os relatórios são incríveis.",
      author: "João Santos",
      role: "Coordenador de TI",
      company: "Universidade XYZ",
      avatar: "👨‍💻",
    },
    {
      quote:
        "A integração com nossas ferramentas existentes foi perfeita. O suporte técnico é excepcional.",
      author: "Ana Costa",
      role: "Gerente de Projetos",
      company: "Escola Moderna",
      avatar: "👩‍🏫",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Instituições de ensino em todo o país confiam no Gedui
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:border-sky-200 transition-colors"
            >
              {/* Quote */}
              <div className="mb-6">
                <svg
                  className="w-10 h-10 text-sky-500 mb-4"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                </svg>
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-6">
            Confiado por mais de 500 instituições
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {/* Placeholder para logos de clientes */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center"
              >
                <span className="text-gray-400 text-xs">Logo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
