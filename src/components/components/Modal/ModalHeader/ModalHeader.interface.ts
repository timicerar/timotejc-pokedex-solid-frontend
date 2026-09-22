import type { JSX } from 'solid-js';

export type ModalHeaderProps = Omit<
  JSX.HTMLAttributes<HTMLElement>,
  'title' | 'ref'
> & {
  title?: JSX.Element;
  onClose: () => void;
  closeLabel?: string;
  hideClose?: boolean;
};
