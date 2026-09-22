import Card from '~/components/components/Card/Card';
import Typography from '~/components/components/Typography/Typography';
import type { PokemonInfoCardProps } from '~/components/compositions/PokemonInfoCard/PokemonInfoCard.interface';
import { TypographyTypes } from '~/constants/typography';
import classes from './PokemonInfoCard.module.scss';

const PokemonInfoCard = (props: PokemonInfoCardProps) => {
  const displayValue = () =>
    Array.isArray(props.value) ? props.value.join(', ') : props.value;

  return (
    <Card class={classes.card}>
      <Typography
        type={TypographyTypes.LABEL}
        color="muted-foreground"
        uppercase
      >
        {props.title}
      </Typography>
      <Typography type={TypographyTypes.ID_LABEL_LG}>
        {displayValue()}
      </Typography>
    </Card>
  );
};

export default PokemonInfoCard;
