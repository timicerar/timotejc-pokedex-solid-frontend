import type { NamedAPIResource } from '~/api/models/Pokemon';
import type { PokemonFilters } from '~/api/models/PokemonFilters';
import type { PokemonGenerationDetail } from '~/api/models/PokemonGenerationDetail';
import type { PokemonTypeDetail } from '~/api/models/PokemonTypeDetail';
import {
  POKEMON_LIST_ALL_LIMIT,
  POKEMON_LIST_LIMIT,
} from '~/constants/pokemon';
import type { PokemonGeneration } from '~/constants/pokemon-generations';
import type { PokemonType } from '~/constants/pokemon-types';

export const parseList = <T extends string>(value: string | null): T[] => {
  return value ? (value?.split(',') as T[]) : [];
};

export const serializeList = (value: string[]): string | null => {
  return value?.length ? value?.join(',') : null;
};

export type PokemonListConfig = {
  search: string;
  types: PokemonType[];
  generations: PokemonGeneration[];
  hasFacetFilter: boolean;
  listLimit: number;
};

export const getPokemonListConfig = (
  filters?: PokemonFilters,
  limit?: number | null,
): PokemonListConfig => {
  const search = filters?.search?.trim() ?? '';
  const types = filters?.type ?? [];
  const generations = filters?.generation ?? [];
  const hasFacetFilter = types.length > 0 || generations.length > 0;
  const isFetchAll = Boolean(search) || hasFacetFilter;
  const listLimit = isFetchAll
    ? POKEMON_LIST_ALL_LIMIT
    : (limit ?? POKEMON_LIST_LIMIT);

  return {
    search,
    types,
    generations,
    hasFacetFilter,
    listLimit,
  };
};

export const getPokemonListConfigFromUrl = (url: URL): PokemonListConfig => {
  const filters: PokemonFilters = {
    search: url.searchParams.get('search') ?? '',
    type: parseList<PokemonType>(url.searchParams.get('type')),
    generation: parseList<PokemonGeneration>(
      url.searchParams.get('generation'),
    ),
  };
  const limitParam = url.searchParams.get('limit');
  const limit = limitParam ? Number(limitParam) : null;

  return getPokemonListConfig(filters, limit);
};

export const filterPokemonsBySearch = (
  pokemons: NamedAPIResource[],
  search: string,
): NamedAPIResource[] => {
  const query = search.trim().toLowerCase();

  if (!query) return pokemons;

  return pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query),
  );
};

type FilterPokemonsByFacetsParams = {
  types?: PokemonTypeDetail[];
  generations?: PokemonGenerationDetail[];
  selectedTypes: string[];
  selectedGenerations: string[];
};

export const filterPokemonsByFacets = ({
  types = [],
  generations = [],
  selectedTypes,
  selectedGenerations,
}: FilterPokemonsByFacetsParams): NamedAPIResource[] => {
  const facetMap = new Map<string, NamedAPIResource[]>();

  for (const type of types) {
    facetMap.set(
      type.name,
      type.pokemon.map((entry) => entry.pokemon),
    );
  }

  for (const generation of generations) {
    facetMap.set(generation.name, generation.pokemon_species);
  }

  const unionByKeys = (keys: string[]): NamedAPIResource[] | null => {
    if (keys.length === 0) return null;

    const seen = new Map<string, NamedAPIResource>();

    for (const key of keys) {
      for (const pokemon of facetMap.get(key) ?? []) {
        seen.set(pokemon.name, pokemon);
      }
    }

    return [...seen.values()];
  };

  const typeMatches = unionByKeys(selectedTypes);
  const generationMatches = unionByKeys(selectedGenerations);

  if (typeMatches && generationMatches) {
    const generationNames = new Set(
      generationMatches.map((pokemon) => pokemon.name),
    );

    return typeMatches.filter((pokemon) => generationNames.has(pokemon.name));
  }

  return typeMatches ?? generationMatches ?? [];
};
