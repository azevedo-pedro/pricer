"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ticker",
    header: ({ column }) => {
      return (
        <div
          className="text-center font-medium text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ativo
        </div>
      );
    },
  },
  {
    accessorKey: "preco",
    header: ({ column }) => {
      return (
        <div
          className="text-center font-medium text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço por ação (R$)
        </div>
      );
    },
  },
  {
    accessorKey: "qtd",
    header: ({ column }) => {
      return (
        <div
          className="text-center font-medium text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantidade
        </div>
      );
    },
  },
  {
    accessorKey: "preco_abertura",
    header: ({ column }) => {
      return (
        <div
          className="text-center font-medium text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Abertura
        </div>
      );
    },
  },
  {
    accessorKey: "ibov",
    header: ({ column }) => {
      return (
        <div
          className="text-center font-medium text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          IBOV %
        </div>
      );
    },
  },
  {
    accessorKey: "variacao",
    header: ({ column }) => {
      return (
        <div
          className="text-center font-medium text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Variação (%)
        </div>
      );
    },
  },
  {
    accessorKey: "variacao_12m",
    header: ({ column }) => {
      return (
        <div
          className="text-center font-medium text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Variação 12m (%)
        </div>
      );
    },
  },
  {
    accessorKey: "lote_minimo",
    header: ({ column }) => {
      return (
        <div
          className="text-center font-medium text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lote mínimo
        </div>
      );
    },
  },
  {
    accessorKey: "venda",
    header: ({ column }) => {
      return (
        <div
          className="text-center font-medium text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Melhor venda
        </div>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: ({ column }) => {
      return (
        <div
          className="text-center font-medium text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço Total
        </div>
      );
    },
  },
];
