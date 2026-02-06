import type { IDragonService } from "../../ports/out/IDragonService";

export class DeleteDragonUseCase {
  private dragonService: IDragonService;
  constructor(dragonService: IDragonService) {
    this.dragonService = dragonService;
  }

  async execute(id: string): Promise<void> {
    await this.dragonService.delete(id);
  }
}
