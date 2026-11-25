// HabitLoop's data types.
//
// TODO(task 8): write the three types, with a comment on each field:
// - DayKey: a calendar day as a "YYYY-MM-DD" string, such as "2026-11-21".
// - Habit: id, name, createdAt (an ISO 8601 moment from toISOString()).
// - CheckIn: habitId, day (a DayKey), at (the ISO moment of the tick).
// The placeholders below only let the starter compile: replace them.

export type DayKey = string;

export type Habit = Record<string, unknown>;

export type CheckIn = Record<string, unknown>;
