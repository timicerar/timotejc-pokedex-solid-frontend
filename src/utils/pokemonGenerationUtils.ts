import type { SelectOptionData } from '~/components/components/Select/Select.interface';
import { PokemonGenerations } from '~/constants/pokemon-generations';
import { t } from '~/lib/i18n';

export type PokemonGenerationOptionData = SelectOptionData;

export const getPokemonGenerationOptions = (): PokemonGenerationOptionData[] =>
  Object.values(PokemonGenerations).map((generation) => ({
    value: generation,
    label: t(`pokemonGenerations.${generation}`),
  }));
