import type { User } from "../../entities/User";
import type { LoginResponse } from "../../types/type";

export interface IAuthService {
  login(username: string, password: string): Promise<LoginResponse>;
  logout(): Promise<void>;
  isAuthenticated(): boolean;
  getToken(): string | null;
  getCurrentUser(): User | null;
}
