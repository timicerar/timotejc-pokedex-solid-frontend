import { For } from 'solid-js';

import type { NamedAPIResource } from '~/api/models/Pokemon';
import {
  ESTIMATE_ROW_SIZE,
  useColumnCount,
} from '~/components/compositions/PokemonList/hooks/useColumnCount';
import PokemonListRow from '~/components/compositions/PokemonList/PokemonListRow';
import { ElementIds } from '~/constants/element-ids';
import { useInfiniteVirtualizer } from '~/hooks/useInfiniteVirtualizer';
import classes from './PokemonList.module.scss';

type PokemonVirtualizedListProps = {
  items: () => NamedAPIResource[];
  hasNextPage?: () => boolean | undefined;
  isFetchingNextPage?: () => boolean | undefined;
  fetchNextPage: () => void;
};

const PokemonVirtualizedList = (props: PokemonVirtualizedListProps) => {
  const columnCount = useColumnCount();

  const { rowVirtualizer, rowCount } = useInfiniteVirtualizer({
    itemCount: () => props.items().length,
    columnCount,
    estimateRowSize: ESTIMATE_ROW_SIZE,
    overscan: 3,
    gap: 24,
    hasNextPage: props.hasNextPage,
    isFetchingNextPage: props.isFetchingNextPage,
    fetchNextPage: props.fetchNextPage,
    getScrollElement: () => document.getElementById(ElementIds.MAIN_CONTENT),
  });

  return (
    <div
      class={classes.container}
      style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
    >
      <For each={rowVirtualizer.getVirtualItems()}>
        {(virtualRow) => {
          const startIndex = virtualRow.index * columnCount();
          const rowItems = () =>
            props.items().slice(startIndex, startIndex + columnCount());
          const showLoadingCard = () =>
            Boolean(
              virtualRow.index === rowCount() - 1 &&
                props.hasNextPage?.() &&
                rowItems().length < columnCount(),
            );

          return (
            <PokemonListRow
              virtualRow={virtualRow}
              measureElement={rowVirtualizer.measureElement}
              rowItems={rowItems}
              startIndex={startIndex}
              showLoadingCard={showLoadingCard}
            />
          );
        }}
      </For>
    </div>
  );
};

export default PokemonVirtualizedList;
