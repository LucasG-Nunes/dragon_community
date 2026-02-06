import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { User } from "../../../core/entities/User";
import { LoginUseCase } from "../../../core/useCases/auth/LoginUseCase/LoginUseCase";
import { LogoutUseCase } from "../../../core/useCases/auth/LogoutUseCase/LogoutUseCase";
import { AuthService } from "../../../infrastructure/services/AuthService/AuthService";
import { DEFAULT_AUTHENTICATED_ROUTE } from "../../../shared/constants/auth.constants";

const authService = new AuthService();
const loginUseCase = new LoginUseCase(authService);
const logoutUseCase = new LogoutUseCase(authService);

interface UseAuthReturn {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await loginUseCase.execute(username, password);

      navigate(DEFAULT_AUTHENTICATED_ROUTE, { replace: true });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao fazer login";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await logoutUseCase.execute();
      navigate("/", { replace: true });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao fazer logout";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  return {
    login,
    logout,
    isLoading,
    error,
    clearError,
  };
};

export const useCurrentUser = (): User | null => {
  return authService.getCurrentUser();
};

export const useIsAuthenticated = (): boolean => {
  return authService.isAuthenticated();
};
