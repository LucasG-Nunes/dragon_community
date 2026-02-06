import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Dragon } from "../../core/entities/Dragon";
import { UpdateDragonUseCase } from "../../core/useCases/dragons/UpdateDragonUseCase";
import { dragonService } from "../../infrastructure/instance";

export const useUpdateDragon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Dragon> }) => {
      const useCase = new UpdateDragonUseCase(dragonService);
      return await useCase.execute(id, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["dragons"] });
      queryClient.invalidateQueries({ queryKey: ["dragon", variables.id] });
    },
  });
};
