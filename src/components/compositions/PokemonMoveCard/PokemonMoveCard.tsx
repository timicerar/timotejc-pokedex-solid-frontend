import { createVisibilityObserver } from '@solid-primitives/intersection-observer';
import { Show } from 'solid-js';

import { usePokemonMove } from '~/api/pokemon/hooks';
import Card from '~/components/components/Card/Card';
import PokemonMoveContent from '~/components/compositions/PokemonMoveCard/Components/PokemonMoveContent/PokemonMoveContent';
import PokemonMoveSkeleton from '~/components/compositions/PokemonMoveCard/Components/PokemonMoveSkeleton/PokemonMoveSkeleton';
import type { PokemonMoveCardProps } from '~/components/compositions/PokemonMoveCard/PokemonMoveCard.interface';
import { CardPaddings } from '~/constants/card';
import classes from './PokemonMoveCard.module.scss';

const PokemonMoveCard = (props: PokemonMoveCardProps) => {
  // Read-only cache lookup, mirrors PokemonCard's own gating: never triggers
  // a fetch, just tells us whether this move is already cached so we can
  // skip the in-view gate.
  const cachedQuery = usePokemonMove(
    () => ({ id: props.id }),
    () => ({ enabled: false }),
  );

  let cardRef: HTMLElement | undefined;
  const useVisibility = createVisibilityObserver();
  const inView = useVisibility(() => (cachedQuery.data ? undefined : cardRef));

  const shouldRenderContent = () => inView() || Boolean(cachedQuery.data);

  return (
    <Card
      ref={(el) => {
        cardRef = el;
      }}
      fullWidth
      padding={CardPaddings.DENSE}
      class={classes.card}
    >
      <Show when={shouldRenderContent()} fallback={<PokemonMoveSkeleton />}>
        <PokemonMoveContent id={props.id} />
      </Show>
    </Card>
  );
};

export default PokemonMoveCard;
