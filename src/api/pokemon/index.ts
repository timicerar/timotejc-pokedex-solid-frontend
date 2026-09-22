import { apiInstance } from '~/api/axios';
import type { EvolutionChainDetail } from '~/api/models/EvolutionChainDetail';
import type { Pokemon, PokemonList } from '~/api/models/Pokemon';
import type {
  EvolutionChainParams,
  PokemonDetailsParams,
  PokemonListParams,
  PokemonMoveParams,
} from '~/api/models/PokemonFilters';
import type { PokemonGenerationDetail } from '~/api/models/PokemonGenerationDetail';
import type { PokemonMoveDetail } from '~/api/models/PokemonMoveDetail';
import type { PokemonSpeciesDetail } from '~/api/models/PokemonSpeciesDetail';
import type { PokemonTypeDetail } from '~/api/models/PokemonTypeDetail';
import { ApiRoutes } from '~/constants/api-routes';

export const getPokemons = async (params?: PokemonListParams) => {
  const response = await apiInstance.get<PokemonList>(ApiRoutes.pokemons(), {
    params,
  });

  return response?.data;
};

export const getPokemon = async (params: PokemonDetailsParams) => {
  const response = await apiInstance.get<Pokemon>(ApiRoutes.pokemon(params));

  return response?.data;
};

export const getPokemonType = async ({ name }: { name: string }) => {
  const response = await apiInstance.get<PokemonTypeDetail>(
    ApiRoutes.pokemonType({ name }),
  );

  return response?.data;
};

export const getPokemonGeneration = async ({ name }: { name: string }) => {
  const response = await apiInstance.get<PokemonGenerationDetail>(
    ApiRoutes.pokemonGeneration({ name }),
  );

  return response?.data;
};

export const getPokemonSpecies = async (params: PokemonDetailsParams) => {
  const response = await apiInstance.get<PokemonSpeciesDetail>(
    ApiRoutes.pokemonSpecies(params),
  );

  return response?.data;
};

export const getEvolutionChain = async (params: EvolutionChainParams) => {
  const response = await apiInstance.get<EvolutionChainDetail>(
    ApiRoutes.evolutionChain(params),
  );

  return response?.data;
};

export const getPokemonMove = async (params: PokemonMoveParams) => {
  const response = await apiInstance.get<PokemonMoveDetail>(
    ApiRoutes.pokemonMove(params),
  );

  return response?.data;
};
