// src/i18n/loadSchedulleDictionary.ts
export type SupportedLocale = "pt-br" | "es" | "en";

export type SchedulleDict = {
    heading: {
        title: string;        // "Agende uma"
        highlight: string;    // "demo"
    };

    success: {
        title: string;
        line1: string;
        line2: string;
        cta: string;          // "Novo Agendamento"
    };

    buttons: {
        scheduling: string;   // "Agendando..."
        submit: string;       // "Agendar demonstração"
    };

    loading: {
        initializing: string; // "Carregando horários disponíveis..."
    };

    errors: {
        connectLater: string;
        loadTimes: string;
        noTimes7Days: string;
        noEventTypes: string;
        selectDateTime: string;
        fillNameEmail: string;
        createSchedule: string;
        connection: string;
        acceptTermsAlert: string;
        pickDateTime: string;
    };

    fields: {
        name: string;
        institutionName: string;
        email: string;
        phone: string;
    };

    selects: {
        positionPlaceholder: string;
        institutionTypePlaceholder: string;
        productInterestPlaceholder: string;

        datePlaceholder: string;
        timePlaceholder: string;

        selectDateFirst: string;
        noDates: string;
        noTimes: string;
        loading: string;
    };

    options: {
        position: {
            director: string;
            coordinator: string;
            teacher: string;
            other: string;
        };
        institutionType: {
            public: string;
            private: string;
            nonprofit: string;
        };
        product: {
            edu: string;
            corp: string;
            both: string;
        };
    };

    checkboxes: {
        newsletter: string;
        termsTitle: string;
        termsText: string;
    };

    meetingNotes: {
        header: string;
        position: string;
        institution: string;
        institutionType: string;
        product: string;
        phone: string;
        newsletterYes: string;
        newsletterNo: string;
        notProvided: string;
    };
};

function normalizeLocale(locale?: string): SupportedLocale {
    const l = (locale || "pt-br").toLowerCase();
    if (l === "en") return "en";
    if (l === "es") return "es";
    return "pt-br";
}

export default async function loadSchedulleDictionary(
    locale?: string
): Promise<SchedulleDict> {
    const l = normalizeLocale(locale);

    try {
        const mod = await import(`./${l}/schedulle.json`);
        return mod.default as SchedulleDict;
    } catch {
        // fallback pt-br
        const mod = await import(`./pt-BR/schedulle.json`);
        return mod.default as SchedulleDict;
    }
}
