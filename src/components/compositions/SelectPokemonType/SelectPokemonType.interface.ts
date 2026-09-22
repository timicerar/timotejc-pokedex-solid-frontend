import type { SelectProps } from '~/components/components/Select/Select.interface';
import type { PokemonTypeOptionData } from '~/utils/pokemonTypeUtils';

export type SelectPokemonTypeProps = Omit<
  SelectProps<PokemonTypeOptionData>,
  'options' | 'renderOption' | 'label'
> & {
  label?: string;
};
