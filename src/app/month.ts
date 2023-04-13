/**
 * Month represented as an array of two strings: year and month.
 *
 * @example
 * ```
 * ["2023", "01"]
 * ```
 * */
export type Month = [string?, string?];

export function isMonth(month: unknown): month is Month {
  return (
    Array.isArray(month) &&
    month.length === 2 &&
    month.every((m) => typeof m === 'string')
  );
}

export function compareMonths(month1: Month, month2: Month): boolean {
  return month1[0] === month2[0] && month1[1] === month2[1];
}
