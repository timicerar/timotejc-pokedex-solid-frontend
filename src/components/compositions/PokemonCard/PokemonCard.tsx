import { createVisibilityObserver } from '@solid-primitives/intersection-observer';
import { Show } from 'solid-js';

import { usePokemon } from '~/api/pokemon/hooks';
import Card from '~/components/components/Card/Card';
import PokemonContent from '~/components/compositions/PokemonCard/Components/PokemonContent/PokemonContent';
import PokemonContentSkeleton from '~/components/compositions/PokemonCard/Components/PokemonContentSkeleton/PokemonContentSkeleton';
import type { PokemonCardProps } from '~/components/compositions/PokemonCard/PokemonCard.interface';
import { t } from '~/lib/i18n';
import { formatDashedLabel } from '~/utils/stringUtils';
import classes from './PokemonCard.module.scss';

const PokemonCard = (props: PokemonCardProps) => {
  // Read-only cache lookup: never triggers a fetch, only tells us whether
  // this pokemon's data already happens to be in the query cache (e.g. the
  // user has already opened its details), so we can skip the in-view gate.
  const cachedQuery = usePokemon(
    () => ({ name: props.name }),
    () => ({ enabled: false }),
  );

  let cardRef: HTMLElement | undefined;
  const useVisibility = createVisibilityObserver();
  const inView = useVisibility(() =>
    props.priority || cachedQuery.data ? undefined : cardRef,
  );

  const shouldRenderContent = () =>
    props.priority || inView() || Boolean(cachedQuery.data);

  return (
    <Card
      ref={(el) => {
        cardRef = el;
      }}
      fullWidth
      active={props.active}
      onClick={props.onClick}
      aria-label={t('pokemonCard.viewDetails', {
        name: formatDashedLabel(props.name),
      })}
      classList={{
        [classes.card]: true,
        [classes.noBadges]: !!props.hideBadges,
      }}
    >
      <Show
        when={shouldRenderContent()}
        fallback={<PokemonContentSkeleton hideBadges={props.hideBadges} />}
      >
        <PokemonContent
          name={props.name}
          hideBadges={props.hideBadges}
          priority={props.priority}
        />
      </Show>
    </Card>
  );
};

export default PokemonCard;
