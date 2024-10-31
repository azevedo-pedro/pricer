"use client";

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
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey: string;
  disabled?: boolean;
  onOpen: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onOpen,
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
  const onDelete = (row) => {
    const ids = row.map((r) => r.original.id);
    // deleteAccounts.mutate({ ids });
  };

  return (
    <div>
      <CardHeader className="flex-row h-[60px] bg-[#D0D0D0] pt-1">
        <Button className="font-normal mt-1.5 ml-2" onClick={() => onOpen()}>
          <Plus />
          Cotação
        </Button>
        <Button
          variant="secondary"
          className="font-normal ml-2"
          onClick={async () => {
            const ok = await confirm();
            if (ok) {
              onDelete(table.getFilteredSelectedRowModel().rows);
              table.resetRowSelection();
            }
          }}
        >
          <Trash className="size-4 mr-2" />
          Excluir{" "}
          {table.getFilteredSelectedRowModel().rows.length > 0 &&
            `(${table.getFilteredSelectedRowModel().rows.length})`}
        </Button>
      </CardHeader>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-[#E3E3E3] text-center"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="even:bg-[#E3E3E3] odd:bg-[#F7F8F8] text-center"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.id.includes("total_price") ? (
                        <div className="font-bold">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      ) : (
                        <>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
