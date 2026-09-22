import { For, Show } from 'solid-js';

import { usePokemon } from '~/api/pokemon/hooks';
import Badge from '~/components/components/Badge/Badge';
import Image from '~/components/components/Image/Image';
import Typography from '~/components/components/Typography/Typography';
import type { PokemonContentProps } from '~/components/compositions/PokemonCard/Components/PokemonContent/PokemonContent.interface';
import PokemonContentError from '~/components/compositions/PokemonCard/Components/PokemonContentError/PokemonContentError';
import PokemonContentSkeleton from '~/components/compositions/PokemonCard/Components/PokemonContentSkeleton/PokemonContentSkeleton';
import { BadgeSizes } from '~/constants/badge';
import {
  DESKTOP_POKEMON_IMAGE_SIZE,
  MOBILE_POKEMON_IMAGE_SIZE,
} from '~/constants/pokemon';
import type { PokemonType } from '~/constants/pokemon-types';
import { TypographyTypes } from '~/constants/typography';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import { t } from '~/lib/i18n';
import classes from './PokemonContent.module.scss';

const PokemonContent = (props: PokemonContentProps) => {
  const isMobile = useMediaQuery('sm');
  const pokemonQuery = usePokemon(() => ({ name: props.name }));

  const pokemon = () => (!pokemonQuery.isError ? pokemonQuery.data : undefined);

  return (
    <Show when={!pokemonQuery.isLoading} fallback={<PokemonContentSkeleton />}>
      <Show when={pokemon()} fallback={<PokemonContentError />}>
        {(data) => {
          const image = () =>
            data().sprites?.other?.['official-artwork']?.front_default ??
            data().sprites?.front_default ??
            '';
          const imageSize = () =>
            isMobile() ? MOBILE_POKEMON_IMAGE_SIZE : DESKTOP_POKEMON_IMAGE_SIZE;

          return (
            <>
              <Typography
                type={TypographyTypes.ID_LABEL}
                color="muted-foreground"
                class={classes.id}
              >
                #{String(data().id).padStart(4, '0')}
              </Typography>
              <Image
                src={image()}
                alt={data().name}
                width={imageSize()}
                height={imageSize()}
                class={classes.image}
                loading={props.priority ? 'eager' : 'lazy'}
                fetchpriority={props.priority ? 'high' : 'auto'}
              />
              <div class={classes.wrapper}>
                <Typography
                  type={TypographyTypes.CARD_TITLE}
                  class={classes.name}
                >
                  {data().name}
                </Typography>
                <Show when={!props.hideBadges}>
                  <div class={classes.types}>
                    <For each={data().types}>
                      {({ type }) => {
                        const pokemonType = type.name as PokemonType;

                        return (
                          <Badge
                            variant={pokemonType}
                            size={
                              isMobile() ? BadgeSizes.SM : BadgeSizes.DEFAULT
                            }
                          >
                            {t(`pokemonTypes.${pokemonType}`)}
                          </Badge>
                        );
                      }}
                    </For>
                  </div>
                </Show>
              </div>
            </>
          );
        }}
      </Show>
    </Show>
  );
};

export default PokemonContent;
