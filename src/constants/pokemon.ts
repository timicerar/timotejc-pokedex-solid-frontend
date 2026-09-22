import { getStaleGcTime } from '~/api';

export const POKEMON_LIST_LIMIT = 50;
export const POKEMON_LIST_ALL_LIMIT = 10000;
export const POKEMON_GC_TIME = getStaleGcTime(8 * 60);

export const DESKTOP_POKEMON_IMAGE_SIZE = 160;
export const MOBILE_POKEMON_IMAGE_SIZE = 120;

export const DESKTOP_POKEMON_HERO_IMAGE_SIZE = 220;
export const MOBILE_POKEMON_HERO_IMAGE_SIZE = 180;
