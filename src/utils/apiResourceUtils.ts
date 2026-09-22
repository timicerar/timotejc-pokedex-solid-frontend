export const getIdFromResourceUrl = (url?: string | null): string | undefined =>
  url?.match(/\/(\d+)\/?$/)?.[1];

export const getOrigin = (url: string) => {
  try {
    return new URL(url).origin;
  } catch {
    return undefined;
  }
};
