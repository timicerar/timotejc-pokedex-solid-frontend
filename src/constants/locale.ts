export const Locales = {
  EN: 'en',
} as const;

export type Locale = (typeof Locales)[keyof typeof Locales];

export const DEFAULT_LOCALE: Locale = Locales.EN;
