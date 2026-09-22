export const PokemonRegions = {
  KANTO: 'kanto',
  JOHTO: 'johto',
  HOENN: 'hoenn',
  SINNOH: 'sinnoh',
  UNOVA: 'unova',
  KALOS: 'kalos',
  ALOLA: 'alola',
  GALAR: 'galar',
  PALDEA: 'paldea',
} as const;

export type PokemonRegion =
  (typeof PokemonRegions)[keyof typeof PokemonRegions];
