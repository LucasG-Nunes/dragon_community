import { Dragon } from "../../core/entities/Dragon";
import type { DragonDTO } from "../../core/types/type";

export class DragonMapper {
  static toDomain<T>(raw: DragonDTO<T>): Dragon {
    return new Dragon(raw.id, raw.name, raw.type, new Date(raw.createdAt));
  }
}
