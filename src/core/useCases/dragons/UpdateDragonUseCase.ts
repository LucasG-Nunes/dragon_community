import type { Dragon } from "../../entities/Dragon";
import type { IDragonService } from "../../ports/out/IDragonService";

export class UpdateDragonUseCase {
  private dragonService: IDragonService;
  constructor(dragonService: IDragonService) {
    this.dragonService = dragonService;
  }

  async execute(id: string, dragonData: Partial<Dragon>): Promise<void> {
    await this.dragonService.update(id, dragonData);
  }
}
