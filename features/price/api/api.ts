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
  const existingTickerIndex = tickers.findIndex(
    (t) => t.ticker === ticker.ticker
  );
  if (existingTickerIndex === -1) {
    throw new Error(`Ticker with id "${ticker.id}" does not exist.`);
  }
  const formaterCurrency = (currency: number) => {
    const formatedCurrency = new Intl.NumberFormat("pt-BR", {
      maximumSignificantDigits: 4,
    }).format(currency);
    return `R$ ${formatedCurrency}`;
  };
  const formaterPerCent = (currency: number) => {
    const formatedCurrency = new Intl.NumberFormat("pt-BR", {
      maximumSignificantDigits: 4,
    }).format(currency);
    return `${formatedCurrency} %`;
  };
  // Update the existing ticker
  const tratedTicker: TickerProps = {
    ...ticker,
    compra: formaterCurrency(Number(ticker.compra)),
    venda: formaterCurrency(Number(ticker.compra)),
    preco: formaterCurrency(Number(ticker.compra)),
    preco_abertura: formaterCurrency(Number(ticker.preco_abertura)),
    variacao: formaterPerCent(Number(ticker.variacao)),
    variacao_12m: formaterPerCent(Number(ticker.variacao_12m)),
    total_price: formaterCurrency(
      Number(ticker.preco) * Number(tickers[existingTickerIndex].qtd)
    ),
  };
  tickers[existingTickerIndex] = {
    ...tickers[existingTickerIndex],
    ...tratedTicker,
  };
  localStorage.setItem("tickers", JSON.stringify(tickers));
  return ticker;
};

export const deleteTickers = async (
  tickerNames: string[] | null
): Promise<TickerProps[]> => {
  const storedTickers = localStorage.getItem("tickers");
  const tickers: TickerProps[] = storedTickers ? JSON.parse(storedTickers) : [];

  const updatedTickers = tickers.filter(
    (t) => !tickerNames?.includes(t.id || "")
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
