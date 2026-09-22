import { mergeProps, splitProps } from 'solid-js';

import type { InputProps } from '~/components/components/Input/Input.interface';
import { toCssValue } from '~/utils/styleUtils';
import classes from './Input.module.scss';

const Input = (rawProps: InputProps) => {
  const props = mergeProps({ type: 'text' as const }, rawProps);

  const [local, rest] = splitProps(props, [
    'type',
    'leadingIcon',
    'trailingIcon',
    'disabled',
    'maxWidth',
    'class',
  ]);

  return (
    <div
      classList={{
        [classes.wrapper]: true,
        [classes.disabled]: !!local.disabled,
      }}
      style={
        local.maxWidth !== undefined
          ? { 'max-width': toCssValue(local.maxWidth) }
          : undefined
      }
    >
      {local.leadingIcon && (
        <span class={classes.leadingIcon}>{local.leadingIcon}</span>
      )}
      <input
        type={local.type}
        disabled={local.disabled}
        classList={{
          [classes.input]: true,
          [classes.withLeadingIcon]: Boolean(local.leadingIcon),
          [classes.withTrailingIcon]: Boolean(local.trailingIcon),
          ...(local.class ? { [local.class]: true } : {}),
        }}
        {...rest}
      />
      {local.trailingIcon && (
        <span class={classes.trailingIcon}>{local.trailingIcon}</span>
      )}
    </div>
  );
};

export default Input;
