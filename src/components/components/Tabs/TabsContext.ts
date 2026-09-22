import type { Accessor } from 'solid-js';
import { createContext } from 'solid-js';

export type TabsContextType = {
  value: Accessor<string>;
  setValue: (value: string) => void;
  idBase: string;
};

export const TabsContext = createContext<TabsContextType>({
  value: () => '',
  setValue: () => {},
  idBase: '',
});
