export type SelectResetOptionProps = {
  label: string;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent & { currentTarget: HTMLDivElement }) => void;
};
