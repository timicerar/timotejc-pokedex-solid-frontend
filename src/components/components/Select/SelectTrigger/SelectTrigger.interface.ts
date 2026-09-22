import type { JSX } from 'solid-js';

export type SelectTriggerProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  'ref'
> & {
  ref?: (el: HTMLButtonElement) => void;
  id: string;
  listboxId: string;
  label: string;
  open: boolean;
  triggerLabel: string;
  leadingIcon?: JSX.Element;
  onToggle: () => void;
  onTriggerKeyDown: (event: KeyboardEvent) => void;
};
