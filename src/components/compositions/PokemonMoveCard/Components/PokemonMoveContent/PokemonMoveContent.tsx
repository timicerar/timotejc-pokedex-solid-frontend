import { Show } from 'solid-js';

import { usePokemonMove } from '~/api/pokemon/hooks';
import Badge from '~/components/components/Badge/Badge';
import Typography from '~/components/components/Typography/Typography';
import type { PokemonMoveContentProps } from '~/components/compositions/PokemonMoveCard/Components/PokemonMoveContent/PokemonMoveContent.interface';
import PokemonMoveError from '~/components/compositions/PokemonMoveCard/Components/PokemonMoveError/PokemonMoveError';
import PokemonMoveSkeleton from '~/components/compositions/PokemonMoveCard/Components/PokemonMoveSkeleton/PokemonMoveSkeleton';
import type { PokemonMoveCategory } from '~/constants/pokemon-move-categories';
import type { PokemonType } from '~/constants/pokemon-types';
import { TypographyTypes } from '~/constants/typography';
import { t } from '~/lib/i18n';
import { formatDashedLabel } from '~/utils/stringUtils';
import classes from './PokemonMoveContent.module.scss';

const PokemonMoveContent = (props: PokemonMoveContentProps) => {
  const moveQuery = usePokemonMove(() => ({ id: props.id }));

  const type = () => moveQuery.data?.type?.name as PokemonType;
  const category = () =>
    moveQuery.data?.damage_class?.name as PokemonMoveCategory;

  const description = () =>
    moveQuery.data?.flavor_text_entries
      ?.find((entry) => entry.language?.name === 'en')
      ?.flavor_text?.replace(/[\n\f­]/g, ' ');

  return (
    <Show when={!moveQuery.isLoading} fallback={<PokemonMoveSkeleton />}>
      <Show
        when={!moveQuery.isError && moveQuery.data}
        fallback={<PokemonMoveError />}
      >
        <div class={classes.container}>
          <div class={classes.left}>
            <Typography type={TypographyTypes.CARD_TITLE} class={classes.name}>
              {formatDashedLabel(moveQuery.data?.name ?? '')}
            </Typography>
            <Show when={description()}>
              <Typography
                type={TypographyTypes.BODY_SM}
                color="muted-foreground"
                class={classes.description}
              >
                {description()}
              </Typography>
            </Show>
          </div>
          <div class={classes.right}>
            <Badge variant={type()}>{t(`pokemonTypes.${type()}`)}</Badge>
            <Typography
              type={TypographyTypes.CAPTION}
              color="muted-foreground"
              uppercase
              class={classes.meta}
            >
              {t(`pokemonMoveCategories.${category()}`)}
            </Typography>
            <Show when={moveQuery.data?.power !== null}>
              <Typography
                type={TypographyTypes.CAPTION}
                color="muted-foreground"
                class={classes.meta}
              >
                {t('pokemonDetails.movePower', {
                  power: moveQuery.data?.power ?? 0,
                })}
              </Typography>
            </Show>
          </div>
        </div>
      </Show>
    </Show>
  );
};

export default PokemonMoveContent;
