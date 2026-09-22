import { FaSolidXmark } from 'solid-icons/fa';

import type { SelectResetOptionProps } from '~/components/components/Select/SelectOption/SelectResetOption.interface';
import Typography from '~/components/components/Typography/Typography';
import classes from './SelectOption.module.scss';

const SelectResetOption = (props: SelectResetOptionProps) => {
  return (
    <div
      role="option"
      aria-selected={false}
      tabIndex={-1}
      onClick={props.onSelect}
      onKeyDown={props.onKeyDown}
      classList={{ [classes.option]: true, [classes.reset]: true }}
    >
      <FaSolidXmark class={classes.optionIcon} />
      <Typography as="span" type="body-sm">
        {props.label}
      </Typography>
    </div>
  );
};

export default SelectResetOption;
