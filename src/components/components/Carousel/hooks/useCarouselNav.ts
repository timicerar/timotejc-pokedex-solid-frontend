import type { EmblaCarouselType } from 'embla-carousel';
import { createEffect, createSignal, onCleanup } from 'solid-js';

export const useCarouselNav = () => {
  const [api, setApi] = createSignal<EmblaCarouselType | null>(null);
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  const [scrollSnaps, setScrollSnaps] = createSignal<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = createSignal(false);
  const [canScrollNext, setCanScrollNext] = createSignal(false);

  const scrollTo = (index: number) => api()?.scrollTo(index);
  const scrollPrev = () => api()?.scrollPrev();
  const scrollNext = () => api()?.scrollNext();

  createEffect(() => {
    const instance = api();

    if (!instance) {
      return;
    }

    const onInit = () => setScrollSnaps(instance.scrollSnapList());
    const onSelect = () => {
      setSelectedIndex(instance.selectedScrollSnap());
      setCanScrollPrev(instance.canScrollPrev());
      setCanScrollNext(instance.canScrollNext());
    };

    onInit();
    onSelect();
    instance.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);

    onCleanup(() => {
      instance
        .off('reInit', onInit)
        .off('reInit', onSelect)
        .off('select', onSelect);
    });
  });

  return {
    setApi,
    selectedIndex,
    scrollSnaps,
    canScrollPrev,
    canScrollNext,
    scrollTo,
    scrollPrev,
    scrollNext,
  };
};
