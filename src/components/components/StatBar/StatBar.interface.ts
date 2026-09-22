import type { JSX } from 'solid-js';

import type { StatColor } from '~/constants/stat-bar';

export type StatBarProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  label: string;
  color: StatColor;
  value: number;
  maxValue?: number;
  maxWidth?: string | number;
  minWidth?: string | number;
  shimmer?: boolean;
};
