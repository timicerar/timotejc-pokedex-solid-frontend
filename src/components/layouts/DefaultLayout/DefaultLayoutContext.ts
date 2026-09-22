import { createContext } from 'solid-js';

import type { DefaultLayoutContextType } from '~/components/layouts/DefaultLayout/DefaultLayout.interface';

export const DefaultLayoutContext = createContext<DefaultLayoutContextType>({
  setFilters: () => {},
});
