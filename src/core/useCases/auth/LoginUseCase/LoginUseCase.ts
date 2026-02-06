import type { ILoginUseCase } from "../../../ports/in/ILoginUseCase";
import type { IAuthService } from "../../../ports/out/IAuthService";
import type { LoginResponse } from "../../../types/type";

export class LoginUseCase implements ILoginUseCase {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  async execute(username: string, password: string): Promise<LoginResponse> {
    if (!username.trim() || !password.trim()) {
      throw new Error(
        "Usuário e senha são obrigatórios para entrar na taverna!",
      );
    }

    const response = await this.authService.login(username, password);

    return response;
  }
}
