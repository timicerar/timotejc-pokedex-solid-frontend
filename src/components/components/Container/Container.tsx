import { splitProps } from 'solid-js';

import type { ContainerProps } from '~/components/components/Container/Container.interface';
import { asStyleObject, toCssValue } from '~/utils/styleUtils';
import classes from './Container.module.scss';

const Container = (props: ContainerProps) => {
  const [local, rest] = splitProps(props, [
    'center',
    'maxWidth',
    'class',
    'style',
    'children',
  ]);

  return (
    <div
      classList={{
        [classes.container]: true,
        [classes.center]: !!local.center,
        [classes.hasMaxWidth]: local.maxWidth !== undefined,
        ...(local.class ? { [local.class]: true } : {}),
      }}
      style={{
        ...(local.maxWidth !== undefined && {
          'max-width': toCssValue(local.maxWidth),
        }),
        ...asStyleObject(local.style),
      }}
      {...rest}
    >
      {local.children}
    </div>
  );
};

export default Container;
