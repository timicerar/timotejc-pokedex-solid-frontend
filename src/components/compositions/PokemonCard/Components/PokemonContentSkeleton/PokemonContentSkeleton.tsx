import { Show } from 'solid-js';

import Skeleton from '~/components/components/Skeleton/Skeleton';
import classes from './PokemonContentSkeleton.module.scss';

type PokemonContentSkeletonProps = {
  hideBadges?: boolean;
};

const PokemonContentSkeleton = (props: PokemonContentSkeletonProps) => {
  return (
    <>
      <Skeleton class={classes.id} />
      <Skeleton class={classes.image} />
      <div class={classes.wrapper}>
        <Skeleton class={classes.name} />
        <Show when={!props.hideBadges}>
          <div class={classes.types}>
            <Skeleton class={classes.badge} />
          </div>
        </Show>
      </div>
    </>
  );
};

export default PokemonContentSkeleton;
