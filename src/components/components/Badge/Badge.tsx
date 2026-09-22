import { mergeProps, splitProps } from 'solid-js';

import type { BadgeProps } from '~/components/components/Badge/Badge.interface';
import { BadgeSizes, BadgeVariants } from '~/constants/badge';
import classes from './Badge.module.scss';

const Badge = (rawProps: BadgeProps) => {
  const props = mergeProps(
    { variant: BadgeVariants.DEFAULT, size: BadgeSizes.DEFAULT },
    rawProps,
  );

  const [local, rest] = splitProps(props, [
    'variant',
    'size',
    'class',
    'children',
  ]);

  return (
    <span
      classList={{
        [classes.badge]: true,
        [classes[local.variant]]: true,
        [classes.sm]: local.size === BadgeSizes.SM,
        ...(local.class ? { [local.class]: true } : {}),
      }}
      {...rest}
    >
      {local.children}
    </span>
  );
};

export default Badge;
