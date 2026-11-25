import type { CheckIn, DayKey, Habit } from "../types";

/**
 * Makes a new habit.
 * TODO(task 8): trim the name, build `id` from `now.getTime()` plus a random
 * part, and set `createdAt` to `now.toISOString()`.
 */
export function createHabit(name: string, now: Date): Habit {
  throw new Error("TODO(task 8): createHabit");
}

/**
 * True when the habit has a check-in on that day.
 * TODO(task 8): write it.
 */
export function isDone(checkIns: CheckIn[], habitId: string, day: DayKey): boolean {
  throw new Error("TODO(task 8): isDone");
}

/**
 * Ticks or unticks a habit for a day. Returns a NEW array; never changes
 * the one it was given.
 * TODO(task 8): add a check-in when there is none for that habit and day,
 * remove it when there is one.
 */
export function toggleCheckIn(checkIns: CheckIn[], habitId: string, day: DayKey, now: Date): CheckIn[] {
  throw new Error("TODO(task 8): toggleCheckIn");
}

// TODO(task 10): validateHabitName (empty, over 40 characters, or a duplicate),
// and renaming a habit while keeping its id (so the check-ins stay).
// TODO(task 11): removeHabit and restoreHabit for Undo, at its old index.
