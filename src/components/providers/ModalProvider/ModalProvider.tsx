import ConfirmationModal from '~/components/compositions/Modals/ConfirmationModal/ConfirmationModal';
import PokemonDetailsModal from '~/components/compositions/Modals/PokemonDetailsModal/PokemonDetailsModal';

const ModalProvider = () => {
  return (
    <>
      <ConfirmationModal />
      <PokemonDetailsModal />
    </>
  );
};

export default ModalProvider;
