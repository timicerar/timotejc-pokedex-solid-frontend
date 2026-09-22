import {
  type Breakpoint,
  Breakpoints,
  type MediaQueryType,
  MediaQueryTypes,
} from '~/constants/breakpoints';

export const buildMediaQuery = (
  breakpoint: Breakpoint,
  type: MediaQueryType,
) => {
  const width =
    type === MediaQueryTypes.MAX
      ? Breakpoints[breakpoint] - 0.5
      : Breakpoints[breakpoint];

  return `only screen and (${type}-width: ${width}px)`;
};

export const getMatches = (query: string) =>
  typeof window !== 'undefined' ? window.matchMedia(query).matches : false;
