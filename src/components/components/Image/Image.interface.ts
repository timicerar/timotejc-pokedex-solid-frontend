import type { JSX } from 'solid-js';

export type ImageProps = Omit<
  JSX.ImgHTMLAttributes<HTMLImageElement>,
  'alt' | 'onLoad' | 'onError'
> & {
  alt: string;
  wrapperClass?: string;
  borderRadius?: string | number;
  onLoad?: (event: Event) => void;
  onError?: (event: Event) => void;
};
