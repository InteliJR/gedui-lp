// src/components/sections/BlogPreview.tsx
import Link from "next/link";

export default function BlogPreview() {
  // Dados mockados - posteriormente virão de CMS ou API
  const posts = [
    {
      slug: "tendencias-educacao-2025",
      title: "10 Tendências em Educação para 2025",
      excerpt:
        "Descubra as principais inovações que estão transformando o setor educacional e prepare sua instituição para o futuro.",
      date: "2025-11-20",
      category: "Tendências",
      readTime: "5 min",
      image: "📈",
    },
    {
      slug: "como-aumentar-engajamento",
      title: "Como Aumentar o Engajamento dos Alunos em EAD",
      excerpt:
        "Estratégias comprovadas para manter seus alunos motivados e participativos no ambiente de ensino a distância.",
      date: "2025-11-18",
      category: "Dicas",
      readTime: "7 min",
      image: "🎯",
    },
    {
      slug: "guia-transformacao-digital",
      title: "Guia Completo para Transformação Digital na Educação",
      excerpt:
        "Um passo a passo prático para modernizar sua instituição de ensino e implementar tecnologias de forma eficaz.",
      date: "2025-11-15",
      category: "Guias",
      readTime: "10 min",
      image: "💡",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Blog Gedui
            </h2>
            <p className="text-xl text-gray-600">
              Insights, tendências e dicas sobre educação
            </p>
          </div>
          <Link
            href="/blog"
            className="mt-4 md:mt-0 text-sky-600 font-semibold hover:text-sky-700 transition-colors"
          >
            Ver todos os posts →
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:border-sky-200 transition-all hover:shadow-md h-full flex flex-col">
                {/* Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center text-6xl">
                  {post.image}
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                    <span>{post.readTime} de leitura</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Date */}
                  <div className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
