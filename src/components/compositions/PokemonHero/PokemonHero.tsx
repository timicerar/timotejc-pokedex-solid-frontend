import { For, Show } from 'solid-js';

import type { Pokemon } from '~/api/models/Pokemon';
import { usePokemonGenerations, usePokemonSpecies } from '~/api/pokemon/hooks';
import Badge from '~/components/components/Badge/Badge';
import Container from '~/components/components/Container/Container';
import Image from '~/components/components/Image/Image';
import Skeleton from '~/components/components/Skeleton/Skeleton';
import Typography from '~/components/components/Typography/Typography';
import { BadgeSizes } from '~/constants/badge';
import {
  DESKTOP_POKEMON_HERO_IMAGE_SIZE,
  MOBILE_POKEMON_HERO_IMAGE_SIZE,
} from '~/constants/pokemon';
import type { PokemonGeneration } from '~/constants/pokemon-generations';
import type { PokemonRegion } from '~/constants/pokemon-regions';
import type { PokemonType } from '~/constants/pokemon-types';
import { TypographyTypes } from '~/constants/typography';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import { t } from '~/lib/i18n';
import { getIdFromResourceUrl } from '~/utils/apiResourceUtils';
import classes from './PokemonHero.module.scss';

type PokemonHeroProps = {
  pokemon: Pokemon;
};

const PokemonHero = (props: PokemonHeroProps) => {
  const isMobile = useMediaQuery('sm');

  const speciesId = () => getIdFromResourceUrl(props.pokemon.species.url);
  const speciesQuery = usePokemonSpecies(() => ({
    name: props.pokemon.species.name,
    id: speciesId() ? Number(speciesId()) : undefined,
  }));
  const generationsQuery = usePokemonGenerations(() => ({
    enabled: Boolean(speciesQuery.data),
  }));

  const generation = () =>
    generationsQuery.data?.find(
      (item) => item.name === speciesQuery.data?.generation?.name,
    );

  const isLoadingGeneration = () =>
    speciesQuery.isLoading || generationsQuery.isLoading;

  const image = () =>
    props.pokemon.sprites?.other?.['official-artwork']?.front_default ??
    props.pokemon.sprites?.front_default ??
    '';
  const imageSize = () =>
    isMobile()
      ? MOBILE_POKEMON_HERO_IMAGE_SIZE
      : DESKTOP_POKEMON_HERO_IMAGE_SIZE;

  return (
    <Container class={classes.root}>
      <div class={classes.container}>
        <Image
          src={image()}
          alt={props.pokemon.name}
          width={imageSize()}
          height={imageSize()}
          class={classes.image}
          loading="eager"
          fetchpriority="high"
        />
        <div class={classes.wrapper}>
          <Typography type={TypographyTypes.ID_LABEL} color="muted-foreground">
            #{String(props.pokemon.id).padStart(4, '0')}
          </Typography>
          <Typography
            as="h1"
            type={TypographyTypes.HEADING_XL}
            class={classes.name}
          >
            {props.pokemon.name}
          </Typography>
          <div class={classes.badges}>
            <For each={props.pokemon.types}>
              {({ type }) => {
                const pokemonType = type.name as PokemonType;

                return (
                  <Badge
                    variant={pokemonType}
                    size={isMobile() ? BadgeSizes.SM : BadgeSizes.DEFAULT}
                  >
                    {t(`pokemonTypes.${pokemonType}`)}
                  </Badge>
                );
              }}
            </For>
          </div>
          <Show
            when={!isLoadingGeneration()}
            fallback={<Skeleton class={classes.generationSkeleton} />}
          >
            <Show when={speciesQuery.data && generation()}>
              <Typography
                type={TypographyTypes.CAPTION}
                color="muted-foreground"
                class={classes.generation}
              >
                {t('pokemonDetails.generation', {
                  generation: t(
                    `pokemonGenerations.${speciesQuery.data?.generation.name as PokemonGeneration}`,
                  ),
                  region: t(
                    `pokemonRegions.${generation()?.main_region.name as PokemonRegion}`,
                  ),
                })}
              </Typography>
            </Show>
          </Show>
        </div>
      </div>
    </Container>
  );
};

export default PokemonHero;
