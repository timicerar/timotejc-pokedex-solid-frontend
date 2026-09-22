import { createSignal, onCleanup, onMount } from 'solid-js';

const TOUCH_DEVICE_QUERY = '(pointer: coarse)';

const getIsTouchDevice = () => window.matchMedia(TOUCH_DEVICE_QUERY).matches;

export const useIsTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = createSignal(getIsTouchDevice());

  onMount(() => {
    const mediaQueryList = window.matchMedia(TOUCH_DEVICE_QUERY);

    setIsTouchDevice(mediaQueryList.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsTouchDevice(event.matches);
    };

    mediaQueryList.addEventListener('change', handleChange);

    onCleanup(() => mediaQueryList.removeEventListener('change', handleChange));
  });

  return isTouchDevice;
};
