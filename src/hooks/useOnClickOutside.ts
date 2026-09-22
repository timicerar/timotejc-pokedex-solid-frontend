import { createEffect, on, onCleanup } from 'solid-js';

export const useOnClickOutside = (
  ref: () => HTMLElement | undefined,
  handler: () => void,
  enabled: () => boolean = () => true,
) => {
  createEffect(
    on(enabled, (isEnabled) => {
      if (!isEnabled) {
        return;
      }

      const listener = (event: MouseEvent | TouchEvent) => {
        const el = ref();

        if (!el || el.contains(event.target as Node)) {
          return;
        }

        handler();
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      onCleanup(() => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      });
    }),
  );
};
