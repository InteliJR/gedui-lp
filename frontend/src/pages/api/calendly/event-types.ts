import type { NextApiRequest, NextApiResponse } from "next";

const CALENDLY_API_KEY = process.env.CALENDLY_API_KEY;
const BASE_URL = "https://api.calendly.com";

interface CalendlyEventType {
    uri: string;
    name: string;
    active: boolean;
    slug: string;
    scheduling_url: string;
    duration: number;
    kind: string;
    pooling_type: string | null;
    type: string;
    color: string;
    created_at: string;
    updated_at: string;
    description_plain: string | null;
    description_html: string | null;
    profile: {
        type: string;
        name: string;
        owner: string;
    };
    secret: boolean;
    booking_method: string;
}

interface EventTypesResponse {
    success: boolean;
    eventTypes?: CalendlyEventType[];
    error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<EventTypesResponse>) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, error: "Método não permitido" });
    }

    if (!CALENDLY_API_KEY) {
        return res.status(500).json({
            success: false,
            error: "CALENDLY_API_KEY não configurada",
        });
    }

    const { userUri } = req.query;

    if (!userUri || typeof userUri !== "string") {
        return res.status(400).json({
            success: false,
            error: "userUri é obrigatório",
        });
    }

    try {
        const response = await fetch(`${BASE_URL}/event_types?user=${encodeURIComponent(userUri)}&active=true`, {
            headers: {
                Authorization: `Bearer ${CALENDLY_API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Erro ao buscar tipos de evento:", errorData);
            return res.status(response.status).json({
                success: false,
                error: `Erro na API do Calendly: ${response.status}`,
            });
        }

        const data = await response.json();
        return res.status(200).json({
            success: true,
            eventTypes: data.collection,
        });
    } catch (error) {
        console.error("Erro ao buscar tipos de evento:", error);
        return res.status(500).json({
            success: false,
            error: "Erro ao buscar tipos de evento",
        });
    }
}
