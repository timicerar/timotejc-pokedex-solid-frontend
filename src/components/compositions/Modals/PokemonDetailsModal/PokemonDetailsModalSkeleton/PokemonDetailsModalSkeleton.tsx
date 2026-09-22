import Skeleton from '~/components/components/Skeleton/Skeleton';
import classes from '../PokemonDetailsModal.module.scss';

const PokemonDetailsModalSkeleton = () => {
  return (
    <div class={classes.container}>
      <div class={classes.wrapper}>
        <Skeleton class={classes.imageSkeleton} />
        <Skeleton class={classes.idSkeleton} />
        <Skeleton class={classes.nameSkeleton} />
      </div>
      <div class={classes.badges}>
        <Skeleton class={classes.badgeSkeleton} />
        <Skeleton class={classes.badgeSkeleton} />
      </div>
      <Skeleton class={classes.statsSkeleton} />
      <Skeleton class={classes.weakSkeleton} />
      <Skeleton class={classes.buttonSkeleton} />
    </div>
  );
};

export default PokemonDetailsModalSkeleton;
