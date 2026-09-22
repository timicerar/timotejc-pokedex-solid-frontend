import { Show } from 'solid-js';

import type { Pokemon } from '~/api/models/Pokemon';
import { usePokemonSpecies } from '~/api/pokemon/hooks';
import Skeleton from '~/components/components/Skeleton/Skeleton';
import Typography from '~/components/components/Typography/Typography';
import { TypographyTypes } from '~/constants/typography';
import { t } from '~/lib/i18n';
import { getIdFromResourceUrl } from '~/utils/apiResourceUtils';
import classes from './PokemonEntry.module.scss';

type PokemonEntryProps = {
  pokemon: Pokemon;
};

const PokemonEntry = (props: PokemonEntryProps) => {
  const speciesId = () => getIdFromResourceUrl(props.pokemon.species.url);

  const speciesQuery = usePokemonSpecies(() => ({
    name: props.pokemon.species.name,
    id: speciesId() ? Number(speciesId()) : undefined,
  }));

  const flavorText = () =>
    speciesQuery.data?.flavor_text_entries?.find(
      (entry) => entry.language.name === 'en',
    )?.flavor_text;

  return (
    <Show
      when={!speciesQuery.isLoading}
      fallback={<Skeleton class={classes.skeleton} />}
    >
      <Show when={!speciesQuery.isError && speciesQuery.data && flavorText()}>
        <div class={classes.container}>
          <Typography
            type={TypographyTypes.LABEL}
            color="muted-foreground"
            uppercase
          >
            {t('pokemonDetails.pokedexEntry')}
          </Typography>
          <Typography type={TypographyTypes.BODY_SM}>
            {flavorText()?.replace(/[\n\f­]/g, ' ')}
          </Typography>
        </div>
      </Show>
    </Show>
  );
};

export default PokemonEntry;
