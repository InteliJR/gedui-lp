import type { NextApiRequest, NextApiResponse } from "next";

const CALENDLY_API_KEY = process.env.CALENDLY_API_KEY;
const BASE_URL = "https://api.calendly.com";

interface CalendlyUser {
    uri: string;
    name: string;
    email: string;
    scheduling_url: string;
    timezone: string;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}

interface UserResponse {
    success: boolean;
    user?: CalendlyUser;
    error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<UserResponse>) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, error: "Método não permitido" });
    }

    if (!CALENDLY_API_KEY) {
        return res.status(500).json({
            success: false,
            error: "CALENDLY_API_KEY não configurada. Verifique o arquivo .env.local",
        });
    }

    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${CALENDLY_API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Erro ao buscar usuário Calendly:", errorData);
            return res.status(response.status).json({
                success: false,
                error: `Erro na API do Calendly: ${response.status}`,
            });
        }

        const data = await response.json();
        return res.status(200).json({
            success: true,
            user: data.resource,
        });
    } catch (error) {
        console.error("Erro ao conectar com Calendly:", error);
        return res.status(500).json({
            success: false,
            error: "Erro ao conectar com o Calendly",
        });
    }
}
