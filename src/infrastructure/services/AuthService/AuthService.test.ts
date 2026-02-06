import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  AUTH_CREDENTIALS,
  AUTH_ERROR_MESSAGES,
  AUTH_STORAGE_KEYS,
} from "../../../shared/constants/auth.constants";
import { generateFakeJWT } from "../../../shared/helpers/jwt-helper";
import { AuthService } from "./AuthService";

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    localStorage.clear();
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("login", () => {
    it("deve realizar login com sucesso com credenciais válidas", async () => {
      const loginPromise = authService.login(
        AUTH_CREDENTIALS.USERNAME,
        AUTH_CREDENTIALS.PASSWORD,
      );

      vi.advanceTimersByTime(200);

      const result = await loginPromise;

      expect(result.user.username).toBe(AUTH_CREDENTIALS.USERNAME);
      expect(result.token).toBeDefined();

      expect(localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN)).toBe(result.token);
      const savedUser = JSON.parse(
        localStorage.getItem(AUTH_STORAGE_KEYS.USER) || "{}",
      );
      expect(savedUser.username).toBe(AUTH_CREDENTIALS.USERNAME);
    });

    it("deve lançar erro com credenciais inválidas", async () => {
      const loginPromise = authService.login("usuario_errado", "senha_errada");

      vi.advanceTimersByTime(200);

      await expect(loginPromise).rejects.toThrow(
        AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS,
      );
    });
  });

  describe("logout", () => {
    it("deve remover dados do localStorage ao deslogar", async () => {
      localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, "fake-token");
      localStorage.setItem(
        AUTH_STORAGE_KEYS.USER,
        JSON.stringify({ username: "tester" }),
      );

      const logoutPromise = authService.logout();

      vi.advanceTimersByTime(100);
      await logoutPromise;

      expect(localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN)).toBeNull();
      expect(localStorage.getItem(AUTH_STORAGE_KEYS.USER)).toBeNull();
    });
  });

  describe("isAuthenticated", () => {
    it("deve retornar true se houver um token válido", () => {
      const validToken = generateFakeJWT(AUTH_CREDENTIALS.USERNAME);
      localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, validToken);

      expect(authService.isAuthenticated()).toBe(true);
    });

    it("deve retornar false se o localStorage estiver vazio", () => {
      expect(authService.isAuthenticated()).toBe(false);
    });

    it("deve retornar false e limpar o storage se o token for inválido", () => {
      localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, "token-muito-curto");

      expect(authService.isAuthenticated()).toBe(false);
      expect(localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN)).toBeNull();
    });
  });

  describe("getCurrentUser", () => {
    it("deve reconstruir a entidade User a partir dos dados salvos", () => {
      const username = "DragonMaster";
      const validToken = generateFakeJWT(username);
      const mockUser = {
        username: username,
        authenticatedAt: new Date().toISOString(),
      };

      localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, validToken);
      localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(mockUser));

      const user = authService.getCurrentUser();

      expect(user?.username).toBe(username);
      expect(user?.authenticatedAt).toBeInstanceOf(Date);
    });

    it("deve retornar null se não houver token ou token for inválido", () => {
      localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, "invalido");
      expect(authService.getCurrentUser()).toBeNull();
    });
  });
});
