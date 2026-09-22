import type {
  RenderSelectOption,
  SelectOptionData,
} from '~/components/components/Select/Select.interface';

export type SelectOptionProps<T extends SelectOptionData = SelectOptionData> = {
  option: T;
  selected: boolean;
  renderOption?: RenderSelectOption<T>;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent & { currentTarget: HTMLDivElement }) => void;
};
