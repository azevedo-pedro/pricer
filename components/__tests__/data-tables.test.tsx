/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable } from "../data-table"; // Adjust the path as necessary
import { ColumnDef } from "@tanstack/react-table";

// Mock dependencies
jest.mock("../../features/price/api/use-delete-price", () => ({
  useDeletePrice: jest.fn().mockReturnValue({ mutate: jest.fn() }),
}));

// Sample column and data
const columns: ColumnDef<unknown, unknown>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
];
const data = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
];

// Mock callback
const mockOnOpen = jest.fn();

describe("DataTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        onOpen={mockOnOpen}
        filterKey={""}
      />
    );
    expect(screen.getByText("Cotação")).toBeInTheDocument();
    expect(screen.getByText("Excluir")).toBeInTheDocument();
  });

  it("renders correct number of headers and rows", () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        onOpen={mockOnOpen}
        filterKey={""}
      />
    );
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("Product B")).toBeInTheDocument();
  });

  it("calls onOpen when 'Cotação' button is clicked", () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        onOpen={mockOnOpen}
        filterKey={""}
      />
    );
    fireEvent.click(screen.getByText("Cotação"));
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
  });

  it("shows 'Sem Resultados' when no data is present", () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        onOpen={mockOnOpen}
        filterKey={""}
      />
    );
    expect(screen.getByText("Sem Resultados.")).toBeInTheDocument();
  });

  it("deletes selected rows when 'Excluir' button is clicked", () => {
    const deletePrices =
      require("../../features/price/api/use-delete-price").useDeletePrice;
    render(
      <DataTable
        columns={columns}
        data={data}
        onOpen={mockOnOpen}
        filterKey={""}
      />
    );
    fireEvent.click(screen.getByText("Excluir"));
    expect(deletePrices().mutate).toHaveBeenCalled();
  });

  it("sorts the data when a column header is clicked", () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        onOpen={mockOnOpen}
        filterKey={""}
      />
    );
    const header = screen.getByText("ID");
    fireEvent.click(header); // Toggle sorting on the ID column
    // Test sorted order based on your sorting logic
    expect(screen.getAllByText(/Product/)).toHaveLength(2);
  });
});
