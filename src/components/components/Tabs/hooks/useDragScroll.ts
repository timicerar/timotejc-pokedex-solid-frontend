const DRAG_THRESHOLD = 3;

type DragState = {
  active: boolean;
  captured: boolean;
  startX: number;
  startScrollLeft: number;
  moved: boolean;
};

type PointerHandlerEvent = PointerEvent & { currentTarget: HTMLDivElement };
type ClickHandlerEvent = MouseEvent & { currentTarget: HTMLDivElement };

// Mouse/pen drag-to-scroll for a horizontally-scrolling element. Touch
// already scrolls natively via overflow-x, so it's left alone here.
export const useDragScroll = (enabled: () => boolean) => {
  const drag: DragState = {
    active: false,
    captured: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  };

  const onPointerDown = (
    event: PointerHandlerEvent,
    handler?: (event: PointerHandlerEvent) => void,
  ) => {
    handler?.(event);

    if (!enabled() || event.pointerType === 'touch') {
      return;
    }

    // Pointer capture is deferred to onPointerMove: capturing here would
    // retarget the click that follows a plain (non-drag) press to this
    // element instead of the button underneath, so the button's onClick
    // would never fire.
    drag.active = true;
    drag.captured = false;
    drag.startX = event.clientX;
    drag.startScrollLeft = event.currentTarget.scrollLeft;
    drag.moved = false;
  };

  const onPointerMove = (
    event: PointerHandlerEvent,
    handler?: (event: PointerHandlerEvent) => void,
  ) => {
    handler?.(event);

    if (!drag.active) {
      return;
    }

    const delta = event.clientX - drag.startX;

    if (!drag.moved && Math.abs(delta) > DRAG_THRESHOLD) {
      drag.moved = true;
      drag.captured = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (drag.moved) {
      event.currentTarget.scrollLeft = drag.startScrollLeft - delta;
    }
  };

  const endDrag = (
    event: PointerHandlerEvent,
    handler?: (event: PointerHandlerEvent) => void,
  ) => {
    handler?.(event);

    if (!drag.active) {
      return;
    }

    drag.active = false;

    if (drag.captured) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onClickCapture = (
    event: ClickHandlerEvent,
    handler?: (event: ClickHandlerEvent) => void,
  ) => {
    if (drag.moved) {
      drag.moved = false;
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    handler?.(event);
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onPointerLeave: endDrag,
    onClickCapture,
  };
};
