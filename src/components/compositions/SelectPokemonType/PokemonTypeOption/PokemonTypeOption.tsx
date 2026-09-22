import { FaSolidCheck } from 'solid-icons/fa';

import Typography from '~/components/components/Typography/Typography';
import PokemonTypeDot from '~/components/compositions/SelectPokemonType/PokemonTypeDot/PokemonTypeDot';
import type { PokemonTypeOptionProps } from '~/components/compositions/SelectPokemonType/PokemonTypeOption/PokemonTypeOption.interface';
import classes from './PokemonTypeOption.module.scss';

const PokemonTypeOption = (props: PokemonTypeOptionProps) => {
  return (
    <span
      classList={{
        [classes.option]: true,
        [classes.selected]: props.selected,
      }}
    >
      <FaSolidCheck
        classList={{ [classes.check]: true, [classes.visible]: props.selected }}
      />
      <PokemonTypeDot color={props.option.color} />
      <Typography as="span" type="body-sm">
        {props.option.label}
      </Typography>
    </span>
  );
};

export default PokemonTypeOption;
