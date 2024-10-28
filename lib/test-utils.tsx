import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import userEvent from "@testing-library/user-event";

// Create a custom render function that includes providers
function render(
  ui: React.ReactElement,
  {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    }),
    session = null,
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </QueryClientProvider>
    );
  }
  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    user: userEvent.setup(),
  };
}

// Re-export everything
export * from "@testing-library/react";
export { render };
