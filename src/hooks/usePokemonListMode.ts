import { useSearchParams } from '@solidjs/router';
import { createMemo } from 'solid-js';

export const usePokemonListMode = () => {
  const [searchParams] = useSearchParams();

  return createMemo(() => {
    const maxItemsParam = searchParams.maxItems;
    const limitParam = searchParams.limit;
    const maxItems = maxItemsParam ? Number(maxItemsParam) : null;
    const limit = limitParam ? Number(limitParam) : null;

    return {
      isVirtualized: maxItems === null,
      maxItems,
      limit,
    };
  });
};
