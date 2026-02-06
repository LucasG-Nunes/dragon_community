import type { Dragon } from "../../entities/Dragon";
import type { IGetDragonsUseCase } from "../../ports/in/IGetDragonUseCase";
import type { IDragonService } from "../../ports/out/IDragonService";

export class GetDragonsUseCase implements IGetDragonsUseCase {
  private dragonService: IDragonService;

  constructor(dragonService: IDragonService) {
    this.dragonService = dragonService;
  }

  async execute(): Promise<Dragon[]> {
    return await this.dragonService.fetchAll();
  }
}
