import type { NamedAPIResource } from '~/api/models/Pokemon';

export type PokemonSpeciesFlavorTextEntry = {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
};

export type PokemonSpeciesGenus = {
  genus: string;
  language: NamedAPIResource;
};

export type PokemonSpeciesDetail = {
  id: number;
  name: string;
  capture_rate: number;
  base_happiness: number | null;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  generation: NamedAPIResource;
  egg_groups: NamedAPIResource[];
  evolution_chain: { url: string };
  flavor_text_entries: PokemonSpeciesFlavorTextEntry[];
  genera: PokemonSpeciesGenus[];
};
