// src/pages/blog/index.tsx
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import SEO from "@/components/common/SEO";
import Layout from "@/components/common/Layout";
import BlogCardList from "@/components/blog/BlogCardList";
import BlogHero from "@/components/blog/BlogHero";
import CTA_Blog from "@/components/blog/CTA";
import loadBlogDictionary from "@/i18n/loadBlogDictionary";

export default function BlogIndex({
  t,
  initialPosts,
  totalCount,
  apiLocale
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
          <BlogHero t={t.hero} />
          <BlogCardList
            t={t.cardList}
            initialPosts={initialPosts}
            totalCount={totalCount}
            apiLocale={apiLocale}
          />
          <CTA_Blog t={t.cta} />
        </main>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const t = await loadBlogDictionary(locale);
  const apiLocale = locale === "en" || locale === "es" ? locale : "pt-br";

  let initialPosts = [];
  let totalCount = 0;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://gedui.com.br';
    const res = await fetch(`${baseUrl}/api/v1/${apiLocale}/articles?page=1&page_size=4`);

    if (res.ok) {
      const data = await res.json();
      initialPosts = data.results || [];
      totalCount = data.count || 0; 
    }
  } catch (error) {
    console.error("Erro ao buscar posts da API:", error);
  }

  return {
    props: { t, initialPosts, totalCount, apiLocale },
    revalidate: 60,
  };
};