import { createContext, useContext, ReactNode } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { TickerProps } from "@/features/price/api/api";
import { useCallback, useEffect, useMemo } from "react";
import { useGetPrices } from "@/features/price/api/use-get-price";

interface WebSocketState {
  sendMessage: (message: string, binary?: boolean | undefined) => void;
  lastJsonMessage: TickerProps | null;
  readyState: ReadyState;
  subscribeToTicker: (ticker: string) => void;
  unsubscribeFromTicker: (ticker: string) => void;
}

const WebSocketContext = createContext<WebSocketState | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const { sendMessage, lastJsonMessage, readyState } =
    useWebSocket<TickerProps>("ws://35.222.114.197:8765", {
      shouldReconnect: () => true,
      onOpen: () => console.log("WebSocket connection is open"),
      onClose: () => console.log("WebSocket connection closed"),
    });

  const prices = useGetPrices();

  const data = useMemo(() => {
    return prices.data || ([] as TickerProps[]);
  }, [prices.data]);

  const subscribeToTicker = useCallback(
    (ticker: string) => {
      const indexData = data.findIndex((price) => price.ticker === ticker);
      if (indexData - 1) sendMessage(`sqt ${ticker}`, false);
      return null;
    },
    [sendMessage, data]
  );

  const unsubscribeFromTicker = useCallback(
    (ticker: string) => {
      const indexData = data.filter((price) => price.ticker === ticker);
      if (indexData.length === 1) sendMessage(`uqt ${ticker}`, false);
      return null;
    },
    [sendMessage, data]
  );

  useEffect(() => {
    const filterUnique = (array: TickerProps[], key: keyof TickerProps) => {
      const seen = new Set();
      return array.filter((item) => {
        const value = item[key];
        if (!seen.has(value)) {
          seen.add(value);
          return true;
        }
        return false;
      });
    };

    const uniqueArray = filterUnique(data, "ticker");
    if (lastJsonMessage === null) {
      uniqueArray.forEach(
        ({ ticker }) => ticker !== "" && sendMessage(`sqt ${ticker}`, false)
      );
    }
  }, [data, lastJsonMessage, sendMessage, readyState]);

  const value = {
    sendMessage,
    lastJsonMessage,
    readyState,
    subscribeToTicker,
    unsubscribeFromTicker,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook to use the WebSocket context
export const useWebSocketClient = (): WebSocketState => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error(
      "useWebSocketClient must be used within a WebSocketProvider"
    );
  }
  return context;
};
