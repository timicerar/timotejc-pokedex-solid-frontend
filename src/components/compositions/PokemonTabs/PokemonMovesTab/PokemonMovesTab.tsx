import type { Pokemon } from '~/api/models/Pokemon';
import PokemonMoves from '~/components/compositions/PokemonMoves/PokemonMoves';
import classes from './PokemonMovesTab.module.scss';

type PokemonMovesTabProps = {
  pokemon: Pokemon;
};

const PokemonMovesTab = (props: PokemonMovesTabProps) => {
  return (
    <div class={classes.container}>
      <PokemonMoves pokemon={props.pokemon} />
    </div>
  );
};

export default PokemonMovesTab;
