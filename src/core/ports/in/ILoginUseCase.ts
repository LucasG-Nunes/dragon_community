import type { LoginResponse } from "../../types/type";

export interface ILoginUseCase {
  execute(username: string, password: string): Promise<LoginResponse>;
}
