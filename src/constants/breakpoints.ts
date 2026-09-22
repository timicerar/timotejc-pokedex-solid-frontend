// Keep in sync with $breakpoints in app/styles/mixins.scss.
export const Breakpoints = {
  xs: 375,
  sm: 600,
  lsm: 800,
  md: 960,
  lmd: 1024,
  lg: 1280,
  llg: 1600,
  xl: 1920,
} as const;

export type Breakpoint = keyof typeof Breakpoints;

export const MediaQueryTypes = {
  MIN: 'min',
  MAX: 'max',
} as const;

export type MediaQueryType =
  (typeof MediaQueryTypes)[keyof typeof MediaQueryTypes];
