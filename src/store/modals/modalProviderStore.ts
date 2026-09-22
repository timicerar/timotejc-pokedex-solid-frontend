import { createStore } from 'solid-js/store';

import type { ModalData, ModalType } from '~/constants/modal-provider';

export type ModalProviderStoreState = {
  data: {
    [K in ModalType]?: Extract<ModalData, { type: K }>;
  };
};

export const [modalProviderStore, setModalProviderStore] =
  createStore<ModalProviderStoreState>({
    data: {},
  });
