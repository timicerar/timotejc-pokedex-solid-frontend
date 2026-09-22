import Container from '~/components/components/Container/Container';
import Skeleton from '~/components/components/Skeleton/Skeleton';
import classes from './PokemonDetailsSkeleton.module.scss';

const PokemonDetailsSkeleton = () => {
  return (
    <div class={classes.root}>
      <Container class={classes.hero}>
        <Skeleton class={classes.heroSkeleton} />
      </Container>
      <div class={classes.tabsBar}>
        <Skeleton class={classes.tabSkeleton} />
      </div>
      <Container>
        <Skeleton class={classes.contentSkeleton} />
      </Container>
    </div>
  );
};

export default PokemonDetailsSkeleton;
