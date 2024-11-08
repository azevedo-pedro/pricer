import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTickerQtd } from "./api";

export const useEditPriceTickerQtd = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateTickerQtd,
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
