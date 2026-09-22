import type { Accessor } from 'solid-js';

import type { Colors } from '~/constants/colors';

export const Themes = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Theme = (typeof Themes)[keyof typeof Themes];

export type ThemeContextType = {
  theme: Accessor<Theme>;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  cssVariable: typeof Colors;
};
