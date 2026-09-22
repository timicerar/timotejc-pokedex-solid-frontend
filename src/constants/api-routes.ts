import type {
  EvolutionChainParams,
  PokemonDetailsParams,
  PokemonMoveParams,
} from '~/api/models/PokemonFilters';

export const ApiRoutes = {
  pokemons: () => `/pokemon`,
  pokemon: (params: PokemonDetailsParams) =>
    `pokemon/${params?.id ?? params?.name}`,
  pokemonType: ({ name }: { name: string }) => `type/${name}`,
  pokemonGeneration: ({ name }: { name: string }) => `generation/${name}`,
  pokemonSpecies: (params: PokemonDetailsParams) =>
    `pokemon-species/${params?.id ?? params?.name}`,
  evolutionChain: ({ id }: EvolutionChainParams) => `evolution-chain/${id}`,
  pokemonMove: ({ id }: PokemonMoveParams) => `move/${id}`,
} as const;
