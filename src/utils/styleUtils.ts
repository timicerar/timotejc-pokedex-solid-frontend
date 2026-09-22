import type { JSX } from 'solid-js';

// Unlike React, Solid's `style` prop never auto-suffixes numeric values with
// `px` — it sets each entry via `style.setProperty`, so a bare number like
// `500` becomes the invalid CSS value "500" and is silently ignored.
export const toCssValue = (value: string | number | undefined) =>
  typeof value === 'number' ? `${value}px` : value;

// Solid's `style` prop accepts either a CSSProperties object or a plain CSS
// string. Narrows to the object form so it can be safely spread alongside
// other computed style entries.
export const asStyleObject = (
  style: JSX.CSSProperties | string | undefined,
): JSX.CSSProperties => (typeof style === 'object' ? style : {});
