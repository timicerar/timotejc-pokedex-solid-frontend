import { createMemo, splitProps } from 'solid-js';

import Select from '~/components/components/Select/Select';
import PokemonTypeOption from '~/components/compositions/SelectPokemonType/PokemonTypeOption/PokemonTypeOption';
import type { SelectPokemonTypeProps } from '~/components/compositions/SelectPokemonType/SelectPokemonType.interface';
import { t } from '~/lib/i18n';
import { getPokemonTypeOptions } from '~/utils/pokemonTypeUtils';

const SelectPokemonType = (rawProps: SelectPokemonTypeProps) => {
  const [local, rest] = splitProps(rawProps, [
    'label',
    'placeholder',
    'resetLabel',
  ]);

  const options = createMemo(() => getPokemonTypeOptions());
  const allTypesLabel = () => t('selectPokemonType.allTypes');

  return (
    <Select
      label={local.label ?? t('selectPokemonType.label')}
      placeholder={local.placeholder ?? allTypesLabel()}
      resetLabel={local.resetLabel ?? allTypesLabel()}
      {...rest}
      options={options()}
      renderOption={(option, { selected }) => (
        <PokemonTypeOption option={option} selected={selected} />
      )}
    />
  );
};

export default SelectPokemonType;
