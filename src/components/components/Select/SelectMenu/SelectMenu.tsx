import { For, Show } from 'solid-js';

import Divider from '~/components/components/Divider/Divider';
import type { SelectOptionData } from '~/components/components/Select/Select.interface';
import type { SelectMenuProps } from '~/components/components/Select/SelectMenu/SelectMenu.interface';
import SelectOption from '~/components/components/Select/SelectOption/SelectOption';
import SelectResetOption from '~/components/components/Select/SelectOption/SelectResetOption';
import classes from './SelectMenu.module.scss';

const SelectMenu = <T extends SelectOptionData = SelectOptionData>(
  props: SelectMenuProps<T>,
) => {
  return (
    <div class={classes.menu}>
      <div
        ref={props.ref}
        role="listbox"
        id={props.id}
        aria-multiselectable={props.multiple || undefined}
        aria-label={props.label}
        class={classes.list}
      >
        <Show when={props.hasSelection}>
          <SelectResetOption
            label={props.resetLabel}
            onSelect={props.onReset}
            onKeyDown={(event) => props.onOptionKeyDown(event, props.onReset)}
          />
          <Divider />
        </Show>

        <For each={props.options}>
          {(option) => {
            const selected = () => props.selectedValues.includes(option.value);

            return (
              <SelectOption
                option={option}
                selected={selected()}
                renderOption={props.renderOption}
                onSelect={() => props.onSelectOption(option.value)}
                onKeyDown={(event) =>
                  props.onOptionKeyDown(event, () =>
                    props.onSelectOption(option.value),
                  )
                }
              />
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default SelectMenu;
