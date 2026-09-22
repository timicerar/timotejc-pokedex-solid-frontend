export const StorageKeys = {
  POKEDEX_THEME: 'pokedex-theme',
} as const;

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];
