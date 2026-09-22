import { createVirtualizer } from '@tanstack/solid-virtual';
import { createMemo, createSignal, For, onMount } from 'solid-js';

import type { Pokemon } from '~/api/models/Pokemon';
import PokemonMoveCard from '~/components/compositions/PokemonMoveCard/PokemonMoveCard';
import { ElementIds } from '~/constants/element-ids';
import { getIdFromResourceUrl } from '~/utils/apiResourceUtils';
import classes from './PokemonMoves.module.scss';

const ESTIMATE_ROW_SIZE = 76;
const OVERSCAN = 6;
const GAP = 16;

type PokemonMovesProps = {
  pokemon: Pokemon;
};

const PokemonMoves = (props: PokemonMovesProps) => {
  const moveIds = createMemo(() =>
    props.pokemon.moves
      .map(({ move }) => getIdFromResourceUrl(move.url))
      .filter((id): id is string => Boolean(id)),
  );

  let listRef: HTMLDivElement | undefined;
  const [scrollMargin, setScrollMargin] = createSignal(0);

  onMount(() => {
    const scrollElement = document.getElementById(ElementIds.MAIN_CONTENT);

    if (!listRef || !scrollElement) {
      return;
    }

    setScrollMargin(
      listRef.getBoundingClientRect().top -
        scrollElement.getBoundingClientRect().top +
        scrollElement.scrollTop,
    );
  });

  const virtualizer = createVirtualizer({
    get count() {
      return moveIds().length;
    },
    getScrollElement: () => document.getElementById(ElementIds.MAIN_CONTENT),
    estimateSize: () => ESTIMATE_ROW_SIZE,
    overscan: OVERSCAN,
    gap: GAP,
    get scrollMargin() {
      return scrollMargin();
    },
  });

  virtualizer.shouldAdjustScrollPositionOnItemSizeChange = () => false;

  return (
    <div
      ref={listRef}
      class={classes.list}
      style={{ height: `${virtualizer.getTotalSize()}px` }}
    >
      <For each={virtualizer.getVirtualItems()}>
        {(virtualRow) => (
          <div
            ref={(el) => {
              el.setAttribute('data-index', String(virtualRow.index));
              virtualizer.measureElement(el);
            }}
            class={classes.row}
            style={{
              transform: `translateY(${virtualRow.start - scrollMargin()}px)`,
            }}
          >
            <PokemonMoveCard id={moveIds()[virtualRow.index]} />
          </div>
        )}
      </For>
    </div>
  );
};

export default PokemonMoves;
