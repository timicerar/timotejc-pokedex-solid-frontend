import { FaSolidXmark } from 'solid-icons/fa';
import { mergeProps, Show, splitProps } from 'solid-js';

import Button from '~/components/components/Button/Button';
import type { ModalHeaderProps } from '~/components/components/Modal/ModalHeader/ModalHeader.interface';
import Typography from '~/components/components/Typography/Typography';
import { ButtonSizes, ButtonVariants } from '~/constants/button';
import { t } from '~/lib/i18n';
import classes from './ModalHeader.module.scss';

const ModalHeader = (rawProps: ModalHeaderProps) => {
  const props = mergeProps({ hideClose: false }, rawProps);

  const [local, rest] = splitProps(props, [
    'title',
    'onClose',
    'closeLabel',
    'hideClose',
    'class',
  ]);

  const closeLabel = () => local.closeLabel ?? t('modal.close');

  return (
    <Show
      when={local.title}
      fallback={
        <Show when={!local.hideClose}>
          <Button
            variant={ButtonVariants.ROUNDED}
            size={ButtonSizes.SM}
            ariaLabel={closeLabel()}
            onClick={local.onClose}
            leadingIcon={<FaSolidXmark />}
            classList={{
              [classes.floating]: true,
              ...(local.class ? { [local.class]: true } : {}),
            }}
            {...rest}
          />
        </Show>
      }
    >
      <div
        classList={{
          [classes.header]: true,
          ...(local.class ? { [local.class]: true } : {}),
        }}
        {...rest}
      >
        <Typography as="h2" type="card-title">
          {local.title}
        </Typography>
        <Show when={!local.hideClose}>
          <Button
            variant={ButtonVariants.ROUNDED}
            size={ButtonSizes.SM}
            ariaLabel={closeLabel()}
            onClick={local.onClose}
            leadingIcon={<FaSolidXmark />}
          />
        </Show>
      </div>
    </Show>
  );
};

export default ModalHeader;
