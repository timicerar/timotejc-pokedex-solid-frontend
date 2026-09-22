export const PokemonDetailsTabs = {
  ABOUT: 'about',
  BASE_STATS: 'base-stats',
  EVOLUTION_CHAIN: 'evolution-chain',
  MOVES: 'moves',
  SPRITES: 'sprites',
} as const;

export type PokemonDetailsTab =
  (typeof PokemonDetailsTabs)[keyof typeof PokemonDetailsTabs];
