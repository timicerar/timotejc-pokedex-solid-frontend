import { Show } from 'solid-js';

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
    <Show when={!result.isLoading()} fallback={<PokemonListSkeleton />}>
      <Show
        when={!result.isError() && result.items().length > 0}
        fallback={<NotFound type={NotFoundTypes.POKEMON_LIST} />}
      >
        <Show
          when={listMode().isVirtualized}
          fallback={
            <PokemonPlainList
              items={result.items}
              hasNextPage={result.hasNextPage}
              isFetchingNextPage={result.isFetchingNextPage}
              fetchNextPage={result.fetchNextPage}
            />
          }
        >
          <PokemonVirtualizedList
            items={result.items}
            hasNextPage={result.hasNextPage}
            isFetchingNextPage={result.isFetchingNextPage}
            fetchNextPage={result.fetchNextPage}
          />
        </Show>
      </Show>
    </Show>
  );
};

export default PokemonList;
