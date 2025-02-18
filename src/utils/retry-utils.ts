export const getRetryDelay = (
  initialDelay: number,
  attempt: number,
  maxDelay = 30000,
): number => {
  return Math.min(Math.pow(2, attempt) * initialDelay, maxDelay);
};
