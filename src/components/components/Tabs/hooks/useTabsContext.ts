import { useContext } from 'solid-js';

import { TabsContext } from '~/components/components/Tabs/TabsContext';

export const useTabsContext = () => {
  return useContext(TabsContext);
};
