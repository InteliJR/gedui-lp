// src/pages/blog/[slug].tsx
import Link from "next/link";
import { useRouter } from "next/router";
import SEO from "@/components/common/SEO";
import Layout from "@/components/common/Layout";
import CTA from "@/components/sections/CTA";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  // Dados mockados - posteriormente virão de CMS ou API
  // Em produção, você usaria getStaticProps/getStaticPaths
  const post = {
    slug: "tendencias-educacao-2025",
    title: "10 Tendências em Educação para 2025",
    excerpt:
      "Descubra as principais inovações que estão transformando o setor educacional",
    content: `
      <p>O setor educacional está passando por uma transformação sem precedentes. Com a aceleração da digitalização e novas demandas dos alunos, instituições de ensino precisam se adaptar rapidamente.</p>
      
      <h2>1. Aprendizado Híbrido</h2>
      <p>A combinação de ensino presencial e online se consolidou como o novo normal. Instituições que dominam essa modalidade têm vantagem competitiva.</p>
      
      <h2>2. Inteligência Artificial</h2>
      <p>IA está sendo usada para personalizar experiências de aprendizado, corrigir avaliações automaticamente e identificar alunos em risco.</p>
      
      <h2>3. Microlearning</h2>
      <p>Conteúdos curtos e focados ganham espaço, permitindo aprendizado mais ágil e eficiente.</p>
      
      <h2>4. Gamificação</h2>
      <p>Elementos de jogos aumentam engajamento e motivação, tornando o aprendizado mais divertido e eficaz.</p>
      
      <h2>5. Soft Skills</h2>
      <p>Desenvolvimento de habilidades comportamentais ganha importância igual ou superior às técnicas.</p>
      
      <h2>Conclusão</h2>
      <p>Estar atento a essas tendências é essencial para manter sua instituição competitiva e relevante no mercado educacional.</p>
    `,
    date: "2025-11-20",
    modifiedDate: "2025-11-20",
    category: "Tendências",
    readTime: "5 min",
    author: "Equipe Gedui",
    image: "📈",
  };

  const relatedPosts = [
    {
      slug: "como-aumentar-engajamento",
      title: "Como Aumentar o Engajamento dos Alunos",
      image: "🎯",
    },
    {
      slug: "guia-transformacao-digital",
      title: "Guia de Transformação Digital",
      image: "💡",
    },
  ];

  return (
    <>
      <SEO
        title={`${post.title} | Blog Gedui`}
        description={post.excerpt}
        keywords={`${post.category}, educação, tecnologia educacional`}
        type="article"
        author={post.author}
        publishedTime={new Date(post.date).toISOString()}
        modifiedTime={new Date(post.modifiedDate).toISOString()}
        image={`/og-image-blog-${slug}.png`}
      />

      <Layout>
        {/* Hero */}
        <article className="bg-gradient-to-br from-sky-50 to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-sky-600">
                    Início
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/blog" className="hover:text-sky-600">
                    Blog
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-900">{post.title}</li>
              </ol>
            </nav>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-medium">
                {post.category}
              </span>
              <span>{post.readTime} de leitura</span>
              <span>
                {new Date(post.date).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                G
              </div>
              <div>
                <div className="font-semibold text-gray-900">{post.author}</div>
                <div className="text-sm text-gray-600">Equipe de Conteúdo</div>
              </div>
            </div>
          </div>
        </article>

        {/* Content */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Featured Image */}
            <div className="aspect-video bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl flex items-center justify-center text-8xl mb-12">
              {post.image}
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Compartilhe este artigo
              </h3>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-sky-100 text-sky-700 rounded-lg font-medium hover:bg-sky-200 transition-colors">
                  LinkedIn
                </button>
                <button className="px-6 py-3 bg-sky-100 text-sky-700 rounded-lg font-medium hover:bg-sky-200 transition-colors">
                  Twitter
                </button>
                <button className="px-6 py-3 bg-sky-100 text-sky-700 rounded-lg font-medium hover:bg-sky-200 transition-colors">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Artigos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-sky-200 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-sky-100 to-blue-100 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                      {related.image}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTA variant="simple" />
      </Layout>
    </>
  );
}
