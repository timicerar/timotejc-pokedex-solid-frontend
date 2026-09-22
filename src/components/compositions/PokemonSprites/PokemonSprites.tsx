import { FaSolidChevronLeft, FaSolidChevronRight } from 'solid-icons/fa';
import { createMemo, For, Show } from 'solid-js';

import type { Pokemon } from '~/api/models/Pokemon';
import Button from '~/components/components/Button/Button';
import Carousel from '~/components/components/Carousel/Carousel';
import { useCarouselNav } from '~/components/components/Carousel/hooks/useCarouselNav';
import Image from '~/components/components/Image/Image';
import Typography from '~/components/components/Typography/Typography';
import { ButtonVariants } from '~/constants/button';
import { TypographyTypes } from '~/constants/typography';
import { t } from '~/lib/i18n';
import { getPokemonSpriteItems } from '~/utils/pokemonSpriteUtils';
import classes from './PokemonSprites.module.scss';

type PokemonSpritesProps = {
  pokemon: Pokemon;
};

const SPRITE_SIZE = 220;

const PokemonSprites = (props: PokemonSpritesProps) => {
  const sprites = createMemo(() => getPokemonSpriteItems(props.pokemon));

  const {
    setApi,
    selectedIndex,
    scrollSnaps,
    canScrollPrev,
    canScrollNext,
    scrollTo,
    scrollPrev,
    scrollNext,
  } = useCarouselNav();

  return (
    <Show when={sprites().length > 0}>
      <div class={classes.container}>
        <Carousel setApi={setApi} class={classes.carousel}>
          {sprites().map((sprite) => (
            <div class={classes.slide}>
              <Image
                src={sprite.src}
                alt={t(`pokemonSprites.${sprite.key}`)}
                width={SPRITE_SIZE}
                height={SPRITE_SIZE}
                class={classes.image}
              />
              <Typography
                type={TypographyTypes.LABEL}
                color="muted-foreground"
                uppercase
              >
                {t(`pokemonSprites.${sprite.key}`)}
              </Typography>
            </div>
          ))}
        </Carousel>
        <Show when={sprites().length > 1}>
          <div class={classes.nav}>
            <Button
              variant={ButtonVariants.ROUNDED}
              ariaLabel={t('pokemonSprites.previous')}
              disabled={!canScrollPrev()}
              onClick={scrollPrev}
              leadingIcon={<FaSolidChevronLeft aria-hidden="true" />}
            />
            <div class={classes.indicators}>
              <For each={scrollSnaps()}>
                {(_, index) => (
                  <button
                    type="button"
                    aria-label={t('pokemonSprites.goToSlide', {
                      index: index() + 1,
                    })}
                    onClick={() => scrollTo(index())}
                    classList={{
                      [classes.indicator]: true,
                      [classes.active]: index() === selectedIndex(),
                    }}
                  />
                )}
              </For>
            </div>
            <Button
              variant={ButtonVariants.ROUNDED}
              ariaLabel={t('pokemonSprites.next')}
              disabled={!canScrollNext()}
              onClick={scrollNext}
              leadingIcon={<FaSolidChevronRight aria-hidden="true" />}
            />
          </div>
        </Show>
      </div>
    </Show>
  );
};

export default PokemonSprites;
