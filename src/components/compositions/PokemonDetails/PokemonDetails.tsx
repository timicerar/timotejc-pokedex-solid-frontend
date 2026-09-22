import { Show } from 'solid-js';

import type { PokemonDetailsProps } from '~/components/compositions/PokemonDetails/PokemonDetails.interface';
import PokemonHero from '~/components/compositions/PokemonHero/PokemonHero';
import PokemonTabs from '~/components/compositions/PokemonTabs/PokemonTabs';
import classes from './PokemonDetails.module.scss';

const PokemonDetails = (props: PokemonDetailsProps) => {
  return (
    <div class={classes.root}>
      <PokemonHero pokemon={props.pokemon} />
      {/* Keyed on id so switching pokemon (e.g. via the evolution chain) resets the tab selection back to the first tab, instead of carrying over whatever tab was active before. */}
      <Show when={props.pokemon.id} keyed>
        {(_id) => <PokemonTabs pokemon={props.pokemon} />}
      </Show>
    </div>
  );
};

export default PokemonDetails;
