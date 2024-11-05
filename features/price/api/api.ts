import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

// Define the ticker schema and type
export const tickerSchema = z.object({
  ticker: z.string(),
  qtd: z.string(),
  id: z.string().optional(),
  compra: z.string().optional(),
  lote_minimo: z.string().optional(),
  preco: z.string().optional(),
  preco_abertura: z.string().optional(),
  variacao: z.string().optional(),
  variacao_12m: z.string().optional(),
  venda: z.string().optional(),
  total_price: z.string().optional(),
});

export type TickerProps = z.input<typeof tickerSchema>;

// Initialize localStorage data if it doesn't exist
export const initializeLocalStorage = () => {
  if (!localStorage.getItem("tickers")) {
    const initialData: TickerProps[] = [];
    localStorage.setItem("tickers", JSON.stringify(initialData));
  }
};

// Fetch tickers from localStorage
export const fetchTickers = async (): Promise<TickerProps[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const storedTickers = localStorage.getItem("tickers");
  return storedTickers ? (JSON.parse(storedTickers) as TickerProps[]) : [];
};

// Add a new ticker to localStorage
export const addTicker = async (ticker: TickerProps): Promise<TickerProps> => {
  const storedTickers = localStorage.getItem("tickers");
  const tickers: TickerProps[] = storedTickers
    ? (JSON.parse(storedTickers) as TickerProps[])
    : [];

  // Check if the ticker with the same id already exists to prevent duplicates
  const existingTicker = tickers.find((t) => t.id === ticker.id);
  if (existingTicker) {
    throw new Error(`Ativo com esse nome "${ticker.id}" já existe.`);
  }

  // Add new ticker with a unique id
  const newTicker: TickerProps = { ...ticker, id: createId() };
  tickers.push(newTicker);

  localStorage.setItem("tickers", JSON.stringify(tickers));
  return newTicker;
};

// Update an existing ticker in localStorage
export const updateTicker = async (
  ticker: TickerProps,
): Promise<TickerProps> => {
  const storedTickers = localStorage.getItem("tickers");
  const tickers: TickerProps[] = storedTickers
    ? (JSON.parse(storedTickers) as TickerProps[])
    : [];

  // Find index of the ticker with the provided id
  const existingTickerIndex = tickers.findIndex(
    (t) => t.ticker === ticker?.ticker,
  );

  if (existingTickerIndex === -1) {
    throw new Error(`Ticker with id "${ticker.ticker}" does not exist.`);
  }

  // Update the existing ticker
  function updateObjectsWithSameTicker(data, ticker, updates) {
    return data.map((obj) => {
      if (obj.ticker === ticker) {
        return { ...obj, ...updates };
      }
      return obj;
    });
  }

  const newTickers = updateObjectsWithSameTicker(
    tickers,
    ticker.ticker,
    ticker,
  );
  localStorage.setItem("tickers", JSON.stringify(newTickers));
  return ticker;
};

export const deleteTickers = async (
  tickerNames: string[] | null,
): Promise<TickerProps[]> => {
  const storedTickers = localStorage.getItem("tickers");
  const tickers: TickerProps[] = storedTickers ? JSON.parse(storedTickers) : [];

  const updatedTickers = tickers.filter(
    (t) => !tickerNames?.includes(t.id || ""),
  );

  localStorage.setItem("tickers", JSON.stringify(updatedTickers));
  return updatedTickers;
};

export const getTickerById = async (id: string | null) => {
  const storedTickers = localStorage.getItem("tickers");
  const tickers: TickerProps[] = storedTickers
    ? (JSON.parse(storedTickers) as TickerProps[])
    : [];

  const tickerId = tickers.filter((t) => t.id?.includes(id || ""));
  return tickerId[0];
};

export const updateTickerQtd = async (
  ticker: Pick<TickerProps, "ticker" | "qtd" | "id">,
): Promise<TickerProps> => {
  const storedTickers = localStorage.getItem("tickers");
  const tickers: TickerProps[] = storedTickers
    ? (JSON.parse(storedTickers) as TickerProps[])
    : [];

  // Find index of the ticker with the provided ticker name
  const existingTickerIndex = tickers.findIndex((t) => t.id === ticker.id);

  if (existingTickerIndex === -1) {
    throw new Error(`Ticker "${ticker.id}" does not exist.`);
  }

  // Preserve existing ticker data and only update ticker and qtd
  const existingTicker = tickers[existingTickerIndex];
  const updatedTicker = {
    ...existingTicker,
    ticker: ticker.ticker,
    qtd: ticker.qtd,
  };

  // Update the ticker in the array
  tickers[existingTickerIndex] = updatedTicker;

  // Save to localStorage
  localStorage.setItem("tickers", JSON.stringify(tickers));

  return updatedTicker;
};
