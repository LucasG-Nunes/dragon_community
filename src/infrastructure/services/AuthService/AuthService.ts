import { User } from "../../../core/entities/User";
import type { IAuthService } from "../../../core/ports/out/IAuthService";
import type { LoginResponse } from "../../../core/types/type";
import {
  AUTH_CREDENTIALS,
  AUTH_ERROR_MESSAGES,
  AUTH_STORAGE_KEYS,
} from "../../../shared/constants/auth.constants";
import {
  generateFakeJWT,
  getUsernameFromToken,
  isTokenValid,
} from "../../../shared/helpers/jwt-helper";

export class AuthService implements IAuthService {
  async login(username: string, password: string): Promise<LoginResponse> {
    await this.simulateNetworkDelay();

    if (
      username !== AUTH_CREDENTIALS.USERNAME ||
      password !== AUTH_CREDENTIALS.PASSWORD
    ) {
      throw new Error(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const token = generateFakeJWT(username);
    const user = new User(username, new Date());

    this.saveToken(token);
    this.saveUser(user);

    return { user, token };
  }

  async logout(): Promise<void> {
    this.removeToken();
    this.removeUser();

    await this.simulateNetworkDelay(100);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    return isTokenValid(token);
  }

  getToken(): string | null {
    const token = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
    if (!token) return null;

    if (!isTokenValid(token)) {
      this.removeToken();
      return null;
    }

    return token;
  }

  getCurrentUser(): User | null {
    const token = this.getToken();
    if (!token) return null;

    const username = getUsernameFromToken(token);
    if (!username) return null;

    const userDataString = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return new User(userData.username, new Date(userData.authenticatedAt));
    }

    return new User(username, new Date());
  }

  private saveToken(token: string): void {
    localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, token);
  }

  private removeToken(): void {
    localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
  }

  private saveUser(user: User): void {
    const userData = {
      username: user.username,
      authenticatedAt: user.authenticatedAt.toISOString(),
    };
    localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(userData));
  }

  private removeUser(): void {
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
  }

  private simulateNetworkDelay(ms: number = 200): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
