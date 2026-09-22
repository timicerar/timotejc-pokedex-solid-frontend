import { mergeProps, splitProps } from 'solid-js';

import ProgressBar from '~/components/components/ProgressBar/ProgressBar';
import type { StatBarProps } from '~/components/components/StatBar/StatBar.interface';
import Typography from '~/components/components/Typography/Typography';
import { DEFAULT_STAT_MAX_VALUE } from '~/constants/stat-bar';
import { asStyleObject, toCssValue } from '~/utils/styleUtils';
import classes from './StatBar.module.scss';

const StatBar = (rawProps: StatBarProps) => {
  const props = mergeProps(
    { maxValue: DEFAULT_STAT_MAX_VALUE, shimmer: false },
    rawProps,
  );

  const [local, rest] = splitProps(props, [
    'label',
    'color',
    'value',
    'maxValue',
    'maxWidth',
    'minWidth',
    'shimmer',
    'class',
    'style',
  ]);

  return (
    <div
      classList={{
        [classes.stat]: true,
        ...(local.class ? { [local.class]: true } : {}),
      }}
      style={{
        ...(local.maxWidth !== undefined && {
          'max-width': toCssValue(local.maxWidth),
        }),
        ...(local.minWidth !== undefined && {
          'min-width': toCssValue(local.minWidth),
        }),
        ...asStyleObject(local.style),
      }}
      {...rest}
    >
      <Typography
        as="span"
        type="label"
        uppercase
        color="muted-foreground"
        class={classes.label}
      >
        {local.label}
      </Typography>
      <ProgressBar
        class={classes.progress}
        value={local.value}
        maxValue={local.maxValue}
        color={local.color}
        shimmer={local.shimmer}
      />
      <Typography
        as="span"
        type="stat-value"
        align="right"
        class={classes.value}
      >
        {local.value}
      </Typography>
    </div>
  );
};

export default StatBar;
