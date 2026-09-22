import type { NamedAPIResource } from '~/api/models/Pokemon';

export type PokemonGenerationDetail = {
  id: number;
  name: string;
  main_region: NamedAPIResource;
  pokemon_species: NamedAPIResource[];
};
