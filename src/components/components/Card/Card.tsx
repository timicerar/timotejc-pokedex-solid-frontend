import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import type { CardProps } from '~/components/components/Card/Card.interface';
import { CardPaddings } from '~/constants/card';
import classes from './Card.module.scss';

const Card = (rawProps: CardProps) => {
  const props = mergeProps({ padding: CardPaddings.DEFAULT }, rawProps);

  const [local, rest] = splitProps(props, [
    'ref',
    'padding',
    'fullWidth',
    'noShadow',
    'active',
    'onClick',
    'class',
    'classList',
    'children',
  ]);

  const interactive = () => Boolean(local.onClick);

  return (
    <Dynamic
      component={interactive() ? 'button' : 'div'}
      ref={local.ref}
      type={interactive() ? 'button' : undefined}
      onClick={local.onClick}
      classList={{
        [classes.card]: true,
        ...(classes[local.padding] ? { [classes[local.padding]]: true } : {}),
        [classes.interactive]: interactive(),
        [classes.fullWidth]: !!local.fullWidth,
        [classes.noShadow]: !!local.noShadow,
        [classes.active]: !!local.active,
        ...(local.class ? { [local.class]: true } : {}),
        ...local.classList,
      }}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export default Card;
