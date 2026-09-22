export const focusTabAt = (list: Element, index: number) => {
  const tabs = Array.from(
    list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
  );

  if (tabs.length === 0) {
    return;
  }

  const nextIndex = ((index % tabs.length) + tabs.length) % tabs.length;

  tabs[nextIndex]?.focus();
};
