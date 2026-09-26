import { useSearchParams } from '@solidjs/router';
import { createMemo } from 'solid-js';

export const usePokemonImageMode = () => {
  const [searchParams] = useSearchParams();

  return createMemo(() => ({
    lowerResImg: searchParams.lowerResImg === 'true',
  }));
};
