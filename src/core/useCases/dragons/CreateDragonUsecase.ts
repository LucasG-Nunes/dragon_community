import type { Dragon } from "../../entities/Dragon";
import type { IDragonService } from "../../ports/out/IDragonService";

export class CreateDragonUseCase {
  private dragonService: IDragonService;

  constructor(dragonService: IDragonService) {
    this.dragonService = dragonService;
  }

  async execute(dragonData: Partial<Dragon>): Promise<void> {
    await this.dragonService.create(dragonData);
  }
}
