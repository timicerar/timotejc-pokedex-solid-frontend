import type {
  RenderSelectOption,
  SelectOptionData,
} from '~/components/components/Select/Select.interface';

export type SelectMenuProps<T extends SelectOptionData = SelectOptionData> = {
  ref?: (el: HTMLDivElement) => void;
  id: string;
  label: string;
  multiple: boolean;
  options: T[];
  selectedValues: string[];
  hasSelection: boolean;
  resetLabel: string;
  renderOption?: RenderSelectOption<T>;
  onSelectOption: (value: string) => void;
  onReset: () => void;
  onOptionKeyDown: (
    event: KeyboardEvent & { currentTarget: HTMLDivElement },
    onActivate: () => void,
  ) => void;
};
