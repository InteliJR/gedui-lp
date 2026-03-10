// src/i18n/loadSolutionsDictionary.ts
export type SupportedLocale = "pt-BR" | "en" | "es";

export default async function loadSolutionsDictionary(locale?: string) {
  const safeLocale: SupportedLocale =
    locale === "en" || locale === "es" || locale === "pt-BR" ? locale : "pt-BR";

  const dict = await import(`./${safeLocale}/solutions.json`).then((m) => m.default);

  return dict;
}
