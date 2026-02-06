import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DeleteDragonUseCase } from "../../core/useCases/dragons/DeleteDragonUseCase";
import { dragonService } from "../../infrastructure/instance";

export const useDeleteDragon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const useCase = new DeleteDragonUseCase(dragonService);
      return await useCase.execute(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dragons"] });
    },
  });
};
