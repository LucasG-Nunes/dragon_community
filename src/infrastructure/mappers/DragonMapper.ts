import { Dragon } from "../../core/entities/Dragon";

export class DragonMapper {
  static toDomain(raw: any): Dragon {
    // temporary any type
    return new Dragon(raw.id, raw.name, raw.type, new Date(raw.createdAt));
  }
}
