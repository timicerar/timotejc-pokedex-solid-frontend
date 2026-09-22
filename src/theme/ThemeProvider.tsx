import { createSignal, type ParentComponent } from 'solid-js';

import { Colors } from '~/constants/colors';
import { type Theme, Themes } from '~/theme/Theme.interface';
import { ThemeContext } from '~/theme/ThemeContext';
import { getInitialTheme, storeTheme } from '~/theme/utils/theme-storage';

const ThemeProvider: ParentComponent = (props) => {
  const [theme, setThemeState] = createSignal<Theme>(getInitialTheme());

  const setTheme = (next: Theme) => {
    document.documentElement.setAttribute('data-theme', next);
    storeTheme(next);
    setThemeState(next);
  };

  const toggleTheme = () => {
    setTheme(theme() === Themes.DARK ? Themes.LIGHT : Themes.DARK);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, cssVariable: Colors }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
