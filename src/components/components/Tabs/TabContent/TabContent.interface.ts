import type { JSX } from 'solid-js';

export type TabContentProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  value: string;
  hideOutline?: boolean;
  children?: JSX.Element;
};
