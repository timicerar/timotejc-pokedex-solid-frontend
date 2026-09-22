import { For, Show } from 'solid-js';

import PokemonCard from '~/components/compositions/PokemonCard/PokemonCard';
import PokemonCardSkeleton from '~/components/compositions/PokemonCard/PokemonCardSkeleton';
import { INITIAL_SKELETON_COUNT } from '~/components/compositions/PokemonList/hooks/useColumnCount';
import type { PokemonListRowProps } from '~/components/compositions/PokemonList/PokemonList.interface';
import { ModalTypes } from '~/constants/modal-provider';
import { openModal } from '~/store/modals';
import classes from './PokemonList.module.scss';

const PokemonListRow = (props: PokemonListRowProps) => {
  return (
    <div
      // `measureElement` (called via `ref`) reads `data-index` synchronously
      // as soon as the element is created — before Solid necessarily gets
      // around to applying other JSX attributes — so it's set by hand here
      // rather than as a separate `data-index={...}` attribute.
      ref={(el) => {
        el.setAttribute('data-index', String(props.virtualRow.index));
        props.measureElement(el);
      }}
      class={classes.row}
      style={{ transform: `translateY(${props.virtualRow.start}px)` }}
    >
      <div class={classes.grid}>
        <For each={props.rowItems()}>
          {(item, index) => (
            <PokemonCard
              name={item.name}
              priority={props.startIndex + index() < INITIAL_SKELETON_COUNT}
              onClick={() =>
                openModal({
                  type: ModalTypes.POKEMON_DETAILS,
                  data: { name: item.name },
                })
              }
            />
          )}
        </For>
        <Show when={props.showLoadingCard()}>
          <PokemonCardSkeleton />
        </Show>
      </div>
    </div>
  );
};

export default PokemonListRow;
