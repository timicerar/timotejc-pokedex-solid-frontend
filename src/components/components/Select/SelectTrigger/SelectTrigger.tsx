import { FaSolidChevronDown } from 'solid-icons/fa';
import { splitProps } from 'solid-js';

import type { SelectTriggerProps } from '~/components/components/Select/SelectTrigger/SelectTrigger.interface';
import Typography from '~/components/components/Typography/Typography';
import classes from './SelectTrigger.module.scss';

const SelectTrigger = (rawProps: SelectTriggerProps) => {
  const [local, rest] = splitProps(rawProps, [
    'ref',
    'id',
    'listboxId',
    'label',
    'open',
    'triggerLabel',
    'leadingIcon',
    'disabled',
    'onToggle',
    'onTriggerKeyDown',
    'class',
  ]);

  return (
    <button
      {...rest}
      ref={local.ref}
      type="button"
      id={local.id}
      aria-haspopup="listbox"
      aria-expanded={local.open}
      aria-controls={local.listboxId}
      aria-label={local.label}
      disabled={local.disabled}
      onClick={local.onToggle}
      onKeyDown={local.onTriggerKeyDown}
      classList={{
        [classes.trigger]: true,
        [classes.open]: local.open,
        ...(local.class ? { [local.class]: true } : {}),
      }}
    >
      {local.leadingIcon && (
        <span class={classes.leadingIcon}>{local.leadingIcon}</span>
      )}
      <Typography as="span" type="body-sm" class={classes.value}>
        {local.triggerLabel}
      </Typography>
      <FaSolidChevronDown class={classes.chevron} />
    </button>
  );
};

export default SelectTrigger;
