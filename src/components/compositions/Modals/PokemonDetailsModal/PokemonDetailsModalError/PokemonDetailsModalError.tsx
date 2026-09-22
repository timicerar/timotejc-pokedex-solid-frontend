import ModalHeader from '~/components/components/Modal/ModalHeader/ModalHeader';
import NotFound from '~/components/compositions/NotFound/NotFound';
import { ModalTypes } from '~/constants/modal-provider';
import { NotFoundTypes } from '~/constants/not-found';
import { closeModal } from '~/store/modals';

const PokemonDetailsModalError = () => {
  return (
    <>
      <ModalHeader onClose={() => closeModal(ModalTypes.POKEMON_DETAILS)} />
      <NotFound type={NotFoundTypes.POKEMON_DETAILS_MODAL} />
    </>
  );
};

export default PokemonDetailsModalError;
