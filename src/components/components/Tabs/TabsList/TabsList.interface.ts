import type { JSX } from 'solid-js';

export type TabsListProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  | 'children'
  | 'onClickCapture'
  | 'onPointerDown'
  | 'onPointerMove'
  | 'onPointerUp'
  | 'onPointerCancel'
  | 'onPointerLeave'
> & {
  wrap?: boolean;
  maxWidth?: string | number;
  children?: JSX.Element;
  onClickCapture?: (event: MouseEvent) => void;
  onPointerDown?: (event: PointerEvent) => void;
  onPointerMove?: (event: PointerEvent) => void;
  onPointerUp?: (event: PointerEvent) => void;
  onPointerCancel?: (event: PointerEvent) => void;
  onPointerLeave?: (event: PointerEvent) => void;
};
