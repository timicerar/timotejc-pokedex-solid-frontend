import {
  createEffect,
  createSignal,
  mergeProps,
  on,
  onCleanup,
  splitProps,
} from 'solid-js';

import type { ProgressBarProps } from '~/components/components/ProgressBar/ProgressBar.interface';
import { DEFAULT_PROGRESS_MAX_VALUE } from '~/constants/progress-bar';
import { asStyleObject, toCssValue } from '~/utils/styleUtils';
import classes from './ProgressBar.module.scss';

const ProgressBar = (rawProps: ProgressBarProps) => {
  const props = mergeProps(
    { maxValue: DEFAULT_PROGRESS_MAX_VALUE, shimmer: true },
    rawProps,
  );

  const [local, rest] = splitProps(props, [
    'value',
    'maxValue',
    'color',
    'maxWidth',
    'shimmer',
    'class',
    'style',
  ]);

  const [animatedValue, setAnimatedValue] = createSignal(0);

  createEffect(
    on(
      () => local.value,
      (value) => {
        const frame = requestAnimationFrame(() => setAnimatedValue(value));
        onCleanup(() => cancelAnimationFrame(frame));
      },
    ),
  );

  const percentage = () =>
    Math.min(100, Math.max(0, (animatedValue() / local.maxValue) * 100));

  return (
    <div
      classList={{
        [classes.track]: true,
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
      <div
        classList={{ [classes.fill]: true, [classes.shimmer]: local.shimmer }}
        style={{ width: `${percentage()}%`, background: local.color }}
      />
    </div>
  );
};

export default ProgressBar;
