export const getStaleGcTime = (minutes: number): number => {
  if (!minutes || minutes < 0 || typeof minutes !== 'number') {
    // Default to 5 minutes if no value is provided
    return 5 * (60 * 1000);
  }

  return minutes * (60 * 1000);
};
