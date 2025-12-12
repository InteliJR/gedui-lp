import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Removido output: "export" para suportar API routes na Vercel
    trailingSlash: true,
    images: {
        // Usar otimização de imagens da Vercel
        remotePatterns: [],
    },
    reactStrictMode: true,
    // ✅ Compressão de assets
    compress: true,
    // ✅ Power by header (segurança)
    poweredByHeader: false,
    // ✅ Variáveis de ambiente públicas (se necessário expor no client)
    env: {
        // Apenas variáveis públicas aqui
    },
};

export default nextConfig;
