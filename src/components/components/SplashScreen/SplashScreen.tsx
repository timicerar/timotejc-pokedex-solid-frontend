import Logo from '~/components/components/Logo/Logo';
import classes from './SplashScreen.module.scss';

const SplashScreen = () => {
  return (
    <div class={classes.splash}>
      <Logo class={classes.logo} />
    </div>
  );
};

export default SplashScreen;
