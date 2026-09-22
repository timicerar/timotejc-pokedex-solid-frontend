import { splitProps } from 'solid-js';

import type { DividerProps } from '~/components/components/Divider/Divider.interface';
import classes from './Divider.module.scss';

const Divider = (props: DividerProps) => {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <div
      role="presentation"
      aria-hidden="true"
      classList={{
        [classes.divider]: true,
        ...(local.class ? { [local.class]: true } : {}),
      }}
      {...rest}
    />
  );
};

export default Divider;
