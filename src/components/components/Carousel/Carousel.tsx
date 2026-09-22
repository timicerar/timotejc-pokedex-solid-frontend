import createEmblaCarousel from 'embla-carousel-solid';
import { createEffect, For } from 'solid-js';

import type { CarouselProps } from '~/components/components/Carousel/Carousel.interface';
import classes from './Carousel.module.scss';

const Carousel = (props: CarouselProps) => {
  const [setEmblaRef, emblaApi] = createEmblaCarousel(
    () => props.options ?? {},
    () => props.plugins ?? [],
  );

  createEffect(() => {
    props.setApi?.(emblaApi() ?? null);
  });

  return (
    <div
      classList={{
        [classes.container]: true,
        ...(props.class ? { [props.class]: true } : {}),
      }}
      ref={setEmblaRef}
    >
      <div class={classes.track}>
        <For each={props.children}>
          {(child) => <div class={classes.slide}>{child}</div>}
        </For>
      </div>
    </div>
  );
};

export default Carousel;
