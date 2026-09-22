import { createSignal, onCleanup, onMount, Show } from 'solid-js';

import type { ModalProps } from '~/components/components/Modal/Modal.interface';
import { useMountTransition } from '~/hooks/useMountTransition';
import { getModalId } from '~/utils/modalProviderUtils';
import classes from './Modal.module.scss';

const Modal = (props: ModalProps) => {
  let dialogRef: HTMLDialogElement | undefined;
  let contentRef: HTMLDivElement | undefined;

  const [isOpen, setIsOpen] = createSignal(false);
  const hasTransitionedIn = useMountTransition(
    isOpen,
    props.transitionDuration ?? 200,
  );
  const shouldRenderContent = () => isOpen() || hasTransitionedIn();

  onMount(() => {
    const handleToggle = (event: ToggleEvent) => {
      setIsOpen(event.newState === 'open');
    };

    dialogRef?.addEventListener('toggle', handleToggle);

    onCleanup(() => dialogRef?.removeEventListener('toggle', handleToggle));
  });

  return (
    <dialog
      id={getModalId(props.type)}
      ref={dialogRef}
      classList={{
        [classes.dialog]: true,
        ...(props.classes?.dialog ? { [props.classes.dialog]: true } : {}),
      }}
      style={{
        '--modal-transition-duration': `${props.transitionDuration ?? 200}ms`,
      }}
      onClick={(event) => {
        if (
          (props.closeOnBackdropClick ?? true) &&
          !contentRef?.contains(event.target as Node)
        ) {
          dialogRef?.close();
        }
      }}
    >
      <Show when={shouldRenderContent()}>
        <div class={classes.frame}>
          <div
            ref={contentRef}
            classList={{
              [classes.content]: true,
              ...(props.classes?.content
                ? { [props.classes.content]: true }
                : {}),
            }}
          >
            {props.children}
          </div>
        </div>
      </Show>
    </dialog>
  );
};

export default Modal;
