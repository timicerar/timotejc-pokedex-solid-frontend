import { Match, Switch } from 'solid-js';

import { usePokemons } from '~/api/pokemon/hooks';
import NotFound from '~/components/compositions/NotFound/NotFound';
import PokemonListSkeleton from '~/components/compositions/PokemonList/PokemonListSkeleton';
import PokemonPlainList from '~/components/compositions/PokemonList/PokemonPlainList';
import PokemonVirtualizedList from '~/components/compositions/PokemonList/PokemonVirtualizedList';
import { NotFoundTypes } from '~/constants/not-found';
import { usePokemonFilters } from '~/hooks/usePokemonFilters';
import { usePokemonListMode } from '~/hooks/usePokemonListMode';

const PokemonList = () => {
  const { filters } = usePokemonFilters();
  const listMode = usePokemonListMode();

  const result = usePokemons(filters, () => ({
    maxItems: listMode().maxItems,
    limit: listMode().limit,
  }));

  return (
    <Switch
      fallback={
        <PokemonPlainList
          items={result.items}
          hasNextPage={result.hasNextPage}
          isFetchingNextPage={result.isFetchingNextPage}
          fetchNextPage={result.fetchNextPage}
        />
      }
    >
      <Match when={result.isLoading()}>
        <PokemonListSkeleton />
      </Match>
      <Match when={result.isError() || result.items().length === 0}>
        <NotFound type={NotFoundTypes.POKEMON_LIST} />
      </Match>
      <Match when={listMode().isVirtualized}>
        <PokemonVirtualizedList
          items={result.items}
          hasNextPage={result.hasNextPage}
          isFetchingNextPage={result.isFetchingNextPage}
          fetchNextPage={result.fetchNextPage}
        />
      </Match>
    </Switch>
  );
};

export default PokemonList;
