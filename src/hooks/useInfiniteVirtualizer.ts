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

  // @tanstack/solid-virtual only re-resolves `getScrollElement()` when its
  // reactive `count` getter is read again. If the query data resolves
  // before this component mounts, `count` reaches its real value while
  // `getScrollElement()` still returns undefined (the ref isn't attached
  // yet) — the virtualizer caches that `null` scroll element permanently
  // and `getVirtualItems()` silently stays empty forever, since nothing
  // else ever forces it to re-check. Gating `count` behind `isMounted`
  // guarantees the virtualizer's first real computation happens only once
  // the scroll ref is definitely attached.
  const [isMounted, setIsMounted] = createSignal(false);
  onMount(() => setIsMounted(true));

  const rowVirtualizer = createVirtualizer({
    get count() {
      return isMounted() ? rowCount() : 0;
    },
    getScrollElement,
    estimateSize: () => estimateRowSize,
    overscan,
    gap,
  });

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
