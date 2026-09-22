export const ButtonVariants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  GHOST: 'ghost',
  DESTRUCTIVE: 'destructive',
  ROUNDED: 'rounded',
} as const;

export type ButtonVariant =
  (typeof ButtonVariants)[keyof typeof ButtonVariants];

export const ButtonSizes = {
  DEFAULT: 'default',
  SM: 'sm',
} as const;

export type ButtonSize = (typeof ButtonSizes)[keyof typeof ButtonSizes];
