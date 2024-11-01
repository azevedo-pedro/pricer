import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTickers } from "./api";

export const useDeletePrice = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (ids: string[] | null) => await deleteTickers(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prices"] });
      toast.success("Ativo deletedo");
    },
    onError: () => {
      toast.error("Falha ao deletar o ativo");
    },
  });
  return mutation;
};
