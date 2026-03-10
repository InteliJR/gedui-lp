// Setup para os testes - mock de variáveis de ambiente
process.env.CALENDLY_API_KEY = "test_api_key_mock";

// Silenciar console.error e console.log durante testes
jest.spyOn(console, "error").mockImplementation(() => {});
jest.spyOn(console, "log").mockImplementation(() => {});
