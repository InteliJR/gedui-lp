// src/pages/blog/[slug].tsx
import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import type { GetServerSideProps } from "next";
import SEO from "@/components/common/SEO";
import Layout from "@/components/common/Layout";
import loadBlogPostDictionary from "@/i18n/loadBlogPostDictionary";

type BlogPostPageDict = {
  notFound: {
    seoTitle: string;
    seoDescription: string;
    title: string;
    body: string;
    backToBlog: string;
  };
  meta: {
    published: string;
    readTime: string;
  };
  backButtonAria: string;
};

type DictLocale = "pt-BR" | "en" | "es";
type ContentLocale = "pt-br" | "en" | "es";

type BlogPostPageDict = {
  notFound: { seoTitle: string; seoDescription: string; title: string; body: string; backToBlog: string; };
  meta: { published: string; readTime: string; };
  backButtonAria: string;
};

type DictLocale = "pt-BR" | "en" | "es";

function toDictLocale(locale?: string): DictLocale {
  return locale === "en" || locale === "es" || locale === "pt-BR" ? locale : "pt-BR";
}

export default function BlogPost({ post, t, intlLocale }: { post: any, t: BlogPostPageDict, intlLocale: string }) {
  const router = useRouter();

  if (!post) {
    return (
      <>
        <SEO title={t?.notFound?.seoTitle || "Não encontrado"} description={t?.notFound?.seoDescription || ""} />
        <Layout>
          <article className="bg-white">
            <div className="max-w-2xl mx-auto px-6 pt-16 pb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {t?.notFound?.title || "Post não encontrado"}
              </h1>
              <p className="text-gray-700 mb-6">{t?.notFound?.body}</p>
              <Link href="/blog" className="inline-flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all px-4 py-2 rounded-lg">
                {t?.notFound?.backToBlog || "Voltar"}
              </Link>
            </div>
          </article>
        </Layout>
      </>
    );
  }

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
        image={post.image || `/og-image-blog-${post.slug}.png`}
      />

      <Layout headerVariant="primary">
        <article className="bg-white">
          <div className="fixed top-26 left-8 z-40">
            <Link href="/blog" aria-label={t.backButtonAria} className="inline-flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>

          <div className="max-w-2xl mx-auto px-6 pt-16 pb-8">
            {post.image && (
              <div className="relative w-full aspect-[16/9] mb-6 rounded-2xl overflow-hidden bg-gray-100">
                <Image src={post.image} alt={post.title} fill className="object-cover" priority />
              </div>
            )}

            <div className="mb-6 text-sm text-gray-600">
              <p className="mb-1">
                <span className="font-medium">{t.meta.published}</span>{" "}
                {new Date(post.date).toLocaleDateString(intlLocale, { day: "2-digit", month: "long", year: "numeric" })}
              </p>
              <p>
                <span className="font-medium">{t.meta.readTime}</span> {post.readTime}
              </p>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-sm md:text-base text-gray-700 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div
              className="space-y-8 text-sm md:text-base prose prose-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const dictLocale = toDictLocale(locale);
  const t = await loadBlogPostDictionary(dictLocale);

  let post = null;

  try {
    const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://gedui.com.br';
    const baseUrl = rawBaseUrl.replace(/\/+$/, '').replace(/\/api$/, '');

    const res = await fetch(`${baseUrl}/api/v1/articles/${slug}`);

    if (res.ok) {
      const data = await res.json();
      post = {
        title: data.title,
        excerpt: data.content ? data.content.substring(0, 160) + "..." : "",
        category: "Educação",
        author: data.post?.created_by
          ? `${data.post.created_by.first_name || ""} ${data.post.created_by.last_name || ""}`.trim()
          : "Equipe Gedui",
        date: data.post?.published_date || new Date().toISOString(),
        modifiedDate: data.post?.published_date || new Date().toISOString(),
        slug: data.slug,
        readTime: data.post?.ready_time ? `${data.post.ready_time} min` : "5 min",
        image: data.image,
        content: data.content
      };
    }
  } catch (error) {
    console.error("[SSR] Erro ao buscar o post na API:", error);
  }

  return {
    props: {
      post,
      t,
      intlLocale: dictLocale
    }
  };
};