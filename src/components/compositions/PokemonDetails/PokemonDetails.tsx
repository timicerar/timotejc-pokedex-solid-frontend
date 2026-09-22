import type { PokemonDetailsProps } from '~/components/compositions/PokemonDetails/PokemonDetails.interface';
import PokemonHero from '~/components/compositions/PokemonHero/PokemonHero';
import PokemonTabs from '~/components/compositions/PokemonTabs/PokemonTabs';
import classes from './PokemonDetails.module.scss';

const PokemonDetails = (props: PokemonDetailsProps) => {
  return (
    <div class={classes.root}>
      <PokemonHero pokemon={props.pokemon} />
      <PokemonTabs pokemon={props.pokemon} />
    </div>
  );
};

export default PokemonDetails;
