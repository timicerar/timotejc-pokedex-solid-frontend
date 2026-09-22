import Card from '~/components/components/Card/Card';
import PokemonContentSkeleton from '~/components/compositions/PokemonCard/Components/PokemonContentSkeleton/PokemonContentSkeleton';
import classes from './PokemonCard.module.scss';

type PokemonCardSkeletonProps = {
  hideBadges?: boolean;
};

const PokemonCardSkeleton = (props: PokemonCardSkeletonProps) => {
  return (
    <Card
      fullWidth
      classList={{
        [classes.card]: true,
        [classes.noBadges]: !!props.hideBadges,
      }}
    >
      <PokemonContentSkeleton hideBadges={props.hideBadges} />
    </Card>
  );
};

export default PokemonCardSkeleton;
