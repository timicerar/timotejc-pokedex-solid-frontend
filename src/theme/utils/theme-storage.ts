import { StorageKeys } from '~/constants/storage-keys';
import { type Theme, Themes } from '~/theme/Theme.interface';

const isTheme = (value: string | null): value is Theme => {
  return value === Themes.LIGHT || value === Themes.DARK;
};

export const getStoredTheme = (): Theme | null => {
  const stored = window.localStorage.getItem(StorageKeys.POKEDEX_THEME);

  return isTheme(stored) ? stored : null;
};

export const storeTheme = (theme: Theme) => {
  window.localStorage.setItem(StorageKeys.POKEDEX_THEME, theme);
};

export const getSystemTheme = (): Theme => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Themes.DARK
    : Themes.LIGHT;
};

export const getInitialTheme = (): Theme => {
  return document.documentElement.getAttribute('data-theme') === Themes.DARK
    ? Themes.DARK
    : Themes.LIGHT;
};
