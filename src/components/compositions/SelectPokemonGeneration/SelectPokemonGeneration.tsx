import { createMemo, splitProps } from 'solid-js';

import Select from '~/components/components/Select/Select';
import PokemonGenerationOption from '~/components/compositions/SelectPokemonGeneration/PokemonGenerationOption/PokemonGenerationOption';
import type { SelectPokemonGenerationProps } from '~/components/compositions/SelectPokemonGeneration/SelectPokemonGeneration.interface';
import { t } from '~/lib/i18n';
import { getPokemonGenerationOptions } from '~/utils/pokemonGenerationUtils';

const SelectPokemonGeneration = (rawProps: SelectPokemonGenerationProps) => {
  const [local, rest] = splitProps(rawProps, [
    'label',
    'placeholder',
    'resetLabel',
  ]);

  const options = createMemo(() => getPokemonGenerationOptions());
  const allGenerationsLabel = () => t('selectPokemonGeneration.allGenerations');

  return (
    <Select
      label={local.label ?? t('selectPokemonGeneration.label')}
      placeholder={local.placeholder ?? allGenerationsLabel()}
      resetLabel={local.resetLabel ?? allGenerationsLabel()}
      {...rest}
      options={options()}
      renderOption={(option, { selected }) => (
        <PokemonGenerationOption option={option} selected={selected} />
      )}
    />
  );
};

export default SelectPokemonGeneration;
