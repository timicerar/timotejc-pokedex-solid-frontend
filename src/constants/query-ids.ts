export const QueryIds = {
  POKEMON: 'pokemon',
  LIST: 'list',
  DETAILS: 'details',
  TYPES: 'types',
  GENERATIONS: 'generations',
  SPECIES: 'species',
  EVOLUTION_CHAIN: 'evolution-chain',
  MOVE: 'move',
} as const;

export type QueryId = (typeof QueryIds)[keyof typeof QueryIds];
