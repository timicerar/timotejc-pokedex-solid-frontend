import { useInfiniteQuery, useQuery } from '@tanstack/solid-query';
import { createMemo } from 'solid-js';

import type { NamedAPIResource } from '~/api/models/Pokemon';
import type {
  EvolutionChainParams,
  PokemonDetailsParams,
  PokemonFilters,
  PokemonMoveParams,
} from '~/api/models/PokemonFilters';
import {
  getEvolutionChain,
  getPokemon,
  getPokemonGeneration,
  getPokemonMove,
  getPokemonSpecies,
  getPokemons,
  getPokemonType,
} from '~/api/pokemon';
import { PokemonQueryKeys } from '~/api/pokemon/queryKeys';
import { POKEMON_GC_TIME } from '~/constants/pokemon';
import { PokemonGenerations } from '~/constants/pokemon-generations';
import { PokemonTypes } from '~/constants/pokemon-types';
import { useFilteredPokemons } from '~/hooks/useFilteredPokemons';
import { usePokemonsByFacets } from '~/hooks/usePokemonsByFacets';
import { getPokemonListConfig } from '~/utils/filterUtils';

type UsePokemonsOptions = {
  maxItems?: number | null;
  limit?: number | null;
};

export const usePokemons = (
  filters: () => PokemonFilters | undefined = () => undefined,
  options: () => UsePokemonsOptions = () => ({}),
) => {
  const config = createMemo(() => {
    const { limit = null } = options();
    return getPokemonListConfig(filters(), limit);
  });

  const typesQuery = usePokemonTypes(() => ({
    enabled: config().types.length > 0,
  }));
  const generationsQuery = usePokemonGenerations(() => ({
    enabled: config().generations.length > 0,
  }));

  const infiniteQuery = useInfiniteQuery(() => ({
    queryKey: PokemonQueryKeys.pokemonList({ limit: config().listLimit }),
    queryFn: ({ pageParam }) =>
      getPokemons({ limit: config().listLimit, offset: pageParam as number }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.next ? allPages.length * config().listLimit : undefined,
    enabled: !config().hasFacetFilter,
    refetchOnMount: true,
    staleTime: Infinity,
    gcTime: POKEMON_GC_TIME,
  }));

  const basePokemons = createMemo<NamedAPIResource[]>(
    () =>
      infiniteQuery.data?.pages.flatMap((page) => page?.results ?? []) ?? [],
  );

  const facetPokemons = usePokemonsByFacets(() => ({
    enabled: config().hasFacetFilter,
    types: typesQuery.data,
    generations: generationsQuery.data,
    selectedTypes: config().types,
    selectedGenerations: config().generations,
  }));

  const filteredItems = useFilteredPokemons(
    () => facetPokemons() ?? basePokemons(),
    () => config().search,
  );

  const items = createMemo(() => {
    const { maxItems = null } = options();
    return maxItems !== null
      ? filteredItems().slice(0, maxItems)
      : filteredItems();
  });

  const hasNextPage = createMemo(() => {
    const { maxItems = null } = options();

    if (config().hasFacetFilter) return false;

    return maxItems !== null
      ? Boolean(infiniteQuery.hasNextPage) && items().length < maxItems
      : infiniteQuery.hasNextPage;
  });

  const isFetchingNextPage = createMemo(() =>
    config().hasFacetFilter ? false : infiniteQuery.isFetchingNextPage,
  );

  const isLoading = createMemo(() => {
    const { types, generations, hasFacetFilter } = config();

    return hasFacetFilter
      ? (types.length > 0 && typesQuery.isLoading) ||
          (generations.length > 0 && generationsQuery.isLoading)
      : infiniteQuery.isLoading;
  });

  const isError = createMemo(() =>
    config().hasFacetFilter
      ? typesQuery.isError || generationsQuery.isError
      : infiniteQuery.isError,
  );

  return {
    items,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage: infiniteQuery.fetchNextPage,
  };
};

type UsePokemonOptions = {
  enabled?: boolean;
};

export const usePokemon = (
  params: () => PokemonDetailsParams,
  options: () => UsePokemonOptions = () => ({}),
) => {
  return useQuery(() => {
    const p = params();
    const { enabled = true } = options();

    return {
      queryKey: PokemonQueryKeys.pokemonDetails(p),
      queryFn: () => getPokemon(p),
      enabled: enabled && Boolean(p?.id || p?.name),
      refetchOnMount: true,
      staleTime: Infinity,
      gcTime: POKEMON_GC_TIME,
      retry: 2,
    };
  });
};

type UsePokemonTypesOptions = {
  enabled?: boolean;
};

export const usePokemonTypes = (
  options: () => UsePokemonTypesOptions = () => ({}),
) => {
  return useQuery(() => ({
    queryKey: PokemonQueryKeys.pokemonTypes(),
    queryFn: () =>
      Promise.all(
        Object.values(PokemonTypes).map((name) => getPokemonType({ name })),
      ),
    enabled: options().enabled ?? true,
    staleTime: Infinity,
    gcTime: Infinity,
  }));
};

type UsePokemonGenerationsOptions = {
  enabled?: boolean;
};

export const usePokemonGenerations = (
  options: () => UsePokemonGenerationsOptions = () => ({}),
) => {
  return useQuery(() => ({
    queryKey: PokemonQueryKeys.pokemonGenerations(),
    queryFn: () =>
      Promise.all(
        Object.values(PokemonGenerations).map((name) =>
          getPokemonGeneration({ name }),
        ),
      ),
    enabled: options().enabled ?? true,
    staleTime: Infinity,
    gcTime: Infinity,
  }));
};

type UsePokemonSpeciesOptions = {
  enabled?: boolean;
};

export const usePokemonSpecies = (
  params: () => PokemonDetailsParams,
  options: () => UsePokemonSpeciesOptions = () => ({}),
) => {
  return useQuery(() => {
    const p = params();
    const { enabled = true } = options();

    return {
      queryKey: PokemonQueryKeys.pokemonSpecies(p),
      queryFn: () => getPokemonSpecies(p),
      enabled: enabled && Boolean(p?.id || p?.name),
      refetchOnMount: true,
      staleTime: Infinity,
      gcTime: POKEMON_GC_TIME,
      retry: 2,
    };
  });
};

type UseEvolutionChainOptions = {
  enabled?: boolean;
};

export const useEvolutionChain = (
  params: () => EvolutionChainParams,
  options: () => UseEvolutionChainOptions = () => ({}),
) => {
  return useQuery(() => {
    const p = params();
    const { enabled = true } = options();

    return {
      queryKey: PokemonQueryKeys.evolutionChain(p),
      queryFn: () => getEvolutionChain(p),
      enabled: enabled && Boolean(p?.id),
      refetchOnMount: true,
      staleTime: Infinity,
      gcTime: POKEMON_GC_TIME,
      retry: 2,
    };
  });
};

type UsePokemonMoveOptions = {
  enabled?: boolean;
};

export const usePokemonMove = (
  params: () => PokemonMoveParams,
  options: () => UsePokemonMoveOptions = () => ({}),
) => {
  return useQuery(() => {
    const p = params();
    const { enabled = true } = options();

    return {
      queryKey: PokemonQueryKeys.pokemonMove(p),
      queryFn: () => getPokemonMove(p),
      enabled: enabled && Boolean(p?.id),
      refetchOnMount: true,
      staleTime: Infinity,
      gcTime: POKEMON_GC_TIME,
      retry: 2,
    };
  });
};
