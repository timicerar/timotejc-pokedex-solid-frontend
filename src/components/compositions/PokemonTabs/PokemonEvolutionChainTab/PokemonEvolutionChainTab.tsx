import type { Pokemon } from '~/api/models/Pokemon';
import PokemonEvoChain from '~/components/compositions/PokemonEvoChain/PokemonEvoChain';
import classes from './PokemonEvolutionChainTab.module.scss';

type PokemonEvolutionChainTabProps = {
  pokemon: Pokemon;
};

const PokemonEvolutionChainTab = (props: PokemonEvolutionChainTabProps) => {
  return (
    <div class={classes.container}>
      <PokemonEvoChain pokemon={props.pokemon} />
    </div>
  );
};

export default PokemonEvolutionChainTab;
