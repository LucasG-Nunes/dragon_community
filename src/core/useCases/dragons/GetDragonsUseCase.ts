import type { Dragon } from "../../entities/Dragon";
import type { IDragonService } from "../../ports/out/IDragonService";

export class GetDragonsUseCase {
  private dragonService: IDragonService;

  constructor(dragonService: IDragonService) {
    this.dragonService = dragonService;
  }

  async execute(): Promise<Dragon[]> {
    return await this.dragonService.fetchAll();
  }
}
