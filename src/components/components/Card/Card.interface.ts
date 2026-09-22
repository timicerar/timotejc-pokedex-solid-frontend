import type { JSX } from 'solid-js';

import type { CardPadding } from '~/constants/card';

export type CardProps = Omit<JSX.HTMLAttributes<HTMLElement>, 'ref'> & {
  ref?: (el: HTMLElement) => void;
  padding?: CardPadding;
  fullWidth?: boolean;
  noShadow?: boolean;
  active?: boolean;
  children?: JSX.Element;
};
