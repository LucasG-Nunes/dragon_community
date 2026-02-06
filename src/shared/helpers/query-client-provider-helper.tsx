import type React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const createWrapper = (queryClient?: QueryClient) => {
  const client =
    queryClient ??
    new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  };
};
