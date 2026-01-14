import { BLOG_POSTS_PTBR } from "./pt-br";
import { BLOG_POSTS_EN } from "./en";
import { BLOG_POSTS_ES } from "./es";
import type { BlogPostsBySlug, BlogPost } from "./types";

export type Locale = "pt-br" | "en" | "es";

const BLOG_BY_LOCALE: Record<Locale, BlogPostsBySlug> = {
    "pt-br": BLOG_POSTS_PTBR,
    en: BLOG_POSTS_EN,
    es: BLOG_POSTS_ES,
};

/**
 * Retorna todos os posts do idioma
 * fallback automático para pt-br
 */
export function getBlogPosts(locale: Locale): BlogPostsBySlug {
    return BLOG_BY_LOCALE[locale] ?? BLOG_POSTS_PTBR;
}

/**
 * Retorna um post pelo slug
 * fallback automático para pt-br
 */
export function getBlogPostBySlug(
    slug: string,
    locale: Locale
): BlogPost | null {
    const localizedPosts = BLOG_BY_LOCALE[locale];
    const ptPosts = BLOG_POSTS_PTBR;

    return localizedPosts?.[slug] ?? ptPosts[slug] ?? null;
}

/**
 * Retorna lista de posts (útil para listagem/paginação)
 */
export function getBlogPostList(locale: Locale): BlogPost[] {
    return Object.values(getBlogPosts(locale));
}
