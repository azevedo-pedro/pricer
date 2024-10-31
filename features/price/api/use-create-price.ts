import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTicker } from "./api";

export const useCreatePrice = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTicker,
    onSuccess: () => {
      toast.success("Ativo criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["prices"] });
    },
    onError: () => {
      toast.error("Falha ao criar o ativo");
    },
  });
  return mutation;
};
