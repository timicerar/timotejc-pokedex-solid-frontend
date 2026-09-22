import type { JSX } from 'solid-js';

import type { Color } from '~/constants/colors';
import type { TypographyElement, TypographyType } from '~/constants/typography';

export type TypographyProps = Omit<JSX.HTMLAttributes<HTMLElement>, 'style'> & {
  as?: TypographyElement;
  type?: TypographyType;
  color?: Color;
  align?: 'left' | 'center' | 'right';
  italic?: boolean;
  uppercase?: boolean;
  style?: JSX.CSSProperties;
};
