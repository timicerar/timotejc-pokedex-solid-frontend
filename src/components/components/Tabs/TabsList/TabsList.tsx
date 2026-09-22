import { mergeProps, onCleanup, onMount, splitProps } from 'solid-js';

import { useDragScroll } from '~/components/components/Tabs/hooks/useDragScroll';
import type { TabsListProps } from '~/components/components/Tabs/TabsList/TabsList.interface';
import { asStyleObject, toCssValue } from '~/utils/styleUtils';
import classes from './TabsList.module.scss';

const TabsList = (rawProps: TabsListProps) => {
  const props = mergeProps({ wrap: true }, rawProps);

  const [local, rest] = splitProps(props, [
    'wrap',
    'maxWidth',
    'class',
    'style',
    'children',
    'onPointerDown',
    'onPointerMove',
    'onPointerUp',
    'onPointerCancel',
    'onPointerLeave',
    'onClickCapture',
  ]);

  const dragScroll = useDragScroll(() => !local.wrap);

  let listRef: HTMLDivElement | undefined;

  // Solid has no React-style `onClickCapture` prop — a real capture-phase
  // listener is needed to swallow the click that follows a drag before it
  // reaches the tab button underneath.
  onMount(() => {
    const handleCaptureClick = (event: MouseEvent) => {
      dragScroll.onClickCapture(
        event as MouseEvent & { currentTarget: HTMLDivElement },
        local.onClickCapture,
      );
    };

    listRef?.addEventListener('click', handleCaptureClick, { capture: true });

    onCleanup(() =>
      listRef?.removeEventListener('click', handleCaptureClick, {
        capture: true,
      }),
    );
  });

  return (
    <div
      ref={listRef}
      role="tablist"
      classList={{
        [classes.tabsList]: true,
        [classes.equalWidth]: local.wrap,
        [classes.scrollable]: !local.wrap,
        ...(local.class ? { [local.class]: true } : {}),
      }}
      style={{
        ...(local.maxWidth !== undefined && {
          'max-width': toCssValue(local.maxWidth),
        }),
        ...asStyleObject(local.style),
      }}
      onPointerDown={(event) =>
        dragScroll.onPointerDown(event, local.onPointerDown)
      }
      onPointerMove={(event) =>
        dragScroll.onPointerMove(event, local.onPointerMove)
      }
      onPointerUp={(event) => dragScroll.onPointerUp(event, local.onPointerUp)}
      onPointerCancel={(event) =>
        dragScroll.onPointerCancel(event, local.onPointerCancel)
      }
      onPointerLeave={(event) =>
        dragScroll.onPointerLeave(event, local.onPointerLeave)
      }
      {...rest}
    >
      {local.children}
    </div>
  );
};

export default TabsList;
