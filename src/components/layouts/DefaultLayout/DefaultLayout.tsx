import type { RouteSectionProps } from '@solidjs/router';

import NavBar from '~/components/compositions/NavBar/NavBar';
import { ElementIds } from '~/constants/element-ids';
import classes from './DefaultLayout.module.scss';

const DefaultLayout = (props: RouteSectionProps) => {
  return (
    <div id={ElementIds.MAIN_CONTENT} class={classes.layout}>
      <NavBar />
      <main>{props.children}</main>
    </div>
  );
};

export default DefaultLayout;
