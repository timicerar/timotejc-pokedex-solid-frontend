import type { JSX } from 'solid-js';

export type InputProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  type?: 'text';
  leadingIcon?: JSX.Element;
  trailingIcon?: JSX.Element;
  maxWidth?: string | number;
};
