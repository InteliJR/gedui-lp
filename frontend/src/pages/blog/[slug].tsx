// src/pages/blog/[slug].tsx
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import SEO from "@/components/common/SEO";
import Layout from "@/components/common/Layout";
import loadBlogPostDictionary from "@/i18n/loadBlogPostDictionary";
import { getPostBySlug } from "@/content/blog/getPost";

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

/**
 * Router/dict usa "pt-BR", conteúdo do blog usa "pt-br"
 */
function toDictLocale(locale?: string): DictLocale {
  return locale === "en" || locale === "es" || locale === "pt-BR" ? locale : "pt-BR";
}

function toContentLocale(locale?: string): ContentLocale {
  // se vier pt-BR, converte para pt-br
  if (locale === "en" || locale === "es") return locale;
  return "pt-br";
}

/**
 * Intl aceita "pt-BR", "en", "es"
 */
function normalizeDateLocale(locale?: string): DictLocale {
  return toDictLocale(locale);
}

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  // Se você NÃO usa i18n routing do Next, troque isso pela sua fonte de locale (cookie/localStorage)
  const dictLocale = useMemo(() => toDictLocale(router.locale as string | undefined), [router.locale]);
  const contentLocale = useMemo(
    () => toContentLocale(router.locale as string | undefined),
    [router.locale]
  );

  const [t, setT] = useState<BlogPostPageDict | null>(null);

  useEffect(() => {
    loadBlogPostDictionary(dictLocale).then(setT);
  }, [dictLocale]);

  const post = useMemo(() => {
    if (!slug || typeof slug !== "string") return null;
    return getPostBySlug(slug, contentLocale);
  }, [slug, contentLocale]);

  // evita render “vazio” piscando labels
  if (!t) return null;

  if (!post) {
    return (
      <>
        <SEO title={t.notFound.seoTitle} description={t.notFound.seoDescription} />
        <Layout headerVariant="primary">
          <article className="bg-white">
            <div className="max-w-2xl mx-auto px-6 pt-16 pb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {t.notFound.title}
              </h1>
              <p className="text-gray-700 mb-6">{t.notFound.body}</p>

              <Link
                href="/blog"
                className="inline-flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all px-4 py-2 rounded-lg"
              >
                {t.notFound.backToBlog}
              </Link>
            </div>
          </article>
        </Layout>
      </>
    );
  }

  const intlLocale = normalizeDateLocale(dictLocale);

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
        image={`/og-image-blog-${post.slug}.png`}
      />

      <Layout headerVariant="primary">
        <article className="bg-white">
          {/* Back Button - Fixo */}
          <div className="fixed top-26 left-8 z-40">
            <Link
              href="/blog"
              aria-label={t.backButtonAria}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all p-3 rounded-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
          </div>

          {/* Content */}
          <div className="max-w-2xl mx-auto px-6 pt-16 pb-8">
            {/* Hero Image */}
            <div className="relative w-full aspect-[16/9] mb-6 rounded-2xl overflow-hidden">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            </div>

            {/* Metadata */}
            <div className="mb-6 text-sm text-gray-600">
              <p className="mb-1">
                <span className="font-medium">{t.meta.published}</span>{" "}
                {new Date(post.date).toLocaleDateString(intlLocale, {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>
                <span className="font-medium">{t.meta.readTime}</span> {post.readTime}
              </p>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Introduction */}
            <p className="text-sm md:text-base text-gray-700 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Content Sections */}
            <div className="space-y-8 text-sm md:text-base">{post.content}</div>
          </div>
        </article>
      </Layout>
    </>
  );
}
