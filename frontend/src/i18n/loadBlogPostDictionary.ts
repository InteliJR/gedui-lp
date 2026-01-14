export type SupportedLocale = "pt-BR" | "en" | "es";

export default async function loadBlogPostDictionary(locale?: string) {
  const safeLocale: SupportedLocale =
    locale === "en" || locale === "es" || locale === "pt-BR" ? locale : "pt-BR";

  const dict = await import(`./${safeLocale}/blogPost.json`).then((m) => m.default);
  return dict;
}
