import type { ModalType } from '~/constants/modal-provider';

export const getModalId = (type: ModalType) => `modal-${type}`;
