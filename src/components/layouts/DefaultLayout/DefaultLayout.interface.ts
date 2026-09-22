import type { JSX } from 'solid-js';

export type DefaultLayoutContextType = {
  setFilters: (filters: JSX.Element | null) => void;
};
