import type { NextApiRequest, NextApiResponse } from "next";

const CALENDLY_API_KEY = process.env.CALENDLY_API_KEY;
const BASE_URL = "https://api.calendly.com";

interface ScheduleRequest {
    eventTypeUri: string;
    startTime: string;
    invitee: {
        name: string;
        email: string;
        timezone?: string;
    };
    location?: {
        kind: "physical" | "outbound_call" | "inbound_call" | "custom";
        location?: string;
    };
    customAnswers?: Record<string, string>;
    notes?: string;
}

interface ScheduledEvent {
    uri: string;
    cancel_url: string;
    reschedule_url: string;
    created_at: string;
    updated_at: string;
    email: string;
    name: string;
    status: string;
    timezone: string;
    event: string;
}

interface ScheduleResponse {
    success: boolean;
    event?: ScheduledEvent;
    error?: string;
    details?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ScheduleResponse>) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, error: "Método não permitido" });
    }

    if (!CALENDLY_API_KEY) {
        return res.status(500).json({
            success: false,
            error: "CALENDLY_API_KEY não configurada",
        });
    }

    const body = req.body as ScheduleRequest;

    // Validação dos campos obrigatórios
    if (!body.eventTypeUri) {
        return res.status(400).json({
            success: false,
            error: "eventTypeUri é obrigatório",
        });
    }

    if (!body.startTime) {
        return res.status(400).json({
            success: false,
            error: "startTime é obrigatório",
        });
    }

    if (!body.invitee?.name || !body.invitee?.email) {
        return res.status(400).json({
            success: false,
            error: "Nome e email do convidado são obrigatórios",
        });
    }

    try {
        // Montar payload para a API do Calendly
        const payload: Record<string, unknown> = {
            event_type: body.eventTypeUri,
            start_time: body.startTime,
            invitee: {
                name: body.invitee.name,
                email: body.invitee.email,
                timezone: body.invitee.timezone || "America/Sao_Paulo",
            },
        };

        // Adicionar localização se fornecida
        if (body.location) {
            payload.location = body.location;
        }

        // Adicionar notas/respostas customizadas se fornecidas
        // O Calendly requer o campo 'position' (índice 0-based) para cada pergunta
        if (body.notes) {
            payload.questions_and_answers = [
                {
                    question: "Informações adicionais",
                    answer: body.notes,
                    position: 0,
                },
            ];
        }

        console.log("Enviando agendamento para Calendly:", JSON.stringify(payload, null, 2));

        const response = await fetch(`${BASE_URL}/invitees`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${CALENDLY_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const responseText = await response.text();

        if (!response.ok) {
            console.error("Erro ao criar agendamento:", responseText);

            // Tratar erros específicos
            if (response.status === 403) {
                return res.status(403).json({
                    success: false,
                    error: "Acesso negado. Verifique se sua conta Calendly tem plano Professional ou superior.",
                    details: responseText,
                });
            }

            if (response.status === 400) {
                return res.status(400).json({
                    success: false,
                    error: "Horário não disponível. Outro agendamento pode ter sido feito neste horário.",
                    details: responseText,
                });
            }

            if (response.status === 422) {
                return res.status(422).json({
                    success: false,
                    error: "Dados inválidos. Verifique o email e campos obrigatórios.",
                    details: responseText,
                });
            }

            return res.status(response.status).json({
                success: false,
                error: `Erro na API do Calendly: ${response.status}`,
                details: responseText,
            });
        }

        const data = JSON.parse(responseText);
        console.log("Agendamento criado com sucesso:", data);

        return res.status(201).json({
            success: true,
            event: data.resource,
        });
    } catch (error) {
        console.error("Erro ao criar agendamento:", error);
        return res.status(500).json({
            success: false,
            error: "Erro interno ao processar agendamento",
        });
    }
}
