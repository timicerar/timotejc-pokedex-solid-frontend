import { createEffect, type JSX, onCleanup, useContext } from 'solid-js';

import { DefaultLayoutContext } from '~/components/layouts/DefaultLayout/DefaultLayoutContext';

export const useLayoutFilters = (filters: () => JSX.Element | null) => {
  const { setFilters } = useContext(DefaultLayoutContext);

  createEffect(() => {
    setFilters(filters());
    onCleanup(() => setFilters(null));
  });
};
