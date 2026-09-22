import type { PokemonGeneration } from '~/constants/pokemon-generations';
import type { PokemonType } from '~/constants/pokemon-types';

export type PokemonFilters = {
  search?: string;
  type?: PokemonType[];
  generation?: PokemonGeneration[];
};

export type PokemonListParams = {
  limit?: number;
  offset?: number;
} & PokemonFilters;

export type PokemonDetailsParams = {
  name: string;
  id?: number;
};

export type EvolutionChainParams = {
  id: string;
};

export type PokemonMoveParams = {
  id: string;
};
