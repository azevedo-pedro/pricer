import { useQuery } from "@tanstack/react-query";
import { fetchTickers, TickerProps } from "./api";

export const useGetPrices = () => {
  const query = useQuery<TickerProps[], Error>({
    queryKey: ["prices"],
    queryFn: fetchTickers,
  });

  return query;
};
