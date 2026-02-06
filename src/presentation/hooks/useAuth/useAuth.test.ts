import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LoginUseCase } from "../../../core/useCases/auth/LoginUseCase/LoginUseCase";
import { LogoutUseCase } from "../../../core/useCases/auth/LogoutUseCase/LogoutUseCase";
import { useAuth } from "./useAuth";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigate,
}));

vi.mock("../../../core/useCases/auth/LoginUseCase/LoginUseCase");
vi.mock("../../../core/useCases/auth/LogoutUseCase/LogoutUseCase");

describe("useAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("login", () => {
    it("deve realizar login com sucesso e navegar para a rota padrão", async () => {
      const mockUser = { username: "Draco" };
      vi.spyOn(LoginUseCase.prototype, "execute").mockResolvedValue({
        user: mockUser as any,
        token: "token-123",
      });

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.login("admin", "admin123");
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(mockedNavigate).toHaveBeenCalledWith("/dragons", {
        replace: true,
      });
    });

    it("deve capturar erro quando o login falhar", async () => {
      const errorMessage = "Credenciais Inválidas";
      vi.spyOn(LoginUseCase.prototype, "execute").mockRejectedValue(
        new Error(errorMessage),
      );

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.login("errado", "errado");
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(errorMessage);
      expect(mockedNavigate).not.toHaveBeenCalled();
    });
  });

  describe("logout", () => {
    it("deve realizar logout e navegar para a home", async () => {
      vi.spyOn(LogoutUseCase.prototype, "execute").mockResolvedValue();

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.logout();
      });

      expect(mockedNavigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });

  describe("clearError", () => {
    it("deve limpar o estado de erro", async () => {
      vi.spyOn(LoginUseCase.prototype, "execute").mockRejectedValue(
        new Error("Erro"),
      );
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.login("x", "y");
      });

      expect(result.current.error).toBe("Erro");

      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
    });
  });
});
