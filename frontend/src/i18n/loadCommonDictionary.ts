// src/i18n/loadCommonDictionary.ts
export type SupportedLocale = "pt-BR" | "en" | "es";

export type CommonDict = {
    header: {
        nav: {
            solutions: string;
            blog: string;
        };
        cta: string;
        aria: {
            mainNav: string;
            logoLink: string;
            languageSwitcher: string;
            openCloseMenu: string;
        };
        languages: {
            pt: string;
            es: string;
            en: string;
        };
    };
    footer: {
        copyright: string; // "© {year} Gedui..."
        columns: {
            solutions: string;
            links: string;
            contact: string;
        };
        solutions: { edu: string; corp: string };
        links: { blog: string };
        contactEmailLabel: string;
        aria: {
            institutional: string;
            footerNav: string;
            social: string;
            visitProfile: string; // "... {social}"
        };
    };
};

export default async function loadCommonDictionary(locale?: string) {
    const safeLocale: SupportedLocale =
        locale === "en" || locale === "es" || locale === "pt-BR" ? locale : "pt-BR";

    const dict = await import(`./common/${safeLocale}.json`).then((m) => m.default);

    return dict as CommonDict;
}
