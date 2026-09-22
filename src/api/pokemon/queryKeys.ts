import type {
  EvolutionChainParams,
  PokemonDetailsParams,
  PokemonListParams,
  PokemonMoveParams,
} from '~/api/models/PokemonFilters';
import { QueryIds } from '~/constants/query-ids';

export const PokemonQueryKeys = {
  pokemonList: (params?: PokemonListParams) =>
    [QueryIds.POKEMON, QueryIds.LIST, params] as const,
  pokemonDetails: (params: PokemonDetailsParams) =>
    [QueryIds.POKEMON, QueryIds.DETAILS, params] as const,
  pokemonTypes: () => [QueryIds.POKEMON, QueryIds.TYPES] as const,
  pokemonGenerations: () => [QueryIds.POKEMON, QueryIds.GENERATIONS] as const,
  pokemonSpecies: (params: PokemonDetailsParams) =>
    [QueryIds.POKEMON, QueryIds.SPECIES, params] as const,
  evolutionChain: (params: EvolutionChainParams) =>
    [QueryIds.POKEMON, QueryIds.EVOLUTION_CHAIN, params] as const,
  pokemonMove: (params: PokemonMoveParams) =>
    [QueryIds.POKEMON, QueryIds.MOVE, params] as const,
};
