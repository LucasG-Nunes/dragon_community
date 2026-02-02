import { useSuspenseQuery } from "@tanstack/react-query";

import { GetDragonsUseCase } from "../../core/useCases/dragons/GetDragonsUseCase";
import { DragonService } from "../../infrastructure/services/DragonService";

export const useDragons = () => {
  return useSuspenseQuery({
    queryKey: ["dragons"],
    queryFn: async () => {
      const service = new DragonService();
      const useCase = new GetDragonsUseCase(service);
      return await useCase.execute();
    },
  });
};
