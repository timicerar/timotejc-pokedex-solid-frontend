import type { JSX } from 'solid-js';

export type SelectOptionData = {
  value: string;
  label: string;
  leadingIcon?: JSX.Element;
};

export type RenderSelectOption<T extends SelectOptionData> = (
  option: T,
  state: { selected: boolean },
) => JSX.Element;

export type SelectProps<T extends SelectOptionData = SelectOptionData> = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  'value' | 'defaultValue' | 'onChange' | 'children'
> & {
  options: T[];
  renderOption?: RenderSelectOption<T>;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  label: string;
  placeholder?: string;
  resetLabel?: string;
  leadingIcon?: JSX.Element;
  maxWidth?: string | number;
};
