import { Colors } from '~/constants/colors';
import { t } from '~/lib/i18n';

export const StatColors = {
  HP: Colors['stat-hp'],
  ATTACK: Colors['stat-attack'],
  DEFENSE: Colors['stat-defense'],
  SPECIAL_ATTACK: Colors['stat-special-attack'],
  SPECIAL_DEFENSE: Colors['stat-special-defense'],
  SPEED: Colors['stat-speed'],
} as const;

export type StatColor = (typeof StatColors)[keyof typeof StatColors];

export const StatTypes = {
  HP: 'hp',
  ATTACK: 'attack',
  DEFENSE: 'defense',
  SPECIAL_ATTACK: 'special-attack',
  SPECIAL_DEFENSE: 'special-defense',
  SPEED: 'speed',
} as const;

export type StatType = (typeof StatTypes)[keyof typeof StatTypes];

// Base stats cap at 255 in the games; used as StatBar's fill ceiling.
export const DEFAULT_STAT_MAX_VALUE = 255;

export const getPokemonStats = () => {
  return [
    {
      key: StatTypes.HP,
      label: t('pokemonStats.hp'),
      color: StatColors.HP,
      value: 0,
    },
    {
      key: StatTypes.ATTACK,
      label: t('pokemonStats.attack'),
      color: StatColors.ATTACK,
      value: 0,
    },
    {
      key: StatTypes.DEFENSE,
      label: t('pokemonStats.defense'),
      color: StatColors.DEFENSE,
      value: 0,
    },
    {
      key: StatTypes.SPECIAL_ATTACK,
      label: t('pokemonStats.special-attack'),
      color: StatColors.SPECIAL_ATTACK,
      value: 0,
    },
    {
      key: StatTypes.SPECIAL_DEFENSE,
      label: t('pokemonStats.special-defense'),
      color: StatColors.SPECIAL_DEFENSE,
      value: 0,
    },
    {
      key: StatTypes.SPEED,
      label: t('pokemonStats.speed'),
      color: StatColors.SPEED,
      value: 0,
    },
  ];
};
