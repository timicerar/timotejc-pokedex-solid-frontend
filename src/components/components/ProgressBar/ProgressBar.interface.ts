import type { JSX } from 'solid-js';

import type { ColorValue } from '~/constants/colors';

export type ProgressBarProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  value: number;
  maxValue?: number;
  color: ColorValue;
  maxWidth?: string | number;
  shimmer?: boolean;
};
