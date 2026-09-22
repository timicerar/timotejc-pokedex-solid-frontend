import type { JSX } from 'solid-js';

import type { ButtonSize, ButtonVariant } from '~/constants/button';

export type ButtonProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  ariaLabel?: string;
  fullWidth?: boolean;
  leadingIcon?: JSX.Element;
  trailingIcon?: JSX.Element;
  children?: JSX.Element;
};
