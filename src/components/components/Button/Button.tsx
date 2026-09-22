import { mergeProps, splitProps } from 'solid-js';

import type { ButtonProps } from '~/components/components/Button/Button.interface';
import { ButtonSizes, ButtonVariants } from '~/constants/button';
import classes from './Button.module.scss';

const Button = (rawProps: ButtonProps) => {
  const props = mergeProps(
    {
      type: 'button' as const,
      variant: ButtonVariants.PRIMARY,
      size: ButtonSizes.DEFAULT,
    },
    rawProps,
  );

  const [local, rest] = splitProps(props, [
    'type',
    'variant',
    'size',
    'ariaLabel',
    'disabled',
    'leadingIcon',
    'trailingIcon',
    'fullWidth',
    'class',
    'classList',
    'children',
  ]);

  return (
    <button
      type={local.type}
      aria-label={local.ariaLabel}
      disabled={local.disabled}
      classList={{
        [classes.button]: true,
        [classes[local.variant]]: true,
        [classes[local.size]]: true,
        [classes.fullWidth]: !!local.fullWidth,
        ...(local.class ? { [local.class]: true } : {}),
        ...local.classList,
      }}
      {...rest}
    >
      {local.leadingIcon}
      {local.children}
      {local.trailingIcon}
    </button>
  );
};

export default Button;
