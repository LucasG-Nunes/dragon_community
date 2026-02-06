import type { Dragon } from "../../../core/entities/Dragon";
import type { IDragonService } from "../../../core/ports/out/IDragonService";
import { api } from "../../http/api";
import { DragonMapper } from "../../mappers/DragonMapper";

export class DragonService implements IDragonService {
  async fetchAll(): Promise<Dragon[]> {
    const { data } = await api.get("/dragon");
    return data
      .sort((previousDragon: Dragon, nextDragon: Dragon) =>
        previousDragon.name.localeCompare(nextDragon.name),
      )
      .map(DragonMapper.toDomain);
  }

  async fetchById(id: string): Promise<Dragon> {
    const { data } = await api.get(`/dragon/${id}`);
    return DragonMapper.toDomain(data);
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
