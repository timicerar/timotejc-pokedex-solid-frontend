export type NamedAPIResource = {
  name: string;
  url: string;
};

export type PokemonList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
};

export type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
};

export type PokemonType = {
  slot: number;
  type: NamedAPIResource;
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
};

export type PokemonMoveVersionGroupDetail = {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
};

export type PokemonMove = {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersionGroupDetail[];
};

export type PokemonSpriteSet = {
  front_default: string | null;
  front_shiny?: string | null;
};

export type PokemonSprites = {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other?: {
    'official-artwork'?: PokemonSpriteSet;
    home?: PokemonSpriteSet;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number | null;
  height: number;
  weight: number;
  order: number;
  is_default: boolean;
  location_area_encounters: string;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  moves: PokemonMove[];
  species: NamedAPIResource;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
};
