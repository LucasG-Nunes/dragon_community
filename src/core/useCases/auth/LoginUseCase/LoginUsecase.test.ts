import { beforeEach, describe, expect, it, vi } from "vitest";

import { User } from "../../../entities/User";
import type { IAuthService } from "../../../ports/out/IAuthService";
import type { LoginResponse } from "../../../types/type";
import { LoginUseCase } from "./LoginUseCase";

const createMockAuthService = (): IAuthService => ({
  login: vi.fn(),
  logout: vi.fn(),
  isAuthenticated: vi.fn(),
  getToken: vi.fn(),
  getCurrentUser: vi.fn(),
});

describe("LoginUseCase", () => {
  let loginUseCase: LoginUseCase;
  let mockAuthService: IAuthService;

  beforeEach(() => {
    mockAuthService = createMockAuthService();
    loginUseCase = new LoginUseCase(mockAuthService);
  });

  describe("execute", () => {
    it("deve realizar login com sucesso quando credenciais são válidas", async () => {
      const username = "treinador";
      const password = "dragao123";
      const mockUser = new User(username, new Date());
      const mockToken = "fake.jwt.token";
      const expectedResponse: LoginResponse = {
        user: mockUser,
        token: mockToken,
      };

      vi.spyOn(mockAuthService, "login").mockResolvedValue(expectedResponse);

      const result = await loginUseCase.execute(username, password);

      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
      expect(mockAuthService.login).toHaveBeenCalledWith(username, password);
      expect(result).toEqual(expectedResponse);
      expect(result.user.username).toBe(username);
      expect(result.token).toBe(mockToken);
    });

    it("deve lançar erro quando username está vazio", async () => {
      const emptyUsername = "";
      const password = "dragao123";

      await expect(
        loginUseCase.execute(emptyUsername, password),
      ).rejects.toThrow(
        "Usuário e senha são obrigatórios para entrar na taverna!",
      );

      expect(mockAuthService.login).not.toHaveBeenCalled();
    });

    it("deve lançar erro quando username contém apenas espaços", async () => {
      const whitespaceUsername = "   ";
      const password = "dragao123";

      await expect(
        loginUseCase.execute(whitespaceUsername, password),
      ).rejects.toThrow(
        "Usuário e senha são obrigatórios para entrar na taverna!",
      );

      expect(mockAuthService.login).not.toHaveBeenCalled();
    });

    it("deve lançar erro quando password está vazio", async () => {
      const username = "treinador";
      const emptyPassword = "";

      await expect(
        loginUseCase.execute(username, emptyPassword),
      ).rejects.toThrow(
        "Usuário e senha são obrigatórios para entrar na taverna!",
      );

      expect(mockAuthService.login).not.toHaveBeenCalled();
    });

    it("deve lançar erro quando password contém apenas espaços", async () => {
      const username = "treinador";
      const whitespacePassword = "   ";

      await expect(
        loginUseCase.execute(username, whitespacePassword),
      ).rejects.toThrow(
        "Usuário e senha são obrigatórios para entrar na taverna!",
      );

      expect(mockAuthService.login).not.toHaveBeenCalled();
    });

    it("deve lançar erro quando ambos username e password estão vazios", async () => {
      const emptyUsername = "";
      const emptyPassword = "";

      await expect(
        loginUseCase.execute(emptyUsername, emptyPassword),
      ).rejects.toThrow(
        "Usuário e senha são obrigatórios para entrar na taverna!",
      );

      expect(mockAuthService.login).not.toHaveBeenCalled();
    });

    it("deve propagar erro quando authService.login falha", async () => {
      const username = "treinador";
      const password = "senhaErrada";
      const expectedError = new Error("Credenciais inválidas");

      vi.spyOn(mockAuthService, "login").mockRejectedValue(expectedError);

      await expect(loginUseCase.execute(username, password)).rejects.toThrow(
        "Credenciais inválidas",
      );

      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
      expect(mockAuthService.login).toHaveBeenCalledWith(username, password);
    });

    it("deve realizar login mesmo com espaços extras no username/password", async () => {
      const username = "  treinador  ";
      const password = "  dragao123  ";
      const mockUser = new User("treinador", new Date());
      const mockToken = "fake.jwt.token";
      const expectedResponse: LoginResponse = {
        user: mockUser,
        token: mockToken,
      };

      vi.spyOn(mockAuthService, "login").mockResolvedValue(expectedResponse);

      const result = await loginUseCase.execute(username, password);

      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResponse);
    });

    it("deve retornar user com data de autenticação", async () => {
      const username = "treinador";
      const password = "dragao123";
      const authenticatedAt = new Date("2024-02-06T12:00:00.000Z");
      const mockUser = new User(username, authenticatedAt);
      const mockToken = "fake.jwt.token";
      const expectedResponse: LoginResponse = {
        user: mockUser,
        token: mockToken,
      };

      vi.spyOn(mockAuthService, "login").mockResolvedValue(expectedResponse);

      const result = await loginUseCase.execute(username, password);

      expect(result.user.authenticatedAt).toEqual(authenticatedAt);
      expect(result.user.username).toBe(username);
    });

    it("deve funcionar com diferentes tipos de username válidos", async () => {
      const testCases = [
        "user123",
        "admin",
        "treinador_dragoes",
        "user-name",
        "A",
      ];

      const password = "password123";
      const mockToken = "fake.jwt.token";

      for (const username of testCases) {
        const mockUser = new User(username, new Date());
        const expectedResponse: LoginResponse = {
          user: mockUser,
          token: mockToken,
        };

        vi.spyOn(mockAuthService, "login").mockResolvedValue(expectedResponse);

        const result = await loginUseCase.execute(username, password);

        expect(result.user.username).toBe(username);
        expect(mockAuthService.login).toHaveBeenCalledWith(username, password);
      }
    });
  });

  describe("Integração com IAuthService", () => {
    it("deve chamar authService.login exatamente uma vez", async () => {
      const username = "treinador";
      const password = "dragao123";
      const mockResponse: LoginResponse = {
        user: new User(username, new Date()),
        token: "token",
      };

      const loginSpy = vi
        .spyOn(mockAuthService, "login")
        .mockResolvedValue(mockResponse);

      await loginUseCase.execute(username, password);

      expect(loginSpy).toHaveBeenCalledTimes(1);
    });

    it("deve passar username e password sem modificação para o serviço após validação", async () => {
      const username = "treinador";
      const password = "dragao123";
      const mockResponse: LoginResponse = {
        user: new User(username, new Date()),
        token: "token",
      };

      const loginSpy = vi
        .spyOn(mockAuthService, "login")
        .mockResolvedValue(mockResponse);

      await loginUseCase.execute(username, password);

      expect(loginSpy).toHaveBeenCalledWith(username, password);
    });
  });

  describe("Edge Cases", () => {
    it("deve tratar erro quando authService retorna resposta malformada", async () => {
      const username = "treinador";
      const password = "dragao123";

      const malformedResponse = {
        user: new User(username, new Date()),
        token: "",
      } as LoginResponse;

      vi.spyOn(mockAuthService, "login").mockResolvedValue(malformedResponse);

      const result = await loginUseCase.execute(username, password);

      expect(result.token).toBe("");
    });

    it("deve tratar timeout/network error do serviço", async () => {
      const username = "treinador";
      const password = "dragao123";
      const networkError = new Error("Network timeout");

      vi.spyOn(mockAuthService, "login").mockRejectedValue(networkError);

      await expect(loginUseCase.execute(username, password)).rejects.toThrow(
        "Network timeout",
      );
    });
  });
});
