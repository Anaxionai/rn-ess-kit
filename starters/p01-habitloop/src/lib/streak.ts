// Streaks on day keys. Read the kit's data/habits/README.md first: it has
// the rule and the tricky cases your tests must pass.
import type { CheckIn, DayKey } from "../types";

/**
 * Days in a row back from today if today is ticked, else from yesterday;
 * otherwise 0. Never divide milliseconds by 24 hours.
 * TODO(task 21): write it, stepping back with previousDay.
 */
export function currentStreak(checkIns: CheckIn[], habitId: string, today: DayKey): number {
  throw new Error("TODO(task 21): currentStreak");
}

/**
 * The longest run of days in a row. Two ticks on one day count once.
 * TODO(task 21): write it.
 */
export function bestStreak(checkIns: CheckIn[], habitId: string): number {
  throw new Error("TODO(task 21): bestStreak");
}
