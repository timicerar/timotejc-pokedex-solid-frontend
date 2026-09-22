import { useContext } from 'solid-js';

import { ThemeContext } from '~/theme/ThemeContext';

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
