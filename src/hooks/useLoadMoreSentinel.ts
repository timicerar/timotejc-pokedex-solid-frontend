import { createVisibilityObserver } from '@solid-primitives/intersection-observer';
import { createEffect, createSignal, on } from 'solid-js';

type UseLoadMoreSentinelParams = {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
};

export const useLoadMoreSentinel = (
  params: () => UseLoadMoreSentinelParams,
) => {
  const [sentinel, setSentinel] = createSignal<Element>();
  const useVisibility = createVisibilityObserver();
  const isVisible = useVisibility(sentinel);

  createEffect(
    on(isVisible, (visible, prevVisible) => {
      const justEnteredView = visible && !prevVisible;
      const { hasNextPage, isFetchingNextPage, fetchNextPage } = params();

      if (justEnteredView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }),
  );

  return setSentinel;
};
