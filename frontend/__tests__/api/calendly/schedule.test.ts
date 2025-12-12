/**
 * Testes para API /api/calendly/schedule
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import handler from "../../../src/pages/api/calendly/schedule";

// Mock do fetch global
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("/api/calendly/schedule", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar erro 405 para métodos não-POST", async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(405);
        expect(JSON.parse(res._getData())).toEqual({
            success: false,
            error: "Método não permitido",
        });
    });

    it("deve retornar erro 400 quando eventTypeUri não é fornecido", async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                startTime: "2024-12-15T10:00:00.000Z",
                invitee: { name: "Test", email: "test@example.com" },
            },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(400);
        expect(JSON.parse(res._getData())).toEqual({
            success: false,
            error: "eventTypeUri é obrigatório",
        });
    });

    it("deve retornar erro 400 quando startTime não é fornecido", async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                eventTypeUri: "https://api.calendly.com/event_types/test",
                invitee: { name: "Test", email: "test@example.com" },
            },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(400);
        expect(JSON.parse(res._getData())).toEqual({
            success: false,
            error: "startTime é obrigatório",
        });
    });

    it("deve retornar erro 400 quando invitee.name não é fornecido", async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                eventTypeUri: "https://api.calendly.com/event_types/test",
                startTime: "2024-12-15T10:00:00.000Z",
                invitee: { email: "test@example.com" },
            },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(400);
        expect(JSON.parse(res._getData())).toEqual({
            success: false,
            error: "Nome e email do convidado são obrigatórios",
        });
    });

    it("deve retornar erro 400 quando invitee.email não é fornecido", async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                eventTypeUri: "https://api.calendly.com/event_types/test",
                startTime: "2024-12-15T10:00:00.000Z",
                invitee: { name: "Test User" },
            },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(400);
        expect(JSON.parse(res._getData())).toEqual({
            success: false,
            error: "Nome e email do convidado são obrigatórios",
        });
    });

    it("deve retornar erro 500 quando CALENDLY_API_KEY não está configurada", async () => {
        const originalEnv = process.env.CALENDLY_API_KEY;
        delete process.env.CALENDLY_API_KEY;

        jest.resetModules();
        const { default: handlerWithoutKey } = await import("../../../src/pages/api/calendly/schedule");

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                eventTypeUri: "https://api.calendly.com/event_types/test",
                startTime: "2024-12-15T10:00:00.000Z",
                invitee: { name: "Test", email: "test@example.com" },
            },
        });

        await handlerWithoutKey(req, res);

        expect(res._getStatusCode()).toBe(500);
        expect(JSON.parse(res._getData()).success).toBe(false);

        process.env.CALENDLY_API_KEY = originalEnv;
    });

    it("deve criar agendamento com sucesso", async () => {
        const mockScheduledEvent = {
            resource: {
                uri: "https://api.calendly.com/scheduled_events/test-event",
                cancel_url: "https://calendly.com/cancel/test",
                reschedule_url: "https://calendly.com/reschedule/test",
                created_at: "2024-12-10T00:00:00.000Z",
                updated_at: "2024-12-10T00:00:00.000Z",
                email: "test@example.com",
                name: "Test User",
                status: "active",
                timezone: "America/Sao_Paulo",
                event: "https://api.calendly.com/events/test",
            },
        };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            text: async () => JSON.stringify(mockScheduledEvent),
        });

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                eventTypeUri: "https://api.calendly.com/event_types/test",
                startTime: "2024-12-15T10:00:00.000Z",
                invitee: {
                    name: "Test User",
                    email: "test@example.com",
                    timezone: "America/Sao_Paulo",
                },
            },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(201);
        const data = JSON.parse(res._getData());
        expect(data.success).toBe(true);
        expect(data.event).toEqual(mockScheduledEvent.resource);
    });

    it("deve incluir notas no payload quando fornecidas", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            text: async () =>
                JSON.stringify({
                    resource: {
                        uri: "https://api.calendly.com/scheduled_events/test",
                        name: "Test",
                        email: "test@example.com",
                    },
                }),
        });

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                eventTypeUri: "https://api.calendly.com/event_types/test",
                startTime: "2024-12-15T10:00:00.000Z",
                invitee: { name: "Test", email: "test@example.com" },
                notes: "Informações do lead: Diretor de escola pública",
            },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(201);

        // Verificar que o payload incluiu as notas
        const fetchBody = JSON.parse(mockFetch.mock.calls[0][1].body);
        expect(fetchBody.questions_and_answers).toBeDefined();
        expect(fetchBody.questions_and_answers[0].answer).toBe("Informações do lead: Diretor de escola pública");
    });

    it("deve retornar erro 403 quando conta não tem plano Professional", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 403,
            text: async () => '{"message":"Forbidden"}',
        });

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                eventTypeUri: "https://api.calendly.com/event_types/test",
                startTime: "2024-12-15T10:00:00.000Z",
                invitee: { name: "Test", email: "test@example.com" },
            },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(403);
        const data = JSON.parse(res._getData());
        expect(data.success).toBe(false);
        expect(data.error).toContain("Professional");
    });

    it("deve retornar erro 400 quando horário não está disponível", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            text: async () => '{"message":"Time slot not available"}',
        });

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                eventTypeUri: "https://api.calendly.com/event_types/test",
                startTime: "2024-12-15T10:00:00.000Z",
                invitee: { name: "Test", email: "test@example.com" },
            },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(400);
        const data = JSON.parse(res._getData());
        expect(data.success).toBe(false);
        expect(data.error).toContain("Horário não disponível");
    });

    it("deve retornar erro 422 quando dados são inválidos", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 422,
            text: async () => '{"message":"Invalid email format"}',
        });

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                eventTypeUri: "https://api.calendly.com/event_types/test",
                startTime: "2024-12-15T10:00:00.000Z",
                invitee: { name: "Test", email: "invalid-email" },
            },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(422);
        const data = JSON.parse(res._getData());
        expect(data.success).toBe(false);
        expect(data.error).toContain("Dados inválidos");
    });

    it("deve retornar erro 500 quando fetch falha", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network error"));

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                eventTypeUri: "https://api.calendly.com/event_types/test",
                startTime: "2024-12-15T10:00:00.000Z",
                invitee: { name: "Test", email: "test@example.com" },
            },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(500);
        expect(JSON.parse(res._getData())).toEqual({
            success: false,
            error: "Erro interno ao processar agendamento",
        });
    });

    it("deve usar timezone padrão America/Sao_Paulo quando não fornecido", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            text: async () =>
                JSON.stringify({
                    resource: {
                        uri: "https://api.calendly.com/scheduled_events/test",
                        name: "Test",
                        email: "test@example.com",
                    },
                }),
        });

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
            body: {
                eventTypeUri: "https://api.calendly.com/event_types/test",
                startTime: "2024-12-15T10:00:00.000Z",
                invitee: { name: "Test", email: "test@example.com" },
            },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(201);

        // Verificar timezone no payload
        const fetchBody = JSON.parse(mockFetch.mock.calls[0][1].body);
        expect(fetchBody.invitee.timezone).toBe("America/Sao_Paulo");
    });
});
