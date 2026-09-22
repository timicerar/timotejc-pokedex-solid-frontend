import {
  type Accessor,
  createEffect,
  createSignal,
  on,
  onCleanup,
} from 'solid-js';

export const useMountTransition = (
  isOpen: Accessor<boolean>,
  unmountDelay: number,
) => {
  const [hasTransitionedIn, setHasTransitionedIn] = createSignal(false);

  createEffect(
    on(isOpen, (open) => {
      if (open) {
        setHasTransitionedIn(true);
        return;
      }

      const timeoutId = setTimeout(
        () => setHasTransitionedIn(false),
        unmountDelay,
      );

      onCleanup(() => clearTimeout(timeoutId));
    }),
  );

  return hasTransitionedIn;
};
