// src/pages/blog/index.tsx
import SEO from "@/components/common/SEO";
import Layout from "@/components/common/Layout";
import BlogCardList from "@/components/blog/BlogCardList";

export default function BlogIndex() {
  return (
    <>
      <SEO
        title="Blog Gedui | Insights sobre Educação e Tecnologia"
        description="Artigos, guias e tendências sobre gestão educacional, tecnologia na educação, EAD e transformação digital. Conteúdo exclusivo da Gedui."
        keywords="blog educação, gestão escolar, EAD, tecnologia educacional, tendências educação"
        image="/og-image-blog.png"
      />

      <Layout>
        <main>
          <BlogCardList />
        </main>
      </Layout>
    </>
  );
}
