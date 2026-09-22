import { createSignal, createUniqueId, splitProps } from 'solid-js';
import type { TabsProps } from '~/components/components/Tabs/Tabs.interface';
import { TabsContext } from '~/components/components/Tabs/TabsContext';
import classes from './Tabs.module.scss';

const Tabs = (rawProps: TabsProps) => {
  const [local, rest] = splitProps(rawProps, [
    'defaultValue',
    'value',
    'onValueChange',
    'class',
    'children',
  ]);

  const idBase = createUniqueId();
  const [internalValue, setInternalValue] = createSignal(local.defaultValue);

  const activeValue = () => local.value ?? internalValue();

  const setValue = (next: string) => {
    if (local.value === undefined) {
      setInternalValue(next);
    }
    local.onValueChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ value: activeValue, setValue, idBase }}>
      <div
        classList={{
          [classes.tabs]: true,
          ...(local.class ? { [local.class]: true } : {}),
        }}
        {...rest}
      >
        {local.children}
      </div>
    </TabsContext.Provider>
  );
};

export default Tabs;
