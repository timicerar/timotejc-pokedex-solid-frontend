export const Routes = {
  POKEDEX: () => `/`,
  POKEMON_DETAILS: ({ pokemonName }: { pokemonName: string }) =>
    `/pokemon/${pokemonName}`,
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
