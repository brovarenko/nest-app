"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>{children}</SessionProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
