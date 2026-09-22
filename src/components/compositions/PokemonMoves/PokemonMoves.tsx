import { For, Show } from 'solid-js';

import type { Pokemon } from '~/api/models/Pokemon';
import PokemonMoveCard from '~/components/compositions/PokemonMoveCard/PokemonMoveCard';
import { getIdFromResourceUrl } from '~/utils/apiResourceUtils';
import classes from './PokemonMoves.module.scss';

type PokemonMovesProps = {
  pokemon: Pokemon;
};

const PokemonMoves = (props: PokemonMovesProps) => {
  return (
    <div class={classes.list}>
      <For each={props.pokemon.moves}>
        {({ move }) => {
          const id = getIdFromResourceUrl(move.url);

          return (
            <Show when={id}>
              <PokemonMoveCard id={id as string} />
            </Show>
          );
        }}
      </For>
    </div>
  );
};

export default PokemonMoves;
