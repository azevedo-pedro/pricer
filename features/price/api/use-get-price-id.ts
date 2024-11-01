import { useQuery } from "@tanstack/react-query";
import { getTickerById } from "./api";

export const useGetPriceId = (id: string | null) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["prices", { id }],
    queryFn: () => getTickerById(id),
  });
  return query;
};
