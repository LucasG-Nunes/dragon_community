import type { Dragon } from "../../entities/Dragon";

export interface IDragonService {
  fetchAll(): Promise<Dragon[]>;
  fetchById(id: string): Promise<Dragon>;
  create(dragon: Partial<Dragon>): Promise<void>;
  update(id: string, dragon: Partial<Dragon>): Promise<void>;
  delete(id: string): Promise<void>;
}
