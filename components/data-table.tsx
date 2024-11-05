import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey: string;
  disabled?: boolean;
  onDelete: (row: any[]) => void;
  mutation: any;
  subscribeToTicker: (ticker: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onDelete,
  mutation,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div>
      <CardHeader className="flex-row h-[60px] bg-[#D0D0D0] pt-1">
        <Button
          className="font-normal mt-1.5 ml-2 text-base "
          onClick={() => mutation.mutate({ ticker: "", qtd: "" })}
        >
          <Plus />
          Cotação
        </Button>
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Button
            variant="secondary"
            className="font-normal ml-2 text-base"
            onClick={async () => {
              onDelete(table.getFilteredSelectedRowModel().rows);
              table.resetRowSelection();
            }}
          >
            <Trash className="size-4 mr-2" />
            Excluir{" "}
            {table.getFilteredSelectedRowModel().rows.length > 0 &&
              `(${table.getFilteredSelectedRowModel().rows.length})`}
          </Button>
        )}
      </CardHeader>
      <div className="rounded-md border">
        <Table className="table-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-[#E3E3E3] text-center border-l border-[#D0D0D0] pl-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="even:bg-[#E3E3E3] odd:bg-[#F7F8F8] text-center "
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border-l border-[#D0D0D0] pl-0 min-w-11 text-base font-normal"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem Resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTable;
