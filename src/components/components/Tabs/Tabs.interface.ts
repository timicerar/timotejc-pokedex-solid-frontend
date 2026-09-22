import type { JSX } from 'solid-js';

export type TabsProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> & {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: JSX.Element;
};
