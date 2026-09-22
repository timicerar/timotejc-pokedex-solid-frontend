import type { PokemonTypeDetail } from '~/api/models/PokemonTypeDetail';
import type { SelectOptionData } from '~/components/components/Select/Select.interface';
import type { Color } from '~/constants/colors';
import { type PokemonType, PokemonTypes } from '~/constants/pokemon-types';
import { t } from '~/lib/i18n';

export type PokemonTypeOptionData = SelectOptionData & { color: Color };

export const getPokemonTypeColor = (type: string): Color =>
  `type-${type}` as Color;

export const getPokemonTypeOptions = (): PokemonTypeOptionData[] =>
  Object.values(PokemonTypes).map((type) => ({
    value: type,
    label: t(`pokemonTypes.${type}`),
    color: getPokemonTypeColor(type),
  }));

export const getPokemonWeaknesses = (
  types: PokemonType[],
  typeDetails?: PokemonTypeDetail[],
): PokemonType[] => {
  const defendingTypes = typeDetails?.filter((detail) =>
    types.includes(detail.name as PokemonType),
  );

  if (!defendingTypes?.length) {
    return [];
  }

  const candidates = new Set<string>();

  for (const defending of defendingTypes) {
    const { double_damage_from, half_damage_from, no_damage_from } =
      defending.damage_relations;

    for (const { name } of [
      ...double_damage_from,
      ...half_damage_from,
      ...no_damage_from,
    ]) {
      candidates.add(name);
    }
  }

  return [...candidates].filter((attackingType) => {
    const multiplier = defendingTypes.reduce((total, defending) => {
      const { double_damage_from, half_damage_from, no_damage_from } =
        defending.damage_relations;

      if (no_damage_from.some(({ name }) => name === attackingType)) {
        return 0;
      }

      if (double_damage_from.some(({ name }) => name === attackingType)) {
        return total * 2;
      }

      if (half_damage_from.some(({ name }) => name === attackingType)) {
        return total * 0.5;
      }

      return total;
    }, 1);

    return multiplier > 1;
  }) as PokemonType[];
};
