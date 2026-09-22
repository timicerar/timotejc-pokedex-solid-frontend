import type { closeModal, openModal } from '~/store/modals';

export type UseModalProviderResult = {
  openModal: typeof openModal;
  closeModal: typeof closeModal;
};
