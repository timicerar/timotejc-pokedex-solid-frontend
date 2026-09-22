export const ElementIds = {
  MAIN_CONTENT: 'main-content',
} as const;

export type ElementId = (typeof ElementIds)[keyof typeof ElementIds];
