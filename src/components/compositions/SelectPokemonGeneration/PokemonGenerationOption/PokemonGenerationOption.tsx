import { FaSolidCheck } from 'solid-icons/fa';

import Typography from '~/components/components/Typography/Typography';
import type { PokemonGenerationOptionProps } from '~/components/compositions/SelectPokemonGeneration/PokemonGenerationOption/PokemonGenerationOption.interface';
import classes from './PokemonGenerationOption.module.scss';

const PokemonGenerationOption = (props: PokemonGenerationOptionProps) => {
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
      <Typography as="span" type="body-sm">
        {props.option.label}
      </Typography>
    </span>
  );
};

export default PokemonGenerationOption;
