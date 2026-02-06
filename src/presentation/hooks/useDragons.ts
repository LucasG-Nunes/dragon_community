import { useSuspenseQuery } from "@tanstack/react-query";

import { GetDragonsUseCase } from "../../core/useCases/dragons/GetDragonsUseCase";
import { dragonService } from "../../infrastructure/instance";

export const useDragons = () => {
  return useSuspenseQuery({
    queryKey: ["dragons"],
    queryFn: async () => {
      const useCase = new GetDragonsUseCase(dragonService);
      return await useCase.execute();
    },
  });
};
