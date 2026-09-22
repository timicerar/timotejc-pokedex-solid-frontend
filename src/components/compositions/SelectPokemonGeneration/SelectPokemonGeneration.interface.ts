import type { SelectProps } from '~/components/components/Select/Select.interface';
import type { PokemonGenerationOptionData } from '~/utils/pokemonGenerationUtils';

export type SelectPokemonGenerationProps = Omit<
  SelectProps<PokemonGenerationOptionData>,
  'options' | 'renderOption' | 'label'
> & {
  label?: string;
};
