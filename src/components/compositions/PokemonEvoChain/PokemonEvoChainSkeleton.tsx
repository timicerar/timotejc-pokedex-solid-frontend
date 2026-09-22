import { FaSolidArrowRight } from 'solid-icons/fa';

import PokemonCardSkeleton from '~/components/compositions/PokemonCard/PokemonCardSkeleton';
import classes from './PokemonEvoChain.module.scss';

const PokemonEvoChainSkeleton = () => {
  return (
    <div class={classes.row}>
      <div class={classes.step}>
        <div class={classes.node}>
          <PokemonCardSkeleton hideBadges />
        </div>
      </div>
      <div class={classes.step}>
        <FaSolidArrowRight class={classes.arrow} aria-hidden="true" />
        <div class={classes.node}>
          <PokemonCardSkeleton hideBadges />
        </div>
      </div>
      <div class={classes.step}>
        <FaSolidArrowRight class={classes.arrow} aria-hidden="true" />
        <div class={classes.node}>
          <PokemonCardSkeleton hideBadges />
        </div>
      </div>
    </div>
  );
};

export default PokemonEvoChainSkeleton;
