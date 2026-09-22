import type { JSX } from 'solid-js';

export type TabProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'value' | 'onClick' | 'onKeyDown'
> & {
  value: string;
  uppercase?: boolean;
  children?: JSX.Element;
  onClick?: (event: MouseEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
};
