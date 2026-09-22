import { createMemo } from 'solid-js';

import { useMediaQuery } from '~/hooks/useMediaQuery';

// Keep in sync with the grid-template-columns breakpoints in PokemonList.module.scss.
const DEFAULT_COLUMN_COUNT = 6;
const LLG_COLUMN_COUNT = 4;
const MD_COLUMN_COUNT = 3;
const SM_COLUMN_COUNT = 2;
const XS_COLUMN_COUNT = 1;

export const ESTIMATE_ROW_SIZE = 272;
export const INITIAL_SKELETON_COUNT = DEFAULT_COLUMN_COUNT * 2;

export const useColumnCount = () => {
  const isXs = useMediaQuery('xs');
  const isSm = useMediaQuery('sm');
  const isMd = useMediaQuery('md');
  const isLlg = useMediaQuery('llg');

  return createMemo(() => {
    if (isXs()) return XS_COLUMN_COUNT;
    if (isSm()) return SM_COLUMN_COUNT;
    if (isMd()) return MD_COLUMN_COUNT;
    if (isLlg()) return LLG_COLUMN_COUNT;
    return DEFAULT_COLUMN_COUNT;
  });
};
