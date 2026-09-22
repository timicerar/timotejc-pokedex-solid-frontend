import { FaRegularMoon, FaRegularSun } from 'solid-icons/fa';
import { mergeProps } from 'solid-js';
import Button from '~/components/components/Button/Button';
import type { ThemeToggleProps } from '~/components/components/ThemeToggle/ThemeToggle.interface';
import { ButtonSizes, ButtonVariants } from '~/constants/button';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import { t } from '~/lib/i18n';
import useTheme from '~/theme/hooks/useTheme';
import { Themes } from '~/theme/Theme.interface';
import classes from './ThemeToggle.module.scss';

const ThemeToggle = (rawProps: ThemeToggleProps) => {
  const props = mergeProps({ showLabel: false }, rawProps);

  const { theme, toggleTheme } = useTheme();
  const isMobile = useMediaQuery('sm');

  const modeLabel = () =>
    t(theme() === Themes.LIGHT ? 'theme.light' : 'theme.dark');

  return (
    <Button
      variant={isMobile() ? ButtonVariants.ROUNDED : ButtonVariants.SECONDARY}
      size={isMobile() ? ButtonSizes.SM : ButtonSizes.DEFAULT}
      ariaLabel={t('theme.toggle')}
      onClick={toggleTheme}
      leadingIcon={
        <>
          <FaRegularSun
            classList={{ [classes.icon]: true, [classes['icon--light']]: true }}
          />
          <FaRegularMoon
            classList={{ [classes.icon]: true, [classes['icon--dark']]: true }}
          />
        </>
      }
    >
      {props.showLabel && !isMobile() && modeLabel()}
    </Button>
  );
};

export default ThemeToggle;
