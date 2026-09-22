import {
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  Show,
  splitProps,
} from 'solid-js';

import type {
  SelectOptionData,
  SelectProps,
} from '~/components/components/Select/Select.interface';
import SelectMenu from '~/components/components/Select/SelectMenu/SelectMenu';
import SelectTrigger from '~/components/components/Select/SelectTrigger/SelectTrigger';
import { useOnClickOutside } from '~/hooks/useOnClickOutside';
import { t } from '~/lib/i18n';
import { toCssValue } from '~/utils/styleUtils';
import classes from './Select.module.scss';

const Select = <T extends SelectOptionData = SelectOptionData>(
  rawProps: SelectProps<T>,
) => {
  const [local, rest] = splitProps(rawProps, [
    'options',
    'renderOption',
    'value',
    'defaultValue',
    'onChange',
    'multiple',
    'label',
    'placeholder',
    'resetLabel',
    'leadingIcon',
    'disabled',
    'maxWidth',
    'class',
    'id',
  ]);

  const placeholder = () => local.placeholder ?? t('select.placeholder');
  const resetLabel = () => local.resetLabel ?? t('select.reset');

  const generatedId = createUniqueId();
  const idBase = () => local.id ?? generatedId;
  const listboxId = () => `${idBase()}-listbox`;

  let wrapperRef: HTMLDivElement | undefined;
  let triggerRef: HTMLButtonElement | undefined;
  let listboxRef: HTMLDivElement | undefined;

  const [open, setOpen] = createSignal(false);
  const [internalValues, setInternalValues] = createSignal<string[]>(
    !local.defaultValue
      ? []
      : Array.isArray(local.defaultValue)
        ? local.defaultValue
        : [local.defaultValue],
  );

  const selectedValues = createMemo(() => {
    if (local.value === undefined) {
      return internalValues();
    }

    if (Array.isArray(local.value)) {
      return local.value;
    }

    return local.value ? [local.value] : [];
  });

  const hasSelection = () => selectedValues().length > 0;

  const selectedOptions = createMemo(() =>
    local.options.filter((option) => selectedValues().includes(option.value)),
  );

  const triggerLabel = () => {
    const options = selectedOptions();

    if (options.length === 0) {
      return placeholder();
    }

    if (options.length === 1) {
      return options[0].label;
    }

    return `${options.length} selected`;
  };

  const closeMenu = (focusTrigger: boolean) => {
    setOpen(false);

    if (focusTrigger) {
      triggerRef?.focus();
    }
  };

  useOnClickOutside(
    () => wrapperRef,
    () => closeMenu(false),
    open,
  );

  createEffect(() => {
    if (!open()) {
      return;
    }

    const target =
      listboxRef?.querySelector<HTMLElement>('[aria-selected="true"]') ??
      listboxRef?.querySelector<HTMLElement>('[role="option"]');

    target?.focus();
  });

  const emitChange = (nextValues: string[]) => {
    if (local.value === undefined) {
      setInternalValues(nextValues);
    }

    local.onChange?.(local.multiple ? nextValues : (nextValues[0] ?? ''));
  };

  const handleSelect = (optionValue: string) => {
    if (local.multiple) {
      const current = selectedValues();
      const nextValues = current.includes(optionValue)
        ? current.filter((val) => val !== optionValue)
        : [...current, optionValue];

      emitChange(nextValues);
      return;
    }

    emitChange([optionValue]);
    closeMenu(true);
  };

  const handleReset = () => {
    emitChange([]);
    closeMenu(true);
  };

  const getOptionElements = () =>
    Array.from(
      listboxRef?.querySelectorAll<HTMLElement>('[role="option"]') ?? [],
    );

  const focusOptionAt = (index: number) => {
    const items = getOptionElements();

    if (items.length === 0) {
      return;
    }

    const nextIndex = ((index % items.length) + items.length) % items.length;
    items[nextIndex]?.focus();
  };

  const handleOptionKeyDown = (
    event: KeyboardEvent & { currentTarget: HTMLDivElement },
    onActivate: () => void,
  ) => {
    const items = getOptionElements();
    const currentIndex = items.indexOf(event.currentTarget);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusOptionAt(currentIndex + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusOptionAt(currentIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusOptionAt(0);
        break;
      case 'End':
        event.preventDefault();
        focusOptionAt(items.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        onActivate();
        break;
      case 'Escape':
        event.preventDefault();
        closeMenu(true);
        break;
      case 'Tab':
        closeMenu(false);
        break;
      default:
        break;
    }
  };

  const handleTriggerKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div
      ref={wrapperRef}
      classList={{
        [classes.wrapper]: true,
        ...(local.class ? { [local.class]: true } : {}),
      }}
      style={
        local.maxWidth !== undefined
          ? { 'max-width': toCssValue(local.maxWidth) }
          : undefined
      }
    >
      <SelectTrigger
        {...rest}
        ref={(el) => {
          triggerRef = el;
        }}
        id={idBase()}
        listboxId={listboxId()}
        label={local.label}
        open={open()}
        disabled={local.disabled}
        triggerLabel={triggerLabel()}
        leadingIcon={local.leadingIcon}
        onToggle={() => (open() ? closeMenu(false) : setOpen(true))}
        onTriggerKeyDown={handleTriggerKeyDown}
      />
      <Show when={open()}>
        <SelectMenu
          ref={(el) => {
            listboxRef = el;
          }}
          id={listboxId()}
          label={local.label}
          multiple={!!local.multiple}
          options={local.options}
          selectedValues={selectedValues()}
          hasSelection={hasSelection()}
          resetLabel={resetLabel()}
          renderOption={local.renderOption}
          onSelectOption={handleSelect}
          onReset={handleReset}
          onOptionKeyDown={handleOptionKeyDown}
        />
      </Show>
    </div>
  );
};

export default Select;
