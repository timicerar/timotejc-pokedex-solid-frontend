import { useSearchParams } from '@solidjs/router';
import { createMemo } from 'solid-js';

import type { PokemonFilters } from '~/api/models/PokemonFilters';
import type { PokemonGeneration } from '~/constants/pokemon-generations';
import type { PokemonType } from '~/constants/pokemon-types';
import { parseList, serializeList } from '~/utils/filterUtils';

// solid-router's searchParams values can be a string or a string[] (repeated
// query params); this app only ever sets these as single comma-joined
// strings, so the array case just takes the first entry.
const toSingleParam = (value: string | string[] | undefined): string | null =>
  (Array.isArray(value) ? value[0] : value) ?? null;

export const usePokemonFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = createMemo<PokemonFilters>(() => ({
    search: toSingleParam(searchParams.search) ?? '',
    type: parseList<PokemonType>(toSingleParam(searchParams.type)),
    generation: parseList<PokemonGeneration>(
      toSingleParam(searchParams.generation),
    ),
  }));

  const setSearch = (value: string) => {
    setSearchParams({ search: value || null });
  };

  const setTypes = (value: PokemonType[]) => {
    setSearchParams({ type: serializeList(value) });
  };

  const setGenerations = (value: PokemonGeneration[]) => {
    setSearchParams({ generation: serializeList(value) });
  };

  const clearFilters = () => {
    setSearchParams({ search: null, type: null, generation: null });
  };

  return {
    filters,
    setSearch,
    setTypes,
    setGenerations,
    clearFilters,
  };
};
