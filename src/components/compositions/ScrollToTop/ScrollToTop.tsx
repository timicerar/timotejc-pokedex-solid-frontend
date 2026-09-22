import { FaSolidArrowUp } from 'solid-icons/fa';
import { createSignal, onCleanup, onMount } from 'solid-js';

import Button from '~/components/components/Button/Button';
import { ButtonVariants } from '~/constants/button';
import { ElementIds } from '~/constants/element-ids';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import { t } from '~/lib/i18n';
import classes from './ScrollToTop.module.scss';

const SCROLL_THRESHOLD = 400;

const ScrollToTop = () => {
  const isMobile = useMediaQuery('xs');
  const [isVisible, setIsVisible] = createSignal(false);

  onMount(() => {
    const scrollElement = document.getElementById(ElementIds.MAIN_CONTENT);

    if (!scrollElement) {
      return;
    }

    const handleScroll = () => {
      setIsVisible(scrollElement.scrollTop > SCROLL_THRESHOLD);
    };

    scrollElement.addEventListener('scroll', handleScroll);

    onCleanup(() => scrollElement.removeEventListener('scroll', handleScroll));
  });

  const handleClick = () => {
    document
      .getElementById(ElementIds.MAIN_CONTENT)
      ?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      type="button"
      variant={ButtonVariants.DESTRUCTIVE}
      ariaLabel={t('shared.scrollToTop')}
      leadingIcon={<FaSolidArrowUp aria-hidden="true" />}
      classList={{
        [classes.scrollToTop]: true,
        [classes.visible]: isVisible(),
      }}
      onClick={handleClick}
    >
      {!isMobile() && t('shared.scrollToTop')}
    </Button>
  );
};

export default ScrollToTop;
