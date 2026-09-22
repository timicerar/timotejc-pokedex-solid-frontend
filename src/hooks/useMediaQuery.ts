import { createSignal, onCleanup } from 'solid-js';

import {
  type Breakpoint,
  type MediaQueryType,
  MediaQueryTypes,
} from '~/constants/breakpoints';
import { buildMediaQuery, getMatches } from '~/utils/mediaQueryUtils';

export const useMediaQuery = (
  breakpoint: Breakpoint,
  type: MediaQueryType = MediaQueryTypes.MAX,
) => {
  const query = buildMediaQuery(breakpoint, type);
  const [matches, setMatches] = createSignal(getMatches(query));

  const mediaQueryList = window.matchMedia(query);

  const handleChange = (event: MediaQueryListEvent) => {
    setMatches(event.matches);
  };

  mediaQueryList.addEventListener('change', handleChange);

  onCleanup(() => mediaQueryList.removeEventListener('change', handleChange));

  return matches;
};
