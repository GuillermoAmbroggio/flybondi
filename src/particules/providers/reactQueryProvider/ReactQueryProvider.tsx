/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { logger } from '../../../utils';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
      onError: (err: any) => {
        logger(err?.response?.data ?? err);
      },
    },
    queries: {
      retry: false,
      onError: (err: any) => {
        logger(err?.response?.data ?? err);
      },
    },
  },
});

interface Props {
  children: React.ReactNode;
}

const ReactQueryProvider: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
