import { createMemo, For, Show } from 'solid-js';

import type { Pokemon } from '~/api/models/Pokemon';
import type { PokemonTypeDetail } from '~/api/models/PokemonTypeDetail';
import Badge from '~/components/components/Badge/Badge';
import Typography from '~/components/components/Typography/Typography';
import type { PokemonType } from '~/constants/pokemon-types';
import { TypographyTypes } from '~/constants/typography';
import { t } from '~/lib/i18n';
import { getPokemonWeaknesses } from '~/utils/pokemonTypeUtils';
import classes from './PokemonWeakAgainst.module.scss';

type PokemonWeakAgainstProps = {
  pokemon: Pokemon;
  typeDetails?: PokemonTypeDetail[];
};

const PokemonWeakAgainst = (props: PokemonWeakAgainstProps) => {
  const weaknesses = createMemo(() => {
    const types = props.pokemon.types?.map(
      ({ type }) => type.name as PokemonType,
    );

    return getPokemonWeaknesses(types, props.typeDetails);
  });

  return (
    <Show when={weaknesses().length > 0}>
      <div class={classes.container}>
        <Typography
          type={TypographyTypes.LABEL}
          color="muted-foreground"
          uppercase
        >
          {t('shared.weakAgainst')}
        </Typography>
        <div class={classes.badges}>
          <For each={weaknesses()}>
            {(type) => (
              <Badge variant={type}>{t(`pokemonTypes.${type}`)}</Badge>
            )}
          </For>
        </div>
      </div>
    </Show>
  );
};

export default PokemonWeakAgainst;
