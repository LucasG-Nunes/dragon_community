import { useSuspenseQuery } from "@tanstack/react-query";

import { GetDragonByIdUseCase } from "../../core/useCases/dragons/GetDragonByIdUseCase";
import { dragonService } from "../../infrastructure/instance";

export const useDragon = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["dragon", id],
    queryFn: async () => {
      const useCase = new GetDragonByIdUseCase(dragonService);
      return await useCase.execute(id);
    },
  });
};
