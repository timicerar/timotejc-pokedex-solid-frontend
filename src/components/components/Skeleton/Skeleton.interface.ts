import type { JSX } from 'solid-js';

export type SkeletonProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  borderRadius?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
};
