import { useLocation } from '@solidjs/router';
import { createEffect, on } from 'solid-js';
import ConfirmationModal from '~/components/compositions/Modals/ConfirmationModal/ConfirmationModal';
import PokemonDetailsModal from '~/components/compositions/Modals/PokemonDetailsModal/PokemonDetailsModal';
import { ModalTypes } from '~/constants/modal-provider';
import { closeModal } from '~/store/modals';

const ModalProvider = () => {
  const location = useLocation();

  const closeAllModals = () => {
    for (const type of Object.values(ModalTypes)) {
      closeModal(type);
    }
  };

  createEffect(
    on(() => location.pathname, closeAllModals, { defer: true }),
  );

  return (
    <>
      <ConfirmationModal />
      <PokemonDetailsModal />
    </>
  );
};

export default ModalProvider;
