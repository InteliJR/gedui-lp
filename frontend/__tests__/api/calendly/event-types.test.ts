/**
 * Testes para API /api/calendly/event-types
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import handler from "../../../src/pages/api/calendly/event-types";

// Mock do fetch global
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("/api/calendly/event-types", () => {
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

    it("deve retornar erro 400 quando userUri não é fornecido", async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            query: {},
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(400);
        expect(JSON.parse(res._getData())).toEqual({
            success: false,
            error: "userUri é obrigatório",
        });
    });

    it("deve retornar erro 500 quando CALENDLY_API_KEY não está configurada", async () => {
        const originalEnv = process.env.CALENDLY_API_KEY;
        delete process.env.CALENDLY_API_KEY;

        jest.resetModules();
        const { default: handlerWithoutKey } = await import("../../../src/pages/api/calendly/event-types");

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            query: { userUri: "https://api.calendly.com/users/test" },
        });

        await handlerWithoutKey(req, res);

        expect(res._getStatusCode()).toBe(500);
        expect(JSON.parse(res._getData()).success).toBe(false);

        process.env.CALENDLY_API_KEY = originalEnv;
    });

    it("deve retornar tipos de evento com sucesso", async () => {
        const mockEventTypes = {
            collection: [
                {
                    uri: "https://api.calendly.com/event_types/test-event-1",
                    name: "Reunião de 30 minutos",
                    active: true,
                    slug: "reuniao-30min",
                    scheduling_url: "https://calendly.com/test/reuniao-30min",
                    duration: 30,
                    kind: "solo",
                    pooling_type: null,
                    type: "StandardEventType",
                    color: "#8247f5",
                    created_at: "2024-01-01T00:00:00.000Z",
                    updated_at: "2024-01-01T00:00:00.000Z",
                    description_plain: "Reunião de demonstração",
                    description_html: "<p>Reunião de demonstração</p>",
                    profile: {
                        type: "User",
                        name: "Test User",
                        owner: "https://api.calendly.com/users/test",
                    },
                    secret: false,
                    booking_method: "instant",
                },
            ],
        };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockEventTypes,
        });

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            query: { userUri: "https://api.calendly.com/users/test" },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);
        const data = JSON.parse(res._getData());
        expect(data.success).toBe(true);
        expect(data.eventTypes).toEqual(mockEventTypes.collection);
    });

    it("deve retornar erro quando API do Calendly falha", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 403,
            text: async () => "Forbidden",
        });

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            query: { userUri: "https://api.calendly.com/users/test" },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(403);
        expect(JSON.parse(res._getData()).success).toBe(false);
    });

    it("deve retornar erro 500 quando fetch falha", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network error"));

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            query: { userUri: "https://api.calendly.com/users/test" },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(500);
        expect(JSON.parse(res._getData())).toEqual({
            success: false,
            error: "Erro ao buscar tipos de evento",
        });
    });
});
