"use client";

import { DataTable } from "@/components/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { columns } from "./columns";
import { useNewPrice } from "@/features/price/hooks/use-new-price";

export default function DashboardPage() {
  const newPrice = useNewPrice();

  const prices = [
    {
      ticker: "PETR3",
      preco: "R$ 44.12",
      quantidade: 4000,
      preco_abertura: "R$ 45.19",
      ibov: "1.546%",
      variacao: "1.26%",
      variacao_12m: "-14.39%",
      lote_minimo: 100,
      compra: "R$ 42.15",
      venda: "R$ 45.19",
      total_price: "R$ 172,720.00",
    },
    {
      ticker: "HYPE3",
      preco: "R$ 39.09",
      quantidade: 900,
      preco_abertura: "R$ 35.33",
      ibov: "0.525%",
      variacao: "2.89%",
      variacao_12m: "-14.15%",
      lote_minimo: 100,
      compra: "R$ 34.42",
      venda: "R$ 39.22",
      total_price: "R$ 35,854.00",
    },
  ];
  return (
    <div className="min-h-screen">
      <Card className="border-none w-full">
        <CardContent>
          <DataTable
            filterKey="name"
            columns={columns}
            data={prices}
            disabled={false}
            onOpen={newPrice.onOpen}
          />
        </CardContent>
      </Card>
    </div>
  );
}
