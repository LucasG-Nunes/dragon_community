import { Dragon } from "../../entities/Dragon";

export interface IGetDragonsUseCase {
  execute(): Promise<Dragon[]>;
}
