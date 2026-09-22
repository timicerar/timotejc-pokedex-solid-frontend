import type { RouteSectionProps } from '@solidjs/router';

import classes from './CenterLayout.module.scss';

const CenterLayout = (props: RouteSectionProps) => {
  return <div class={classes.layout}>{props.children}</div>;
};

export default CenterLayout;
