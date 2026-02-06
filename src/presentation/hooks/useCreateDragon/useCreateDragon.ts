import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Dragon } from "../../../core/entities/Dragon";
import { CreateDragonUseCase } from "../../../core/useCases/dragons/CreateDragonUsecase";
import { dragonService } from "../../../infrastructure/instance";

export const useCreateDragon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newDragon: Partial<Dragon>) => {
      const useCase = new CreateDragonUseCase(dragonService);
      return await useCase.execute(newDragon);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dragons"] });
    },
  });
};
