import type { NextApiRequest, NextApiResponse } from "next";

const CALENDLY_API_KEY = process.env.CALENDLY_API_KEY;
const BASE_URL = "https://api.calendly.com";

interface AvailableTime {
    status: string;
    invitees_remaining: number;
    start_time: string;
    scheduling_url: string;
}

interface AvailabilityResponse {
    success: boolean;
    availableTimes?: AvailableTime[];
    error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AvailabilityResponse>) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, error: "Método não permitido" });
    }

    if (!CALENDLY_API_KEY) {
        return res.status(500).json({
            success: false,
            error: "CALENDLY_API_KEY não configurada",
        });
    }

    const { eventTypeUri, startTime, endTime } = req.query;

    if (!eventTypeUri || typeof eventTypeUri !== "string") {
        return res.status(400).json({
            success: false,
            error: "eventTypeUri é obrigatório",
        });
    }

    // CORREÇÃO: Adicionar buffer de 1 minuto para garantir que start_time seja no futuro
    // Isso compensa a latência da rede e evita o erro "start_time must be in the future"
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);

    // Default: próximos 7 dias a partir do início
    const defaultEndTime = new Date(now);
    defaultEndTime.setDate(defaultEndTime.getDate() + 7);

    const start = (startTime as string) || now.toISOString();
    const end = (endTime as string) || defaultEndTime.toISOString();

    try {
        const url = new URL(`${BASE_URL}/event_type_available_times`);
        url.searchParams.append("event_type", eventTypeUri);
        url.searchParams.append("start_time", start);
        url.searchParams.append("end_time", end);

        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${CALENDLY_API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Erro ao buscar disponibilidade:", errorData);
            return res.status(response.status).json({
                success: false,
                error: `Erro na API do Calendly: ${response.status}`,
            });
        }

        const data = await response.json();
        return res.status(200).json({
            success: true,
            availableTimes: data.collection,
        });
    } catch (error) {
        console.error("Erro ao buscar disponibilidade:", error);
        return res.status(500).json({
            success: false,
            error: "Erro ao buscar horários disponíveis",
        });
    }
}
