import { splitProps } from 'solid-js';

import { useTabsContext } from '~/components/components/Tabs/hooks/useTabsContext';
import type { TabProps } from '~/components/components/Tabs/Tab/Tab.interface';
import { focusTabAt } from '~/utils/tabsUtils';
import classes from './Tab.module.scss';

const Tab = (rawProps: TabProps) => {
  const [local, rest] = splitProps(rawProps, [
    'value',
    'disabled',
    'uppercase',
    'class',
    'children',
    'onClick',
    'onKeyDown',
  ]);

  const { value: activeValue, setValue, idBase } = useTabsContext();

  const active = () => local.value === activeValue();

  const handleKeyDown = (
    event: KeyboardEvent & { currentTarget: HTMLButtonElement },
  ) => {
    local.onKeyDown?.(event);

    const list = event.currentTarget.closest('[role="tablist"]');

    if (!list) {
      return;
    }

    const tabs = Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
    );
    const currentIndex = tabs.indexOf(event.currentTarget);

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        focusTabAt(list, currentIndex + 1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        focusTabAt(list, currentIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTabAt(list, 0);
        break;
      case 'End':
        event.preventDefault();
        focusTabAt(list, tabs.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        setValue(local.value);
        break;
      default:
        break;
    }
  };

  return (
    <button
      type="button"
      role="tab"
      id={`${idBase}-tab-${local.value}`}
      aria-controls={`${idBase}-panel-${local.value}`}
      aria-selected={active()}
      tabIndex={active() ? 0 : -1}
      disabled={local.disabled}
      onClick={(event) => {
        local.onClick?.(event);
        setValue(local.value);
      }}
      onKeyDown={handleKeyDown}
      classList={{
        [classes.tab]: true,
        [classes.active]: active(),
        [classes.uppercase]: !!local.uppercase,
        ...(local.class ? { [local.class]: true } : {}),
      }}
      {...rest}
    >
      {local.children}
    </button>
  );
};

export default Tab;
