import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Removido output: "export" para suportar API routes na Vercel
    trailingSlash: true,

    images: {
        // Usar otimização de imagens da Vercel
        remotePatterns: [
            {
                protocol: "https",
                hostname: "gedui.blob.core.windows.net",
                pathname: "/**",
            },
        ],
    },

    reactStrictMode: true,

    // ✅ Compressão de assets
    compress: true,

    // ✅ Powered by header (segurança)
    poweredByHeader: false,

    // ✅ Variáveis de ambiente públicas (se necessário expor no client)
    env: {
        // Apenas variáveis públicas aqui
    },

    i18n: {
        locales: ["pt-BR", "en", "es"],
        defaultLocale: "pt-BR",
        localeDetection: false,
    },
};

export default nextConfig;
