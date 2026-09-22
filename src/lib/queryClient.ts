import { QueryClient } from '@tanstack/solid-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const prefetchQuery = (
  options: Parameters<typeof queryClient.query>[0],
) => {
  queryClient.query(options).catch(() => {});
};

export const prefetchInfiniteQuery = (
  options: Parameters<typeof queryClient.infiniteQuery>[0],
) => {
  queryClient.infiniteQuery(options).catch(() => {});
};
