/**
 * Testes para API /api/calendly/user
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import handler from "../../../src/pages/api/calendly/user";

// Mock do fetch global
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("/api/calendly/user", () => {
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

    it("deve retornar erro 500 quando CALENDLY_API_KEY não está configurada", async () => {
        const originalEnv = process.env.CALENDLY_API_KEY;
        delete process.env.CALENDLY_API_KEY;

        // Reimportar o módulo para capturar a mudança de env
        jest.resetModules();
        const { default: handlerWithoutKey } = await import("../../../src/pages/api/calendly/user");

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
        });

        await handlerWithoutKey(req, res);

        expect(res._getStatusCode()).toBe(500);
        expect(JSON.parse(res._getData()).success).toBe(false);
        expect(JSON.parse(res._getData()).error).toContain("CALENDLY_API_KEY");

        process.env.CALENDLY_API_KEY = originalEnv;
    });

    it("deve retornar dados do usuário com sucesso", async () => {
        const mockUser = {
            resource: {
                uri: "https://api.calendly.com/users/test-user-id",
                name: "Test User",
                email: "test@example.com",
                scheduling_url: "https://calendly.com/test-user",
                timezone: "America/Sao_Paulo",
                avatar_url: null,
                created_at: "2024-01-01T00:00:00.000Z",
                updated_at: "2024-01-01T00:00:00.000Z",
            },
        };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUser,
        });

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);
        const data = JSON.parse(res._getData());
        expect(data.success).toBe(true);
        expect(data.user).toEqual(mockUser.resource);
    });

    it("deve retornar erro quando API do Calendly falha", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 401,
            text: async () => "Unauthorized",
        });

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(401);
        expect(JSON.parse(res._getData()).success).toBe(false);
    });

    it("deve retornar erro 500 quando fetch falha", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network error"));

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(500);
        expect(JSON.parse(res._getData())).toEqual({
            success: false,
            error: "Erro ao conectar com o Calendly",
        });
    });
});
