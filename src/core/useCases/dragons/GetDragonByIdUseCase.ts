import type { Dragon } from "../../entities/Dragon";
import type { IDragonService } from "../../ports/out/IDragonService";

export class GetDragonByIdUseCase {
  private dragonService: IDragonService;

  constructor(dragonService: IDragonService) {
    this.dragonService = dragonService;
  }

  async execute(id: string): Promise<Dragon> {
    return await this.dragonService.fetchById(id);
  }
}
