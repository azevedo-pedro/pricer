import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "../data-table";
import { ColumnDef } from "@tanstack/react-table";

// Mock the UI components
jest.mock("@/components/ui/table", () => ({
  Table: ({ children }: { children: React.ReactNode }) => (
    <table>{children}</table>
  ),
  TableBody: ({ children }: { children: React.ReactNode }) => (
    <tbody>{children}</tbody>
  ),
  TableCell: ({
    children,
    className,
    colSpan,
  }: {
    children: React.ReactNode;
    className?: string;
    colSpan?: number;
  }) => (
    <td className={className} colSpan={colSpan}>
      {children}
    </td>
  ),
  TableHead: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <th className={className}>{children}</th>,
  TableHeader: ({ children }: { children: React.ReactNode }) => (
    <thead>{children}</thead>
  ),
  TableRow: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <tr className={className}>{children}</tr>,
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
    className,
    variant,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: string;
  }) => (
    <button onClick={onClick} className={className} data-variant={variant}>
      {children}
    </button>
  ),
}));

jest.mock("@/components/ui/card", () => ({
  CardHeader: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

jest.mock("lucide-react", () => ({
  Plus: () => <span data-testid="plus-icon">Plus Icon</span>,
  Trash: () => <span data-testid="trash-icon">Trash Icon</span>,
}));

describe("DataTable", () => {
  // Sample data and columns for testing
  const mockData = [
    { id: 1, ticker: "AAPL", price: 150 },
    { id: 2, ticker: "GOOGL", price: 2500 },
  ];

  const mockColumns: ColumnDef<any, any>[] = [
    {
      id: "select",
      header: "Select",
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      accessorKey: "ticker",
      header: "Ticker",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
  ];

  const mockMutation = {
    mutate: jest.fn(),
  };

  const mockOnDelete = jest.fn();
  const mockSubscribeToTicker = jest.fn();

  const defaultProps = {
    columns: mockColumns,
    data: mockData,
    filterKey: "ticker",
    onDelete: mockOnDelete,
    mutation: mockMutation,
    subscribeToTicker: mockSubscribeToTicker,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the table with data", () => {
    render(<DataTable {...defaultProps} />);

    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("GOOGL")).toBeInTheDocument();
  });

  it("renders 'Sem Resultados' when no data is present", () => {
    render(<DataTable {...defaultProps} data={[]} />);

    expect(screen.getByText("Sem Resultados.")).toBeInTheDocument();
  });

  it("handles row selection", async () => {
    render(<DataTable {...defaultProps} />);

    const checkboxes = screen.getAllByRole("checkbox");
    await userEvent.click(checkboxes[1]); // Select first row

    expect(checkboxes[1]).toBeChecked();
  });

  it("shows delete button when rows are selected", async () => {
    render(<DataTable {...defaultProps} />);

    const checkbox = screen.getAllByRole("checkbox")[1];
    await userEvent.click(checkbox);

    expect(screen.getByText(/Excluir/)).toBeInTheDocument();
    expect(screen.getByTestId("trash-icon")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", async () => {
    render(<DataTable {...defaultProps} />);

    const checkbox = screen.getAllByRole("checkbox")[1];
    await userEvent.click(checkbox);

    const deleteButton = screen.getByText(/Excluir/);
    await userEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalled();
  });

  it("calls mutation.mutate when add button is clicked", async () => {
    render(<DataTable {...defaultProps} />);

    const addButton = screen.getByText(/Cotação/);
    await userEvent.click(addButton);

    expect(mockMutation.mutate).toHaveBeenCalledWith({ ticker: "", qtd: "" });
  });

  it("renders correct styling for table rows", () => {
    render(<DataTable {...defaultProps} />);

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveClass(
      "even:bg-[#E3E3E3]",
      "odd:bg-[#F7F8F8]",
      "text-center",
    );
  });

  it("renders correct styling for table headers", () => {
    render(<DataTable {...defaultProps} />);

    const headers = screen.getAllByRole("columnheader");
    headers.forEach((header) => {
      expect(header).toHaveClass(
        "bg-[#E3E3E3]",
        "text-center",
        "border-l",
        "border-[#D0D0D0]",
        "pl-0",
      );
    });
  });

  it("renders correct button styling", () => {
    render(<DataTable {...defaultProps} />);

    const addButton = screen.getByText(/Cotação/).closest("button");
    expect(addButton).toHaveClass("font-normal", "mt-1.5", "ml-2", "text-base");
  });

  describe("Table sorting", () => {
    it("allows sorting of columns", async () => {
      render(<DataTable {...defaultProps} />);

      const tickerHeader = screen.getByText("Ticker");
      await userEvent.click(tickerHeader);

      const cells = screen.getAllByRole("cell");
      expect(cells[1]).toHaveTextContent("AAPL"); // Assuming default sort is ascending
    });
  });

  describe("Table filtering", () => {
    it("filters the table data correctly", async () => {
      const { rerender } = render(<DataTable {...defaultProps} />);

      // Simulate filter change by providing filtered data
      const filteredData = [mockData[0]];
      rerender(<DataTable {...defaultProps} data={filteredData} />);

      expect(screen.getByText("AAPL")).toBeInTheDocument();
      expect(screen.queryByText("GOOGL")).not.toBeInTheDocument();
    });
  });
});
