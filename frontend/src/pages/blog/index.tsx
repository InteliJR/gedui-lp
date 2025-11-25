// src/pages/blog/index.tsx
import Link from "next/link";
import SEO from "@/components/common/SEO";
import Layout from "@/components/common/Layout";

export default function BlogIndex() {
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
      featured: true,
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
      featured: false,
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
      featured: false,
    },
    {
      slug: "avaliacao-online-boas-praticas",
      title: "Avaliação Online: Boas Práticas e Ferramentas",
      excerpt:
        "Como criar avaliações justas, eficazes e seguras no ambiente digital.",
      date: "2025-11-12",
      category: "Tutoriais",
      readTime: "6 min",
      image: "📝",
      featured: false,
    },
    {
      slug: "lgpd-educacao",
      title: "LGPD na Educação: O Que Você Precisa Saber",
      excerpt:
        "Entenda como adequar sua instituição às regras de proteção de dados.",
      date: "2025-11-10",
      category: "Legislação",
      readTime: "8 min",
      image: "🔒",
      featured: false,
    },
    {
      slug: "gamificacao-aprendizado",
      title: "Gamificação: Transformando Aprendizado em Diversão",
      excerpt:
        "Como usar elementos de jogos para aumentar motivação e resultados.",
      date: "2025-11-08",
      category: "Inovação",
      readTime: "5 min",
      image: "🎮",
      featured: false,
    },
  ];

  const categories = [
    "Todos",
    "Tendências",
    "Dicas",
    "Guias",
    "Tutoriais",
    "Legislação",
    "Inovação",
  ];

  return (
    <>
      <SEO
        title="Blog Gedui | Insights sobre Educação e Tecnologia"
        description="Artigos, guias e tendências sobre gestão educacional, tecnologia na educação, EAD e transformação digital. Conteúdo exclusivo da Gedui."
        keywords="blog educação, gestão escolar, EAD, tecnologia educacional, tendências educação"
        image="/og-image-blog.png"
      />

      <Layout>
        {/* Hero */}
        <section className="bg-gradient-to-br from-sky-50 to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Blog Gedui
            </h1>
            <p className="text-xl text-gray-700">
              Insights, tendências e conhecimento sobre educação e tecnologia
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4 overflow-x-auto py-6">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors
                    hover:bg-sky-50 hover:text-sky-600
                    focus:bg-sky-100 focus:text-sky-700"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {posts.find((p) => p.featured) && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Destaque
              </h2>
              {posts
                .filter((p) => p.featured)
                .map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all p-8">
                      <div className="aspect-video bg-gradient-to-br from-sky-200 to-blue-200 rounded-xl flex items-center justify-center text-8xl">
                        {post.image}
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-medium">
                            {post.category}
                          </span>
                          <span>{post.readTime} de leitura</span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-sky-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-lg text-gray-700 mb-6">
                          {post.excerpt}
                        </p>
                        <div className="text-sm text-gray-600">
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
          </section>
        )}

        {/* All Posts */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Todos os Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts
                .filter((p) => !p.featured)
                .map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <article className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:border-sky-200 transition-all hover:shadow-md h-full flex flex-col">
                      <div className="aspect-video bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center text-6xl">
                        {post.image}
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-medium">
                            {post.category}
                          </span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                          {post.excerpt}
                        </p>
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
      </Layout>
    </>
  );
}
