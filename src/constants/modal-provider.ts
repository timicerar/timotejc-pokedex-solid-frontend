import type { ConfirmationModalData } from '~/components/compositions/Modals/ConfirmationModal/ConfirmationModal.interface';

export const ModalTypes = {
  CONFIRMATION: 'confirmation',
} as const;

export type ModalType = (typeof ModalTypes)[keyof typeof ModalTypes];

export type ModalData = {
  type: typeof ModalTypes.CONFIRMATION;
  data: ConfirmationModalData;
};
