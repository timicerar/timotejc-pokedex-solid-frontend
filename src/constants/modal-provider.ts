import type { ConfirmationModalData } from '~/components/compositions/Modals/ConfirmationModal/ConfirmationModal.interface';
import type { PokemonDetailsModalData } from '~/components/compositions/Modals/PokemonDetailsModal/PokemonDetailsModal.interface';

export const ModalTypes = {
  CONFIRMATION: 'confirmation',
  POKEMON_DETAILS: 'pokemon-details',
} as const;

export type ModalType = (typeof ModalTypes)[keyof typeof ModalTypes];

export type ModalData =
  | { type: typeof ModalTypes.CONFIRMATION; data: ConfirmationModalData }
  | { type: typeof ModalTypes.POKEMON_DETAILS; data: PokemonDetailsModalData };
