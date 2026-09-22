import { createContext } from 'solid-js';

import { Colors } from '~/constants/colors';
import { type ThemeContextType, Themes } from '~/theme/Theme.interface';

export const ThemeContext = createContext<ThemeContextType>({
  theme: () => Themes.LIGHT,
  setTheme: () => {},
  toggleTheme: () => {},
  cssVariable: Colors,
});
