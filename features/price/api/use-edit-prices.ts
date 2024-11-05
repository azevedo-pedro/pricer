import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTicker } from "./api";

export const useEditPrices = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateTicker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prices"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Falha ao Atualizar o ativo");
    },
  });
  return mutation;
};
