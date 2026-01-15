import type { BlogPostData } from "./types";

// 👇 troque BLOG_POSTS_PT por BLOG_POSTS_PTBR (como o erro sugere)
import { BLOG_POSTS_PTBR } from "./pt-BR";
import { BLOG_POSTS_EN } from "./en";
import { BLOG_POSTS_ES } from "./es";

type ContentLocale = "pt-br" | "en" | "es";

export function getPostBySlug(slug: string, locale: string) {
  const safeLocale: ContentLocale = locale === "en" || locale === "es" ? locale : "pt-br";

  const dict =
    safeLocale === "en"
      ? BLOG_POSTS_EN
      : safeLocale === "es"
      ? BLOG_POSTS_ES
      : BLOG_POSTS_PTBR;

  // fallback: se não existir no idioma, tenta pt-br
  return dict[slug] ?? BLOG_POSTS_PTBR[slug] ?? null;
}
