import type { Dragon } from "../../core/entities/Dragon";
import type { IDragonService } from "../../core/ports/out/IDragonService";
import { api } from "../http/api";
import { DragonMapper } from "../mappers/DragonMapper";

export class DragonService implements IDragonService {
  async fetchAll(): Promise<Dragon[]> {
    const response = await api.get("/dragon");
    // Mapeia cada item da API para uma entidade do Core
    //temporary any type
    return response.data
      .sort((a: any, b: any) => a.name.localeCompare(b.name)) // Regra: ordenar por nome
      .map(DragonMapper.toDomain);
  }

  async fetchById(id: string): Promise<Dragon> {
    const response = await api.get(`/dragon/${id}`);
    return DragonMapper.toDomain(response.data);
  }

  async create(dragon: Partial<Dragon>): Promise<void> {
    await api.post("/dragon", dragon);
  }

  async update(id: string, dragon: Partial<Dragon>): Promise<void> {
    await api.put(`/dragon/${id}`, dragon);
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/dragon/${id}`);
  }
}
