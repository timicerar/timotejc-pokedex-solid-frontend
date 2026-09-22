import { FaSolidCheck } from 'solid-icons/fa';
import { Show } from 'solid-js';

import type { SelectOptionData } from '~/components/components/Select/Select.interface';
import type { SelectOptionProps } from '~/components/components/Select/SelectOption/SelectOption.interface';
import Typography from '~/components/components/Typography/Typography';
import classes from './SelectOption.module.scss';

const SelectOption = <T extends SelectOptionData = SelectOptionData>(
  props: SelectOptionProps<T>,
) => {
  return (
    <div
      role="option"
      aria-selected={props.selected}
      tabIndex={-1}
      onClick={props.onSelect}
      onKeyDown={props.onKeyDown}
      classList={{ [classes.option]: true, [classes.selected]: props.selected }}
    >
      <Show
        when={props.renderOption}
        fallback={
          <>
            <FaSolidCheck
              classList={{
                [classes.check]: true,
                [classes.visible]: props.selected,
              }}
            />
            {props.option.leadingIcon && (
              <span class={classes.optionIcon}>{props.option.leadingIcon}</span>
            )}
            <Typography as="span" type="body-sm">
              {props.option.label}
            </Typography>
          </>
        }
      >
        {(renderOption) =>
          renderOption()(props.option, { selected: props.selected })
        }
      </Show>
    </div>
  );
};

export default SelectOption;
