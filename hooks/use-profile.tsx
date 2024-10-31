import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  const {
    data: profile,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get("/users/me");
      return response.data;
    },
  });
  return {
    profile,
    error,
    isLoading,
  };
}
