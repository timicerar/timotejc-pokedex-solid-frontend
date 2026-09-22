import { A, useLocation } from '@solidjs/router';
import { FaSolidArrowLeft } from 'solid-icons/fa';
import { Show } from 'solid-js';

import Logo from '~/components/components/Logo/Logo';
import ThemeToggle from '~/components/components/ThemeToggle/ThemeToggle';
import Typography from '~/components/components/Typography/Typography';
import { Routes } from '~/constants/routes';
import { t } from '~/lib/i18n';
import classes from './NavBar.module.scss';

const NavBar = () => {
  const location = useLocation();
  const isHome = () => location.pathname === Routes.POKEDEX();

  return (
    <header class={classes.navbar}>
      <div class={classes.wrapper}>
        <A href={Routes.POKEDEX()}>
          <Logo class={classes.logo} />
        </A>
        <Show when={!isHome()}>
          <A href={Routes.POKEDEX()} class={classes.backLink}>
            <FaSolidArrowLeft aria-hidden="true" />
            <Typography as="span" type="label" uppercase>
              {t('shared.backToPokedex')}
            </Typography>
          </A>
        </Show>
      </div>
      <div class={classes.actions}>
        <ThemeToggle showLabel />
      </div>
    </header>
  );
};

export default NavBar;
