import { For } from 'solid-js';

import PokemonCardSkeleton from '~/components/compositions/PokemonCard/PokemonCardSkeleton';
import { INITIAL_SKELETON_COUNT } from '~/components/compositions/PokemonList/hooks/useColumnCount';
import classes from './PokemonList.module.scss';

const PokemonListSkeleton = () => {
  return (
    <div class={classes.grid}>
      <For each={Array.from({ length: INITIAL_SKELETON_COUNT })}>
        {() => <PokemonCardSkeleton />}
      </For>
    </div>
  );
};

export default PokemonListSkeleton;
