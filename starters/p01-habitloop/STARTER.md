# Starter: P1 HabitLoop (React Native)

The Guided starter for **P1 HabitLoop** (module 2). It is the `habitloop/` folder: an Expo SDK 58 app made with `npx create-expo-app@latest --no-agents-md` and `npm run reset-project`, with the test set-up done and every piece of logic left for you.
It was built and checked on 24 November 2026 with the versions in the kit's `VERSIONS.md`.

## What is included

| Path | What it is |
|---|---|
| `package.json`, `package-lock.json`, `tsconfig.json`, `app.json` | The SDK 58 app, TypeScript strict, routes in `src/app/` (Expo Router) |
| `package.json` `jest` block, `jest.global-setup.js` | Jest 30 with the `jest-expo` preset, React Native Testing Library 14, and tests fixed to the `America/New_York` time zone (task 21 step 1, done for you) |
| `src/app/index.tsx` | **The one screen that is done**: the title, the count line, an empty list and the add button. No data, no logic |
| `src/types.ts` | Placeholder types: **you write `DayKey`, `Habit` and `CheckIn`** in task 8 |
| `src/lib/habits.ts`, `src/lib/dates.ts`, `src/lib/streak.ts` | Typed function signatures that throw `TODO(task NN)` |
| `src/lib/storage.ts`, `src/state/HabitsContext.tsx` | Notes for tasks 20 and 22 |
| `src/components/HabitRow.tsx` | The row's props type and a plain layout |
| `__tests__/*.test.ts` | One `test.todo` placeholder per file. You write every test |

## Copy it in (task 8)

In Git Bash, in task 8's folder:

```bash
cd ~/rn-ess-kit && git pull && cd -
cp -r ~/rn-ess-kit/starters/p01-habitloop habitloop
cd habitloop
npm install
```

Then start at task 8 step 3 (steps 1 and 2, creating the app and adding Jest, are done).

## Run it

```bash
npx tsc --noEmit
npx jest
npx expo start
```

The type check is clean, `npx jest` shows each placeholder as `todo` (not failed), and `npx expo start` opens the screen in Expo Go on your phone (scan the QR code) or in the browser (press `w`).

## The TODOs

`grep -rn "TODO(task" src __tests__` lists them.

| Task | File | What you write |
|---|---|---|
| 8 | `src/types.ts`, `src/lib/habits.ts`, `__tests__/habits.test.ts` | The types, `createHabit`, `isDone`, `toggleCheckIn`, and at least six tests |
| 9 | `src/lib/dates.ts`, `src/components/HabitRow.tsx`, `src/app/index.tsx`, `__tests__/dates.test.ts` | `toDayKey`, the tickable row and today's list |
| 10 | `src/lib/habits.ts`, `src/app/index.tsx` | The validated form (new file `src/components/HabitForm.tsx`) and renaming |
| 11 | `src/lib/habits.ts`, `src/app/index.tsx` | Delete with Undo |
| 20 | `src/lib/storage.ts`, `src/app/index.tsx` | AsyncStorage, loading at start, and `__tests__/storage.test.ts` |
| 21 | `src/lib/dates.ts`, `src/lib/streak.ts`, `src/components/HabitRow.tsx`, `__tests__/streak.test.ts` | `previousDay`, `currentStreak`, `bestStreak` and the kit's tricky dates |
| 22 | `src/state/HabitsContext.tsx` | Shared state, the tabs and the stats screen |
| 23 | none here | Component tests (new files in `__tests__/`) and the helper `src/test/helpers.tsx` (outside `__tests__/`, because Jest runs every file there as a test) |
| 24 | none | The wrap-up is writing and a demo: no starter code |

## What you still write yourself

All the logic: the types, the habit functions, the list, the form, delete and Undo, storage, dates and streaks, the shared state, the tabs and every test.
Also your product's `README.md` in the wrap-up (this `STARTER.md` is not it). Add packages with `npx expo install <name>`. Commit `package-lock.json`; never `node_modules/`.
