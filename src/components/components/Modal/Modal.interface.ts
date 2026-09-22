import type { JSX } from 'solid-js';

import type { ModalType } from '~/constants/modal-provider';

export type ModalClasses = {
  dialog?: string;
  content?: string;
};

export type ModalProps = {
  type: ModalType;
  children: JSX.Element;
  closeOnBackdropClick?: boolean;
  transitionDuration?: number;
  classes?: ModalClasses;
};
