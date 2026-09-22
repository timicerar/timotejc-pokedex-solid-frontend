import { createMemo } from 'solid-js';

import type { NamedAPIResource } from '~/api/models/Pokemon';
import { filterPokemonsBySearch } from '~/utils/filterUtils';

export const useFilteredPokemons = (
  pokemons: () => NamedAPIResource[],
  search: () => string,
) => {
  return createMemo(() => filterPokemonsBySearch(pokemons(), search()));
};
