import { useNavigate } from '@solidjs/router';
import { FaSolidArrowRight } from 'solid-icons/fa';
import { For, Show } from 'solid-js';

import { usePokemon, usePokemonTypes } from '~/api/pokemon/hooks';
import Badge from '~/components/components/Badge/Badge';
import Button from '~/components/components/Button/Button';
import Image from '~/components/components/Image/Image';
import ModalHeader from '~/components/components/Modal/ModalHeader/ModalHeader';
import Typography from '~/components/components/Typography/Typography';
import PokemonDetailsModalError from '~/components/compositions/Modals/PokemonDetailsModal/PokemonDetailsModalError/PokemonDetailsModalError';
import PokemonDetailsModalSkeleton from '~/components/compositions/Modals/PokemonDetailsModal/PokemonDetailsModalSkeleton/PokemonDetailsModalSkeleton';
import PokemonStats from '~/components/compositions/PokemonStats/PokemonStats';
import PokemonWeakAgainst from '~/components/compositions/PokemonWeakAgainst/PokemonWeakAgainst';
import { BadgeSizes } from '~/constants/badge';
import { ButtonVariants } from '~/constants/button';
import { ModalTypes } from '~/constants/modal-provider';
import {
  DESKTOP_POKEMON_IMAGE_SIZE,
  MOBILE_POKEMON_IMAGE_SIZE,
} from '~/constants/pokemon';
import type { PokemonType } from '~/constants/pokemon-types';
import { Routes } from '~/constants/routes';
import { TypographyTypes } from '~/constants/typography';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import { usePokemonImageMode } from '~/hooks/usePokemonImageMode';
import { t } from '~/lib/i18n';
import { closeModal } from '~/store/modals';
import { getPrimaryPokemonImage } from '~/utils/pokemonSpriteUtils';
import classes from '../PokemonDetailsModal.module.scss';

type PokemonDetailsModalContentProps = {
  name: string;
};

const PokemonDetailsModalContent = (props: PokemonDetailsModalContentProps) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('sm');
  const imageMode = usePokemonImageMode();

  const pokemonQuery = usePokemon(() => ({ name: props.name }));
  const typesQuery = usePokemonTypes(() => ({
    enabled:
      !pokemonQuery.isLoading &&
      !pokemonQuery.isError &&
      Boolean(pokemonQuery.data),
  }));

  const isLoading = () => pokemonQuery.isLoading || typesQuery.isLoading;
  const pokemon = () => (!pokemonQuery.isError ? pokemonQuery.data : undefined);

  return (
    <Show when={!isLoading()} fallback={<PokemonDetailsModalSkeleton />}>
      <Show when={pokemon()} fallback={<PokemonDetailsModalError />}>
        {(data) => {
          const image = () =>
            getPrimaryPokemonImage(data(), imageMode().lowerResImg);
          const imageSize = () =>
            isMobile() ? MOBILE_POKEMON_IMAGE_SIZE : DESKTOP_POKEMON_IMAGE_SIZE;

          return (
            <>
              <ModalHeader
                onClose={() => closeModal(ModalTypes.POKEMON_DETAILS)}
              />
              <div class={classes.container}>
                <div class={classes.wrapper}>
                  <Image
                    src={image()}
                    alt={data().name}
                    width={imageSize()}
                    height={imageSize()}
                    class={classes.image}
                  />
                  <Typography
                    type={TypographyTypes.ID_LABEL}
                    color="muted-foreground"
                    align="center"
                  >
                    #{String(data().id).padStart(4, '0')}
                  </Typography>
                  <Typography
                    as="h2"
                    type={TypographyTypes.HEADING_LG}
                    align="center"
                    class={classes.name}
                  >
                    {data().name}
                  </Typography>
                  <div class={classes.badges}>
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
                </div>
                <PokemonStats pokemon={data()} showBasicStats />
                <PokemonWeakAgainst
                  pokemon={data()}
                  typeDetails={typesQuery.data}
                />
                <Button
                  type="button"
                  variant={ButtonVariants.PRIMARY}
                  fullWidth
                  trailingIcon={<FaSolidArrowRight aria-hidden="true" />}
                  onClick={() => {
                    closeModal(ModalTypes.POKEMON_DETAILS);
                    navigate(
                      Routes.POKEMON_DETAILS({ pokemonName: data().name }),
                    );
                  }}
                >
                  {t('modal.pokemonDetailsModal.viewFullDetails')}
                </Button>
              </div>
            </>
          );
        }}
      </Show>
    </Show>
  );
};

export default PokemonDetailsModalContent;
