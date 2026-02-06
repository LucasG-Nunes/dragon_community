import { beforeEach, describe, expect, it, vi } from "vitest";

import type { IAuthService } from "../../../ports/out/IAuthService";
import { LogoutUseCase } from "./LogoutUseCase";

const createMockAuthService = (): IAuthService => ({
  login: vi.fn(),
  logout: vi.fn(),
  isAuthenticated: vi.fn(),
  getToken: vi.fn(),
  getCurrentUser: vi.fn(),
});

describe("LogoutUseCase", () => {
  let logoutUseCase: LogoutUseCase;
  let mockAuthService: IAuthService;

  beforeEach(() => {
    mockAuthService = createMockAuthService();
    logoutUseCase = new LogoutUseCase(mockAuthService);
  });

  describe("execute", () => {
    it("deve realizar logout com sucesso", async () => {
      const logoutSpy = vi
        .spyOn(mockAuthService, "logout")
        .mockResolvedValue(undefined);

      await logoutUseCase.execute();

      expect(logoutSpy).toHaveBeenCalledTimes(1);
    });

    it("deve chamar authService.logout exatamente uma vez", async () => {
      const logoutSpy = vi
        .spyOn(mockAuthService, "logout")
        .mockResolvedValue(undefined);

      await logoutUseCase.execute();

      expect(logoutSpy).toHaveBeenCalledTimes(1);
    });

    it("deve chamar authService.logout sem parâmetros", async () => {
      const logoutSpy = vi
        .spyOn(mockAuthService, "logout")
        .mockResolvedValue(undefined);

      await logoutUseCase.execute();

      expect(logoutSpy).toHaveBeenCalledWith();
    });

    it("não deve retornar nada (void)", async () => {
      vi.spyOn(mockAuthService, "logout").mockResolvedValue(undefined);

      const result = await logoutUseCase.execute();

      expect(result).toBeUndefined();
    });

    it("deve propagar erro quando authService.logout falha", async () => {
      const expectedError = new Error("Erro ao limpar sessão");
      vi.spyOn(mockAuthService, "logout").mockRejectedValue(expectedError);

      await expect(logoutUseCase.execute()).rejects.toThrow(
        "Erro ao limpar sessão",
      );
    });

    it("deve propagar erro de network quando authService falha", async () => {
      const networkError = new Error("Network timeout");
      vi.spyOn(mockAuthService, "logout").mockRejectedValue(networkError);

      await expect(logoutUseCase.execute()).rejects.toThrow("Network timeout");
    });

    it("deve propagar erro genérico quando authService falha sem mensagem", async () => {
      const genericError = new Error();
      vi.spyOn(mockAuthService, "logout").mockRejectedValue(genericError);

      await expect(logoutUseCase.execute()).rejects.toThrow();
    });
  });

  describe("Integração com IAuthService", () => {
    it("deve completar logout mesmo se authService demora", async () => {
      const slowLogout = vi.fn().mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(resolve, 100);
          }),
      );
      mockAuthService.logout = slowLogout;
      logoutUseCase = new LogoutUseCase(mockAuthService);

      const startTime = Date.now();
      await logoutUseCase.execute();
      const endTime = Date.now();

      expect(slowLogout).toHaveBeenCalled();
      expect(endTime - startTime).toBeGreaterThanOrEqual(95);
    });

    it("deve funcionar com múltiplas chamadas sequenciais", async () => {
      const logoutSpy = vi
        .spyOn(mockAuthService, "logout")
        .mockResolvedValue(undefined);

      await logoutUseCase.execute();
      await logoutUseCase.execute();
      await logoutUseCase.execute();

      expect(logoutSpy).toHaveBeenCalledTimes(3);
    });

    it("deve funcionar com múltiplas chamadas paralelas", async () => {
      const logoutSpy = vi
        .spyOn(mockAuthService, "logout")
        .mockResolvedValue(undefined);

      await Promise.all([
        logoutUseCase.execute(),
        logoutUseCase.execute(),
        logoutUseCase.execute(),
      ]);

      expect(logoutSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe("Edge Cases", () => {
    it("deve lidar com authService.logout que rejeita imediatamente", async () => {
      const immediateError = new Error("Immediate rejection");
      vi.spyOn(mockAuthService, "logout").mockRejectedValue(immediateError);

      await expect(logoutUseCase.execute()).rejects.toThrow(
        "Immediate rejection",
      );
    });

    it("deve lidar com authService.logout que retorna null", async () => {
      // @ts-expect-error: Testando comportamento com retorno inválido
      vi.spyOn(mockAuthService, "logout").mockResolvedValue(null);

      await expect(logoutUseCase.execute()).resolves.toBeUndefined();
    });

    it("deve lidar com authService undefined (má configuração)", async () => {
      // @ts-expect-error: Testando comportamento com configuração inválida
      const invalidLogoutUseCase = new LogoutUseCase(undefined);

      // 💡 Adicionado 'await' antes do expect para resolver o aviso do Vitest
      await expect(async () => {
        await invalidLogoutUseCase.execute();
      }).rejects.toThrow();
    });
  });

  describe("Comportamento Assíncrono", () => {
    it("deve ser uma função assíncrona", () => {
      vi.spyOn(mockAuthService, "logout").mockResolvedValue(undefined);

      const result = logoutUseCase.execute();

      expect(result).toBeInstanceOf(Promise);
    });

    it("deve aguardar authService.logout completar", async () => {
      let logoutCompleted = false;
      const delayedLogout = vi.fn().mockImplementation(
        () =>
          new Promise<void>((resolve) => {
            setTimeout(() => {
              logoutCompleted = true;
              resolve();
            }, 50);
          }),
      );
      mockAuthService.logout = delayedLogout;
      logoutUseCase = new LogoutUseCase(mockAuthService);

      expect(logoutCompleted).toBe(false);
      await logoutUseCase.execute();

      expect(logoutCompleted).toBe(true);
      expect(delayedLogout).toHaveBeenCalled();
    });
  });

  describe("Consistency", () => {
    it("deve ter comportamento consistente em múltiplas execuções", async () => {
      const logoutSpy = vi
        .spyOn(mockAuthService, "logout")
        .mockResolvedValue(undefined);

      for (let i = 0; i < 5; i++) {
        await expect(logoutUseCase.execute()).resolves.toBeUndefined();
      }

      expect(logoutSpy).toHaveBeenCalledTimes(5);
    });

    it("não deve modificar estado do authService indevidamente", async () => {
      const originalLogout = mockAuthService.logout;
      vi.spyOn(mockAuthService, "logout").mockResolvedValue(undefined);

      await logoutUseCase.execute();

      expect(mockAuthService.logout).toBeDefined();
      expect(typeof mockAuthService.logout).toBe("function");
    });
  });
});
