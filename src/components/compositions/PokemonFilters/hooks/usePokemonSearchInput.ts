import { createEffect, createSignal, on } from 'solid-js';

import { useDebouncedValue } from '~/hooks/useDebouncedValue';

type UsePokemonSearchInputParams = {
  search: () => string;
  setSearch: (value: string) => void;
};

export const usePokemonSearchInput = (params: UsePokemonSearchInputParams) => {
  const [searchInput, setSearchInput] = createSignal(params.search());
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  let lastSyncedSearch = params.search();

  createEffect(
    on(debouncedSearch, (value) => {
      const trimmed = value.trim();

      if (trimmed === lastSyncedSearch) {
        return;
      }

      lastSyncedSearch = trimmed;
      params.setSearch(trimmed);
    }),
  );

  const resetSearchInput = () => {
    lastSyncedSearch = '';
    setSearchInput('');
  };

  return { searchInput, setSearchInput, resetSearchInput };
};
