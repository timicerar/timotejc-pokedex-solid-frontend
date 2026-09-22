import type { RouteSectionProps } from '@solidjs/router';
import { createSignal, type JSX, Show } from 'solid-js';

import NavBar from '~/components/compositions/NavBar/NavBar';
import { DefaultLayoutContext } from '~/components/layouts/DefaultLayout/DefaultLayoutContext';
import { ElementIds } from '~/constants/element-ids';
import classes from './DefaultLayout.module.scss';

const DefaultLayout = (props: RouteSectionProps) => {
  const [filters, setFilters] = createSignal<JSX.Element | null>(null);

  return (
    <DefaultLayoutContext.Provider value={{ setFilters }}>
      <div
        id={ElementIds.MAIN_CONTENT}
        classList={{
          [classes.layout]: true,
          [classes.noFilters]: !filters(),
        }}
      >
        <NavBar />
        <Show when={filters()}>
          <div class={classes.filters}>{filters()}</div>
        </Show>
        <main>{props.children}</main>
      </div>
    </DefaultLayoutContext.Provider>
  );
};

export default DefaultLayout;
