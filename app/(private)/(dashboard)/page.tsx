"use client";

import { DataTable } from "@/components/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { columns } from "./columns";
import { useNewPrice } from "@/features/price/hooks/use-new-price";
import { useGetPrices } from "@/features/price/api/use-get-price";
import useWebSocket from "react-use-websocket";
import { useEffect } from "react";
import { useEditPrice } from "@/features/price/api/use-edit-price";

export default function DashboardPage() {
  const { sendMessage, lastJsonMessage } = useWebSocket(
    "ws://35.222.114.197:8765",
    { onClose: () => console.log("connection close") }
  );

  const newPrice = useNewPrice();
  const prices = useGetPrices();
  const editMutation = useEditPrice();
  const pricesData = prices.data || [];
  useEffect(() => {
    if (lastJsonMessage !== null) {
      const existingTickerIndex = pricesData.findIndex(
        (t) => t.ticker === lastJsonMessage?.ticker
      );
      if (existingTickerIndex === -1) {
        return;
      }
      editMutation.mutate(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    prices.data?.forEach((ticker) =>
      sendMessage(`sqt ${ticker.ticker}`, false)
    );
  }, [prices.data?.length]);

  return (
    <div className="min-h-screen">
      <Card className="border-none w-full">
        <CardContent>
          <DataTable
            filterKey="name"
            columns={columns}
            data={pricesData}
            disabled={false}
            onOpen={newPrice.onOpen}
          />
        </CardContent>
      </Card>
    </div>
  );
}
