export const CardPaddings = {
  DEFAULT: 'default',
  DENSE: 'dense',
} as const;

export type CardPadding = (typeof CardPaddings)[keyof typeof CardPaddings];
