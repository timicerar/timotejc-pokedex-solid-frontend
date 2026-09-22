import { mergeProps, Show, splitProps } from 'solid-js';

import { useTabsContext } from '~/components/components/Tabs/hooks/useTabsContext';
import type { TabContentProps } from '~/components/components/Tabs/TabContent/TabContent.interface';
import classes from './TabContent.module.scss';

const TabContent = (rawProps: TabContentProps) => {
  const props = mergeProps({ hideOutline: false }, rawProps);

  const [local, rest] = splitProps(props, [
    'value',
    'hideOutline',
    'class',
    'children',
  ]);

  const { value: activeValue, idBase } = useTabsContext();

  return (
    <Show when={local.value === activeValue()}>
      <div
        role="tabpanel"
        tabIndex={0}
        id={`${idBase}-panel-${local.value}`}
        aria-labelledby={`${idBase}-tab-${local.value}`}
        classList={{
          [classes.tabContent]: true,
          [classes.hideOutline]: local.hideOutline,
          ...(local.class ? { [local.class]: true } : {}),
        }}
        {...rest}
      >
        {local.children}
      </div>
    </Show>
  );
};

export default TabContent;
