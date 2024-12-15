export const formatDateForFile = (date: Date): string => {
  return date.toISOString()
    .replace(/\//g, '-')
    .replace(/:/g, '-')
    .slice(0, 19);
};