import type { ModalData, ModalType } from '~/constants/modal-provider';
import {
  modalProviderStore,
  setModalProviderStore,
} from '~/store/modals/modalProviderStore';
import { getModalId } from '~/utils/modalProviderUtils';

export const openModal = (data: ModalData) => {
  const modal = document.getElementById(
    getModalId(data.type),
  ) as HTMLDialogElement | null;

  if (!modal) {
    return;
  }

  setModalProviderStore('data', data.type, data);
  modal.showModal();
};

export const closeModal = (type: ModalType) => {
  const modal = document.getElementById(
    getModalId(type),
  ) as HTMLDialogElement | null;

  modal?.close();
};

export const useModalData = <T extends ModalType>(type: T) => {
  return () => modalProviderStore.data[type];
};
