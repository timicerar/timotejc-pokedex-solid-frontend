export const PokemonGenerations = {
  GEN_1: 'generation-i',
  GEN_2: 'generation-ii',
  GEN_3: 'generation-iii',
  GEN_4: 'generation-iv',
  GEN_5: 'generation-v',
  GEN_6: 'generation-vi',
  GEN_7: 'generation-vii',
  GEN_8: 'generation-viii',
  GEN_9: 'generation-ix',
} as const;

export type PokemonGeneration =
  (typeof PokemonGenerations)[keyof typeof PokemonGenerations];
