import { createVirtualizer } from '@tanstack/solid-virtual';
import { createEffect, createSignal, onMount } from 'solid-js';

type UseInfiniteVirtualizerOptions = {
  itemCount: () => number;
  columnCount?: () => number;
  estimateRowSize?: number;
  overscan?: number;
  gap?: number;
  hasNextPage?: () => boolean | undefined;
  isFetchingNextPage?: () => boolean | undefined;
  fetchNextPage: () => void;
  getScrollElement: () => Element | null;
};

export const useInfiniteVirtualizer = ({
  itemCount,
  columnCount = () => 1,
  estimateRowSize = 260,
  overscan = 3,
  gap = 0,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  getScrollElement,
}: UseInfiniteVirtualizerOptions) => {
  const rowCount = () =>
    Math.ceil((itemCount() + (hasNextPage?.() ? 1 : 0)) / columnCount());

  const [isMounted, setIsMounted] = createSignal(false);
  onMount(() => setIsMounted(true));

  const rowVirtualizer = createVirtualizer({
    get count() {
      return rowCount();
    },
    getScrollElement: () => (isMounted() ? getScrollElement() : null),
    estimateSize: () => estimateRowSize,
    overscan,
    gap,
  });

  rowVirtualizer.shouldAdjustScrollPositionOnItemSizeChange = () => false;

  createEffect(() => {
    const virtualRows = rowVirtualizer.getVirtualItems();
    const lastVirtualRow = virtualRows[virtualRows.length - 1];

    if (!lastVirtualRow) return;

    if (
      lastVirtualRow.index >= rowCount() - 1 &&
      hasNextPage?.() &&
      !isFetchingNextPage?.()
    ) {
      fetchNextPage();
    }
  });

  return {
    rowVirtualizer,
    rowCount,
  };
};
