import type { Pokemon } from '~/api/models/Pokemon';
import { usePokemonTypes } from '~/api/pokemon/hooks';
import PokemonStats from '~/components/compositions/PokemonStats/PokemonStats';
import PokemonWeakAgainst from '~/components/compositions/PokemonWeakAgainst/PokemonWeakAgainst';
import classes from './PokemonBaseStatsTab.module.scss';

type PokemonBaseStatsTabProps = {
  pokemon: Pokemon;
};

const PokemonBaseStatsTab = (props: PokemonBaseStatsTabProps) => {
  const typesQuery = usePokemonTypes();

  return (
    <div class={classes.container}>
      <PokemonStats pokemon={props.pokemon} showTotal />
      <PokemonWeakAgainst
        pokemon={props.pokemon}
        typeDetails={typesQuery.data}
      />
    </div>
  );
};

export default PokemonBaseStatsTab;
