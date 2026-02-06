import type { ILogoutUseCase } from "../../../ports/in/ILogoutUseCase";
import type { IAuthService } from "../../../ports/out/IAuthService";

export class LogoutUseCase implements ILogoutUseCase {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  async execute(): Promise<void> {
    await this.authService.logout();
  }
}
