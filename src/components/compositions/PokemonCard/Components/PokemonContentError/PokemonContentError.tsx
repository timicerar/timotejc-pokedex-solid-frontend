import Typography from '~/components/components/Typography/Typography';
import { NotFoundTypes } from '~/constants/not-found';
import { TypographyTypes } from '~/constants/typography';
import { getNotFoundData } from '~/utils/notFoundUtils';
import classes from './PokemonContentError.module.scss';

const PokemonContentError = () => {
  const data = getNotFoundData(NotFoundTypes.POKEMON_DETAILS);

  return (
    <div class={classes.error}>
      <Typography as="h3" type={TypographyTypes.DISPLAY_BASE} uppercase>
        {data.title}
      </Typography>
      <Typography type={TypographyTypes.BODY_SM} color="muted-foreground">
        {data.description}
      </Typography>
    </div>
  );
};

export default PokemonContentError;
