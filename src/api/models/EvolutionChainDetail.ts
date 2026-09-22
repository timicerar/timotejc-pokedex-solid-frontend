import type { NamedAPIResource } from '~/api/models/Pokemon';

export type EvolutionDetail = {
  item: NamedAPIResource | null;
  trigger: NamedAPIResource;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  time_of_day: string;
  known_move: NamedAPIResource | null;
  known_move_type: NamedAPIResource | null;
  held_item: NamedAPIResource | null;
  party_species: NamedAPIResource | null;
  party_type: NamedAPIResource | null;
  trade_species: NamedAPIResource | null;
  turn_upside_down: boolean;
};

export type EvolutionChainLink = {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[];
};

export type EvolutionChainDetail = {
  id: number;
  baby_trigger_item: NamedAPIResource | null;
  chain: EvolutionChainLink;
};
