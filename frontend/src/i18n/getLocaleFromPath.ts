// src/i18n/getLocaleFromPath.ts
export type SupportedLocale = "pt-BR" | "es" | "en";

export function getLocaleFromPath(pathname: string): SupportedLocale {
  // exemplos: /es/blog, /en/solucoes, /pt-br/blog, /blog (default)
  const seg = pathname.split("/")[1]?.toLowerCase();

  if (seg === "es") return "es";
  if (seg === "en") return "en";
  if (seg === "pt-br") return "pt-BR";

  return "pt-BR";
}
