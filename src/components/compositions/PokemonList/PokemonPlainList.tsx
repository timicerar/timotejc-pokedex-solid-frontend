import { For, Show } from 'solid-js';

import type { NamedAPIResource } from '~/api/models/Pokemon';
import PokemonCard from '~/components/compositions/PokemonCard/PokemonCard';
import { INITIAL_SKELETON_COUNT } from '~/components/compositions/PokemonList/hooks/useColumnCount';
import { ModalTypes } from '~/constants/modal-provider';
import { useLoadMoreSentinel } from '~/hooks/useLoadMoreSentinel';
import { openModal } from '~/store/modals';
import classes from './PokemonList.module.scss';

type PokemonPlainListProps = {
  items: () => NamedAPIResource[];
  hasNextPage?: () => boolean | undefined;
  isFetchingNextPage?: () => boolean | undefined;
  fetchNextPage: () => void;
};

const PokemonPlainList = (props: PokemonPlainListProps) => {
  const setSentinel = useLoadMoreSentinel(() => ({
    hasNextPage: props.hasNextPage?.(),
    isFetchingNextPage: props.isFetchingNextPage?.(),
    fetchNextPage: props.fetchNextPage,
  }));

  return (
    <>
      <div class={classes.grid}>
        <For each={props.items()}>
          {(item, index) => (
            <PokemonCard
              name={item.name}
              priority={index() < INITIAL_SKELETON_COUNT}
              onClick={() =>
                openModal({
                  type: ModalTypes.POKEMON_DETAILS,
                  data: { name: item.name },
                })
              }
            />
          )}
        </For>
      </div>
      <Show when={props.hasNextPage?.()}>
        <div ref={setSentinel} class={classes.sentinel} aria-hidden="true" />
      </Show>
    </>
  );
};

export default PokemonPlainList;
