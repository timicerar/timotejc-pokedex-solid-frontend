import type { Pokemon } from '~/api/models/Pokemon';
import PokemonEntry from '~/components/compositions/PokemonEntry/PokemonEntry';
import PokemonInfoCard from '~/components/compositions/PokemonInfoCard/PokemonInfoCard';
import { t } from '~/lib/i18n';
import { formatDashedLabel } from '~/utils/stringUtils';
import classes from './PokemonAboutTab.module.scss';

type PokemonAboutTabProps = {
  pokemon: Pokemon;
};

const PokemonAboutTab = (props: PokemonAboutTabProps) => {
  return (
    <div class={classes.container}>
      <div class={classes.cards}>
        <PokemonInfoCard
          title={t('pokemonDetails.height')}
          value={`${(props.pokemon.height / 10).toFixed(1)} m`}
        />
        <PokemonInfoCard
          title={t('pokemonDetails.weight')}
          value={`${(props.pokemon.weight / 10).toFixed(1)} kg`}
        />
        <PokemonInfoCard
          title={t('pokemonDetails.abilities')}
          value={props.pokemon.abilities?.map(({ ability }) =>
            formatDashedLabel(ability.name),
          )}
        />
      </div>
      <PokemonEntry pokemon={props.pokemon} />
    </div>
  );
};

export default PokemonAboutTab;
