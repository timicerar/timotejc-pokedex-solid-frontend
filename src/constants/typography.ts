export const FontFamilies = {
  DISPLAY: 'display',
  BODY: 'body',
  MONO: 'mono',
} as const;

export type FontFamily = (typeof FontFamilies)[keyof typeof FontFamilies];

export const TypographyElements = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
  P: 'p',
  SPAN: 'span',
  DIV: 'div',
} as const;

export type TypographyElement =
  (typeof TypographyElements)[keyof typeof TypographyElements];

export const TypographyTypes = {
  DISPLAY_XS: 'display-xs',
  DISPLAY_SM: 'display-sm',
  DISPLAY_BASE: 'display-base',
  DISPLAY_LG: 'display-lg',
  DISPLAY_2XL: 'display-2xl',
  DISPLAY_4XL: 'display-4xl',
  LABEL: 'label',
  CAPTION: 'caption',
  BODY_SM: 'body-sm',
  BODY: 'body',
  BODY_SEMIBOLD: 'body-semibold',
  BUTTON: 'button',
  CARD_TITLE: 'card-title',
  HEADING_LG: 'heading-lg',
  HEADING_XL: 'heading-xl',
  ID_LABEL: 'id-label',
  ID_LABEL_LG: 'id-label-lg',
  STAT_VALUE: 'stat-value',
} as const;

export type TypographyType =
  (typeof TypographyTypes)[keyof typeof TypographyTypes];
