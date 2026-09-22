import type { PokemonTypeDotProps } from '~/components/compositions/SelectPokemonType/PokemonTypeDot/PokemonTypeDot.interface';
import { Colors } from '~/constants/colors';
import classes from './PokemonTypeDot.module.scss';

const PokemonTypeDot = (props: PokemonTypeDotProps) => {
  return (
    <span
      classList={{
        [classes.dot]: true,
        ...(props.class ? { [props.class]: true } : {}),
      }}
      style={{ 'background-color': Colors[props.color] }}
    />
  );
};

export default PokemonTypeDot;
