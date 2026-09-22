import type { UseModalProviderResult } from '~/components/providers/ModalProvider/ModalProvider.interface';
import { closeModal, openModal } from '~/store/modals';

export const useModalProvider = (): UseModalProviderResult => {
  return { openModal, closeModal };
};
