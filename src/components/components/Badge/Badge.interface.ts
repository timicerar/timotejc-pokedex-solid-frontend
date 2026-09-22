import type { JSX } from 'solid-js';

import type { BadgeSize, BadgeVariant } from '~/constants/badge';

export type BadgeProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children?: JSX.Element;
};
