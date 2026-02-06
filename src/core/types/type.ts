import type { User } from "../entities/User";

export interface DragonDTO<T> {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  histories: T[];
}

export interface LoginResponse {
  user: User;
  token: string;
}
