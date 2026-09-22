export const NotFoundTypes = {
  GENERIC: 'generic',
  POKEMON_LIST: 'pokemon-list',
  POKEMON_DETAILS: 'pokemon-details',
  POKEMON_DETAILS_MODAL: 'pokemon-details-modal',
  POKEMON_MOVE: 'pokemon-move',
  POKEMON_EVOLUTION_CHAIN: 'pokemon-evolution-chain',
} as const;

export type NotFoundType = (typeof NotFoundTypes)[keyof typeof NotFoundTypes];
