# Guided starters

Every project in the course has three levels. Your mentor tells you yours, and may change it as you go.

- **Core**: you start from an empty folder and follow the task brief (`npx create-expo-app@latest ... --no-agents-md` and `npm run reset-project`).
- **Guided**: you start from the starter in this folder. It does the set-up for you: an Expo SDK 58 TypeScript app after `reset-project`, Jest with `jest-expo` and React Native Testing Library, a fixed test time zone, the folder layout, typed function signatures, and one screen's layout. Every piece of logic the tasks ask for is still yours to write. It is marked `TODO(task NN)`, with NN the task's number in that module.
- **Stretch**: Core, plus the module's Stretch goals.

A starter never contains a solution. AxReview grades Guided and Core work against the same Source of Truth.

| Folder | Project | Module | First task | Copy into |
|---|---|---|---|---|
| `p01-habitloop/` | P1 HabitLoop | 2 | task 8 | `habitloop/` |
| `p02-bookshelf/` | P2 BookShelf | 3 | task 7 | `bookshelf/` |
| `p03-shoplist/` | P3 ShopList | 4 | task 7 | `shoplist/` |

There is no starter for the capstone: you plan and build it from your own `PLAN.md` ([`../capstone/README.md`](../capstone/README.md)).

## How to use one

1. Pull the kit first, so you have the latest version: `cd ~/rn-ess-kit && git pull`.
2. Open the folder's `STARTER.md`. It gives the exact copy command, how to run the project, and a table of every TODO with its task number.
3. In Git Bash, `cd` to the task folder the brief names, then run the copy command from `STARTER.md`, for example:
   ```bash
   cp -r ~/rn-ess-kit/starters/p01-habitloop habitloop
   ```
4. Run `npm install` in the copy, then `npx tsc --noEmit` and `npx jest`. The type check is clean and the placeholder tests show as `todo`.
5. Work through the tasks. Each build task copies your project forward into its own folder, as the brief says.

## Good to know

- **Placeholder tests are normal.** Before you write a task's code, its test file holds one `test.todo(...)` placeholder. It is not a failure. Replace it with your own tests in that task.
- **`STARTER.md` is not your README.** You write the product's `README.md` yourself in the project's wrap-up.
- **Versions:** the starters use the versions in the kit's `VERSIONS.md`. Commit the lock file (`package-lock.json`) with your code.
- **Never copy `node_modules/`.** The starters ship without it; `npm install` makes it from `package-lock.json`. Add packages with `npx expo install <name>` so they match SDK 58.
- **Stuck on a TODO?** Read the task's Learn links, ask AxTutor to explain the idea (not to write the code), then ask your mentor.
