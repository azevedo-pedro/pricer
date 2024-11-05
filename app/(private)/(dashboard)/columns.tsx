"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { TickerProps } from "@/features/price/api/api";
import { ColumnDef } from "@tanstack/react-table";
import { formaterCurrency, formaterPerCent } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useEditPriceTickerQtd } from "@/features/price/api/use-edit-price";
import { useWebSocketClient } from "@/providers/websocket-provider";

export type ResponseType = TickerProps;

interface HeaderProps {
  column: {
    getIsSorted: () => string | false;
    toggleSorting: (ascending: boolean) => void;
  };
}

interface CheckboxHeaderProps {
  table: {
    getIsAllPageRowsSelected: () => boolean;
    getIsSomePageRowsSelected: () => boolean;
    toggleAllPageRowsSelected: (value: boolean) => void;
  };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditableTickerCell = ({ getValue, row }) => {
  const [value, setValue] = useState<string>(getValue());
  const { subscribeToTicker } = useWebSocketClient();
  const editMutation = useEditPriceTickerQtd();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onSave = (): void => {
    if (value !== "" && value.length >= 4) subscribeToTicker(value);
    editMutation.mutate({ ...row.original, ticker: value });
  };

  const onCancel = (): void => {
    setValue(getValue());
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout and store the reference
    timeoutRef.current = setTimeout(onSave, 1000);
    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);
  return (
    <div className="flex items-center justify-center gap-2 min-w-[158px]">
      <input
        value={value}
        disabled={!!row.original.preco}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value.toUpperCase())
        }
        className="w-[158px] font-normal text-center text-base px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") onSave();
          if (e.key === "Escape") onCancel();
        }}
      />
    </div>
  );
};

const EditableQtdCell = ({ getValue, row }) => {
  const [value, setValue] = useState<string>(getValue());
  const editMutation = useEditPriceTickerQtd();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onSave = (): void => {
    editMutation.mutate({ ...row.original, qtd: value });
  };

  const onCancel = (): void => {
    setValue(value);
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout and store the reference
    timeoutRef.current = setTimeout(onSave, 1000);
    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  return (
    <div className="flex items-center justify-center gap-2 min-w-[158px]">
      <input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value.toUpperCase())
        }
        className="w-[158px] font-normal text-center px-2 py-1 text-base border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") onSave();
          if (e.key === "Escape") onCancel();
        }}
      />
    </div>
  );
};

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "select",
    header: ({ table }: CheckboxHeaderProps) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="size-7"
      />
    ),
    cell: ({
      row,
    }: {
      row: {
        getIsSelected: () => boolean;
        toggleSelected: (value: boolean) => void;
      };
    }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="size-7"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ticker",
    header: ({ column }: HeaderProps) => {
      return (
        <div
          className="text-center font-normal text-black text-base min-w-[158px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ativo
        </div>
      );
    },
    cell: EditableTickerCell,
  },
  {
    accessorKey: "preco",
    header: ({ column }: HeaderProps) => {
      return (
        <div
          className="text-center font-normal text-black text-base"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço por ação (R$)
        </div>
      );
    },
    cell: ({ row }) => <div>{formaterCurrency(row.getValue("preco"))}</div>,
  },
  {
    accessorKey: "qtd",
    header: ({ column }: HeaderProps) => {
      return (
        <div
          className="text-center font-normal text-black text-base min-w-[158px]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantidade
        </div>
      );
    },
    cell: EditableQtdCell,
  },
  {
    accessorKey: "preco_abertura",
    header: ({ column }: HeaderProps) => {
      return (
        <div
          className="text-center font-normal text-black text-base"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Abertura
        </div>
      );
    },
    cell: ({ row }) => (
      <div>{formaterCurrency(row.getValue("preco_abertura"))}</div>
    ),
  },
  {
    accessorKey: "ibov",
    header: ({ column }: HeaderProps) => {
      return (
        <div
          className="text-center font-normal text-black text-base"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          IBOV %
        </div>
      );
    },
  },
  {
    accessorKey: "variacao",
    header: ({ column }: HeaderProps) => {
      return (
        <div
          className="text-center font-normal text-black text-base"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Variação (%)
        </div>
      );
    },
    cell: ({ row }) => (
      <div>{formaterPerCent(Number(row.getValue("variacao")) * 100)}</div>
    ),
  },
  {
    accessorKey: "variacao_12m",
    header: ({ column }: HeaderProps) => {
      return (
        <div
          className="text-center font-normal text-black text-base"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Variação 12m (%)
        </div>
      );
    },
    cell: ({ row }) => (
      <div>{formaterPerCent(Number(row.getValue("variacao_12m")) * 100)}</div>
    ),
  },
  {
    accessorKey: "lote_minimo",
    header: ({ column }: HeaderProps) => {
      return (
        <div
          className="text-center font-normal text-black text-base"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lote mínimo
        </div>
      );
    },
  },
  {
    accessorKey: "compra",
    header: ({ column }: HeaderProps) => {
      return (
        <div
          className="text-center font-normal text-black text-base"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Melhor compra
        </div>
      );
    },
    cell: ({ row }) => <div>{formaterCurrency(row.getValue("compra"))}</div>,
  },
  {
    accessorKey: "venda",
    header: ({ column }: HeaderProps) => {
      return (
        <div
          className="text-center font-normal text-black text-base"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Melhor venda
        </div>
      );
    },
    cell: ({ row }) => <div>{formaterCurrency(row.getValue("venda"))}</div>,
  },
  {
    accessorKey: "total_price",
    header: ({ column }: HeaderProps) => {
      return (
        <div
          className="text-center font-normal text-black text-base"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço Total
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="font-bold">
        {formaterCurrency(
          Number(row.getValue("qtd")) * Number(row.getValue("preco")),
        )}
      </div>
    ),
  },
];
