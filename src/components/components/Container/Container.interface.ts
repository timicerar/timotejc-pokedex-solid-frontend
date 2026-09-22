import type { JSX } from 'solid-js';

export type ContainerProps = JSX.HTMLAttributes<HTMLDivElement> & {
  center?: boolean;
  maxWidth?: number;
  children?: JSX.Element;
};
