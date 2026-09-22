import type { VirtualItem } from '@tanstack/solid-virtual';

import type { NamedAPIResource } from '~/api/models/Pokemon';

export type PokemonListRowProps = {
  virtualRow: VirtualItem;
  measureElement: (element: Element) => void;
  rowItems: () => NamedAPIResource[];
  startIndex: number;
  showLoadingCard: () => boolean;
};
