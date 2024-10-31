import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

// Define the ticker schema and type
const tickerSchema = z.object({
  ticker: z.string(),
  qtd: z.string(),
  id: z.string(),
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
export const addTicker = async (
  ticker: Omit<TickerProps, "id">
): Promise<TickerProps> => {
  const storedTickers = localStorage.getItem("tickers");
  const tickers: TickerProps[] = storedTickers
    ? (JSON.parse(storedTickers) as TickerProps[])
    : [];

  // Check if the ticker with the same id already exists to prevent duplicates
  const existingTicker = tickers.find((t) => t.ticker === ticker.ticker);
  if (existingTicker) {
    throw new Error(`Ativo com esse nome "${ticker.ticker}" já existe.`);
  }

  // Add new ticker with a unique id
  const newTicker: TickerProps = { ...ticker, id: createId() };
  tickers.push(newTicker);

  localStorage.setItem("tickers", JSON.stringify(tickers));
  return newTicker;
};

// Update an existing ticker in localStorage
export const updateTicker = async (
  ticker: TickerProps
): Promise<TickerProps> => {
  const storedTickers = localStorage.getItem("tickers");
  const tickers: TickerProps[] = storedTickers
    ? (JSON.parse(storedTickers) as TickerProps[])
    : [];

  // Find index of the ticker with the provided id
  const existingTickerIndex = tickers.findIndex((t) => t.id === ticker.id);
  if (existingTickerIndex === -1) {
    throw new Error(`Ticker with id "${ticker.id}" does not exist.`);
  }

  // Update the existing ticker
  tickers[existingTickerIndex] = { ...tickers[existingTickerIndex], ...ticker };
  localStorage.setItem("tickers", JSON.stringify(tickers));
  return ticker;
};
