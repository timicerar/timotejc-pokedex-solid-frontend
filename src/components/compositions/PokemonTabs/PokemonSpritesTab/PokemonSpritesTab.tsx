import type { Pokemon } from '~/api/models/Pokemon';
import PokemonSprites from '~/components/compositions/PokemonSprites/PokemonSprites';
import classes from './PokemonSpritesTab.module.scss';

type PokemonSpritesTabProps = {
  pokemon: Pokemon;
};

const PokemonSpritesTab = (props: PokemonSpritesTabProps) => {
  return (
    <div class={classes.container}>
      <PokemonSprites pokemon={props.pokemon} />
    </div>
  );
};

export default PokemonSpritesTab;
