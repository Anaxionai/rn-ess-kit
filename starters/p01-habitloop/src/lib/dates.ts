import type { DayKey } from "../types";

/**
 * The calendar day of a moment on the phone's clock, as "YYYY-MM-DD".
 * TODO(task 9): build it from getFullYear(), getMonth() + 1 and getDate(),
 * with padStart(2, "0"). Never use toISOString().slice(0, 10): that is the
 * UTC date, which is yesterday in India before 5:30 am.
 */
export function toDayKey(date: Date): DayKey {
  throw new Error("TODO(task 9): toDayKey");
}

// TODO(task 21): previousDay(day: DayKey): DayKey, using Date.UTC(y, m - 1, d - 1)
// so no hours or time zones are involved.
