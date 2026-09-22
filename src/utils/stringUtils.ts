export const formatDashedLabel = (value: string): string => {
  const withSpaces = value.replace(/-/g, ' ');

  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};
