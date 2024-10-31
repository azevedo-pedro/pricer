import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTicker } from "./api";

export const useEditPrice = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateTicker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prices"] });
    },
    onError: () => {
      toast.error("Falha ao criar o ativo");
    },
  });
  return mutation;
};
