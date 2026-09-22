import { splitProps } from 'solid-js';

import type { LogoProps } from '~/components/components/Logo/Logo.interface';
import classes from './Logo.module.scss';

const alt = 'Pokédex';

const Logo = (props: LogoProps) => {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <span
      classList={{
        [classes.logo]: true,
        ...(local.class ? { [local.class]: true } : {}),
      }}
      {...rest}
    >
      <img
        src="/images/pokedex-logo-light.svg"
        alt={alt}
        class={`${classes.image} ${classes['image--light']}`}
      />
      <img
        src="/images/pokedex-logo-dark.svg"
        alt={alt}
        class={`${classes.image} ${classes['image--dark']}`}
      />
    </span>
  );
};

export default Logo;
