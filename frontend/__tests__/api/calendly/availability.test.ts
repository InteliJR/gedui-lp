/**
 * Testes para API /api/calendly/availability
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import handler from "../../../src/pages/api/calendly/availability";

// Mock do fetch global
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("/api/calendly/availability", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar erro 405 para métodos não-GET", async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "POST",
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
            method: "GET",
            query: {},
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(400);
        expect(JSON.parse(res._getData())).toEqual({
            success: false,
            error: "eventTypeUri é obrigatório",
        });
    });

    it("deve retornar erro 500 quando CALENDLY_API_KEY não está configurada", async () => {
        const originalEnv = process.env.CALENDLY_API_KEY;
        delete process.env.CALENDLY_API_KEY;

        jest.resetModules();
        const { default: handlerWithoutKey } = await import("../../../src/pages/api/calendly/availability");

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            query: { eventTypeUri: "https://api.calendly.com/event_types/test" },
        });

        await handlerWithoutKey(req, res);

        expect(res._getStatusCode()).toBe(500);
        expect(JSON.parse(res._getData()).success).toBe(false);

        process.env.CALENDLY_API_KEY = originalEnv;
    });

    it("deve retornar horários disponíveis com sucesso", async () => {
        const mockAvailability = {
            collection: [
                {
                    status: "available",
                    invitees_remaining: 1,
                    start_time: "2024-12-15T10:00:00.000Z",
                    scheduling_url: "https://calendly.com/test/reuniao?start_time=2024-12-15T10:00:00Z",
                },
                {
                    status: "available",
                    invitees_remaining: 1,
                    start_time: "2024-12-15T11:00:00.000Z",
                    scheduling_url: "https://calendly.com/test/reuniao?start_time=2024-12-15T11:00:00Z",
                },
                {
                    status: "available",
                    invitees_remaining: 1,
                    start_time: "2024-12-16T14:00:00.000Z",
                    scheduling_url: "https://calendly.com/test/reuniao?start_time=2024-12-16T14:00:00Z",
                },
            ],
        };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockAvailability,
        });

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            query: { eventTypeUri: "https://api.calendly.com/event_types/test" },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);
        const data = JSON.parse(res._getData());
        expect(data.success).toBe(true);
        expect(data.availableTimes).toEqual(mockAvailability.collection);
        expect(data.availableTimes).toHaveLength(3);
    });

    it("deve usar startTime e endTime personalizados quando fornecidos", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ collection: [] }),
        });

        const customStart = "2024-12-20T00:00:00.000Z";
        const customEnd = "2024-12-25T00:00:00.000Z";

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            query: {
                eventTypeUri: "https://api.calendly.com/event_types/test",
                startTime: customStart,
                endTime: customEnd,
            },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);

        // Verificar que o fetch foi chamado com os parâmetros corretos
        const fetchCall = mockFetch.mock.calls[0][0] as string;
        expect(fetchCall).toContain(`start_time=${encodeURIComponent(customStart)}`);
        expect(fetchCall).toContain(`end_time=${encodeURIComponent(customEnd)}`);
    });

    it("deve adicionar buffer de 1 minuto ao start_time padrão", async () => {
        const beforeCall = new Date();

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ collection: [] }),
        });

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            query: { eventTypeUri: "https://api.calendly.com/event_types/test" },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);

        // Verificar que o fetch foi chamado
        expect(mockFetch).toHaveBeenCalledTimes(1);

        // Extrair o start_time da URL chamada
        const fetchUrl = new URL(mockFetch.mock.calls[0][0] as string);
        const startTimeParam = fetchUrl.searchParams.get("start_time");
        expect(startTimeParam).toBeTruthy();

        const startTime = new Date(startTimeParam!);
        const expectedMinTime = new Date(beforeCall.getTime() + 60 * 1000); // +1 minuto

        // O start_time deve ser pelo menos 1 minuto no futuro
        expect(startTime.getTime()).toBeGreaterThanOrEqual(expectedMinTime.getTime() - 5000); // 5s de tolerância
    });

    it("deve retornar erro quando API do Calendly falha", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            text: async () => '{"message":"start_time must be in the future"}',
        });

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            query: { eventTypeUri: "https://api.calendly.com/event_types/test" },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(400);
        expect(JSON.parse(res._getData()).success).toBe(false);
    });

    it("deve retornar erro 500 quando fetch falha", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network error"));

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            query: { eventTypeUri: "https://api.calendly.com/event_types/test" },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(500);
        expect(JSON.parse(res._getData())).toEqual({
            success: false,
            error: "Erro ao buscar horários disponíveis",
        });
    });

    it("deve retornar array vazio quando não há horários disponíveis", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ collection: [] }),
        });

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            query: { eventTypeUri: "https://api.calendly.com/event_types/test" },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);
        const data = JSON.parse(res._getData());
        expect(data.success).toBe(true);
        expect(data.availableTimes).toEqual([]);
    });
});
