import { splitProps } from 'solid-js';

import type { SkeletonProps } from '~/components/components/Skeleton/Skeleton.interface';
import { asStyleObject, toCssValue } from '~/utils/styleUtils';
import classes from './Skeleton.module.scss';

const Skeleton = (props: SkeletonProps) => {
  const [local, rest] = splitProps(props, [
    'borderRadius',
    'maxWidth',
    'minHeight',
    'class',
    'style',
  ]);

  return (
    <div
      aria-hidden="true"
      classList={{
        [classes.skeleton]: true,
        ...(local.class ? { [local.class]: true } : {}),
      }}
      style={{
        ...(local.borderRadius !== undefined && {
          'border-radius': toCssValue(local.borderRadius),
        }),
        ...(local.maxWidth !== undefined && {
          'max-width': toCssValue(local.maxWidth),
        }),
        ...(local.minHeight !== undefined && {
          'min-height': toCssValue(local.minHeight),
        }),
        ...asStyleObject(local.style),
      }}
      {...rest}
    />
  );
};

export default Skeleton;
