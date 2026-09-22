import type { NamedAPIResource } from '~/api/models/Pokemon';

export type PokemonTypePokemon = {
  slot: number;
  pokemon: NamedAPIResource;
};

export type PokemonTypeDamageRelations = {
  double_damage_from: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
};

export type PokemonTypeDetail = {
  id: number;
  name: string;
  pokemon: PokemonTypePokemon[];
  damage_relations: PokemonTypeDamageRelations;
};
