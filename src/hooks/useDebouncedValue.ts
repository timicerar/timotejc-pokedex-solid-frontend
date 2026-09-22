import { createEffect, createSignal, on, onCleanup } from 'solid-js';

export const useDebouncedValue = <T>(value: () => T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = createSignal(value());

  createEffect(
    on(value, (next) => {
      const timeout = setTimeout(() => setDebouncedValue(() => next), delay);
      onCleanup(() => clearTimeout(timeout));
    }),
  );

  return debouncedValue;
};
