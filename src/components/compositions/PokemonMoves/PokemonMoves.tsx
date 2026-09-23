import { createVirtualizer } from '@tanstack/solid-virtual';
import { createMemo, For } from 'solid-js';

import type { Pokemon } from '~/api/models/Pokemon';
import PokemonMoveCard from '~/components/compositions/PokemonMoveCard/PokemonMoveCard';
import { ElementIds } from '~/constants/element-ids';
import { getIdFromResourceUrl } from '~/utils/apiResourceUtils';
import classes from './PokemonMoves.module.scss';

type PokemonMovesProps = {
  pokemon: Pokemon;
};

const PokemonMoves = (props: PokemonMovesProps) => {
  const moveIds = createMemo(() =>
    props.pokemon.moves
      .map(({ move }) => getIdFromResourceUrl(move.url))
      .filter((id): id is string => Boolean(id)),
  );

  const virtualizer = createVirtualizer({
    get count() {
      return moveIds().length;
    },
    getScrollElement: () => document.getElementById(ElementIds.MAIN_CONTENT),
    estimateSize: () => 76,
    overscan: 6,
    gap: 16,
  });

  virtualizer.shouldAdjustScrollPositionOnItemSizeChange = () => false;

  return (
    <div
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
              transform: `translateY(${virtualRow.start}px)`,
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
