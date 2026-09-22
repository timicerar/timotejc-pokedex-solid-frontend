export const PokemonMoveCategories = {
  PHYSICAL: 'physical',
  SPECIAL: 'special',
  STATUS: 'status',
} as const;

export type PokemonMoveCategory =
  (typeof PokemonMoveCategories)[keyof typeof PokemonMoveCategories];
