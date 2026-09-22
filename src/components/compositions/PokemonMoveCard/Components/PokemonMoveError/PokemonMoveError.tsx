import Typography from '~/components/components/Typography/Typography';
import { NotFoundTypes } from '~/constants/not-found';
import { TypographyTypes } from '~/constants/typography';
import { getNotFoundData } from '~/utils/notFoundUtils';
import classes from './PokemonMoveError.module.scss';

const PokemonMoveError = () => {
  const data = getNotFoundData(NotFoundTypes.POKEMON_MOVE);

  return (
    <Typography
      type={TypographyTypes.BODY_SM}
      color="muted-foreground"
      class={classes.error}
    >
      {data.title}
    </Typography>
  );
};

export default PokemonMoveError;
