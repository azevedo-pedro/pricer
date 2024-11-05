"use client";

import { DataTable } from "@/components/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { columns } from "./columns";
import { useDeletePrice } from "@/features/price/api/use-delete-price";

import { useGetPrices } from "@/features/price/api/use-get-price";
import { useEffect } from "react";
import { useEditPrices } from "@/features/price/api/use-edit-prices";
import { useWebSocketClient } from "@/providers/websocket-provider";
import { useCreatePrice } from "@/features/price/api/use-create-price";

export default function DashboardPage() {
  const prices = useGetPrices();
  const editMutation = useEditPrices();
  const deletePrices = useDeletePrice();
  const createPrice = useCreatePrice();

  const pricesData = prices.data || [];

  const { lastJsonMessage, subscribeToTicker, unsubscribeFromTicker } =
    useWebSocketClient();

  const onDelete = (row: any[]) => {
    const ids = row.map((r) => r.original.id);
    row.forEach((r) => unsubscribeFromTicker(r.original.ticker));
    deletePrices.mutate(ids);
  };

  useEffect(() => {
    if (lastJsonMessage !== null) {
      editMutation.mutate(lastJsonMessage);
    }
    // filteredPrices.forEach(({ ticker }) => unsubscribeFromTicker(ticker));
  }, [lastJsonMessage]);

  return (
    <div className="min-h-screen">
      <Card className="border-none w-full">
        <CardContent>
          <DataTable
            filterKey="name"
            columns={columns}
            data={pricesData}
            disabled={false}
            onDelete={onDelete}
            mutation={createPrice}
            subscribeToTicker={subscribeToTicker}
          />
        </CardContent>
      </Card>
    </div>
  );
}
