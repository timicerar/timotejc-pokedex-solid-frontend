import { type JSX, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import type { TypographyProps } from '~/components/components/Typography/Typography.interface';
import { Colors } from '~/constants/colors';
import { TypographyElements, TypographyTypes } from '~/constants/typography';
import classes from './Typography.module.scss';

const Typography = (rawProps: TypographyProps) => {
  const props = mergeProps(
    { as: TypographyElements.P, type: TypographyTypes.BODY },
    rawProps,
  );

  const [local, rest] = splitProps(props, [
    'as',
    'type',
    'color',
    'align',
    'italic',
    'uppercase',
    'class',
    'style',
    'children',
  ]);

  const style = (): JSX.CSSProperties => ({
    ...(local.color && { color: Colors[local.color] }),
    ...(local.align && { 'text-align': local.align }),
    ...(local.italic && { 'font-style': 'italic' }),
    ...local.style,
  });

  return (
    <Dynamic
      component={local.as}
      classList={{
        [classes.container]: true,
        [classes[local.type]]: true,
        [classes.uppercase]: !!local.uppercase,
        ...(local.class ? { [local.class]: true } : {}),
      }}
      style={style()}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export default Typography;
