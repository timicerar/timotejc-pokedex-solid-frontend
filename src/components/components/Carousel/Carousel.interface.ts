import type {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from 'embla-carousel';
import type { JSX } from 'solid-js';

export type CarouselProps = {
  children: JSX.Element[];
  class?: string;
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  setApi?: (api: EmblaCarouselType | null) => void;
};
