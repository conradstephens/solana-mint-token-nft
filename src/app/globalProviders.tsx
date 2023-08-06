"use client";

import { ThemeProvider } from "@/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useHydrateAtoms } from "jotai/react/utils";
import { queryClientAtom } from "jotai-tanstack-query";

export default function GlobalProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  // react-query client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: process.env.NODE_ENV === "production",
        refetchOnWindowFocus: false,
      },
    },
  });

  const HydrateAtoms: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    useHydrateAtoms([[queryClientAtom, queryClient]]);
    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <HydrateAtoms>
          {children}
          <ReactQueryDevtools />
        </HydrateAtoms>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
