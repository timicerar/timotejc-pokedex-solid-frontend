import { Show } from 'solid-js';

import Button from '~/components/components/Button/Button';
import Modal from '~/components/components/Modal/Modal';
import ModalHeader from '~/components/components/Modal/ModalHeader/ModalHeader';
import Typography from '~/components/components/Typography/Typography';
import { ButtonVariants } from '~/constants/button';
import { ModalTypes } from '~/constants/modal-provider';
import { t } from '~/lib/i18n';
import { closeModal, useModalData } from '~/store/modals';
import classes from './ConfirmationModal.module.scss';

const ConfirmationModal = () => {
  return (
    <Modal type={ModalTypes.CONFIRMATION} closeOnBackdropClick={false}>
      <ConfirmationModalContent />
    </Modal>
  );
};

/**
 * Kept separate from ConfirmationModal so the dialog shell doesn't
 * re-render when this content does, and so its data is only read once the
 * modal is actually open.
 */
const ConfirmationModalContent = () => {
  const modalData = useModalData(ModalTypes.CONFIRMATION);
  const confirmation = () => modalData()?.data;

  const handleCancel = () => {
    closeModal(ModalTypes.CONFIRMATION);
    confirmation()?.onCancel?.();
  };

  const handleConfirm = () => {
    closeModal(ModalTypes.CONFIRMATION);
    confirmation()?.onConfirm();
  };

  return (
    <Show when={confirmation()}>
      {(data) => (
        <>
          <ModalHeader
            title={data().title ?? t('modal.confirmationModal.title')}
            onClose={handleCancel}
            hideClose
          />
          <div class={classes.container}>
            <Typography as="p" color="muted-foreground">
              {data().description ?? t('modal.confirmationModal.description')}
            </Typography>
            <div class={classes.actions}>
              <Button
                variant={ButtonVariants.SECONDARY}
                onClick={handleCancel}
                class={classes.button}
              >
                {data().cancelLabel ?? t('modal.confirmationModal.cancel')}
              </Button>
              <Button
                variant={ButtonVariants.PRIMARY}
                onClick={handleConfirm}
                class={classes.button}
              >
                {data().confirmLabel ?? t('modal.confirmationModal.confirm')}
              </Button>
            </div>
          </div>
        </>
      )}
    </Show>
  );
};

export default ConfirmationModal;
