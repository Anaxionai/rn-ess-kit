# The capstone: your own app in two weeks

In weeks 8 and 9 you build one app of your own, from a one-page plan to a release on your testers' phones, and defend it at the final gate (G3).
You pick one of the three briefs in [`briefs/`](briefs/), or pitch your own app. Either way, **your `PLAN.md` becomes the specification**: AxReview grades every capstone task against your own plan, and the plan differs for every student.

## The two weeks

| When | Module | What happens |
|---|---|---|
| Week 8, day 1 | CP1 | Read this page and the three briefs. Choose one, or pitch your own. Write `capstone/PLAN.md` from [`PLAN-template.md`](PLAN-template.md). **Your mentor approves it the same day.** |
| Week 8, days 2 to 5 | CP1 | Build the core: the data model and main screen, the second screen and navigation, saving the data and testing the hard rule, then component tests for the main flow |
| Week 8, last day | CP1 | Milestone review: show your mentor the working core on your phone |
| Week 9 | CP2 | Polish (accessibility, empty states, error messages), a release to internal testing ([`../release/README.md`](../release/README.md)), the store listing and privacy note ([`store-listing-template.md`](store-listing-template.md)), feedback from three testers, the demo video and talk |
| Week 9, end | CP2, G3 | Demo Day (three minutes, on a phone) and the capstone defence gate |

## What your mentor approves on day 1

Your mentor reads `## Product` and `## Hard rule` with you and checks four things:

1. **The product** fits in two sentences and names real users and what they need.
2. **The hard rule** is one sentence that a test can check, with an example in real values and at least three edge cases.
3. **The scope** fits the week: about 11 build hours for the Must stories. If not, you cut Must stories before you start, not on the last day.
4. **The storage choice** is one the course taught: on the device (AsyncStorage, as in HabitLoop) or Firestore on the free Spark plan, as in ShopList. Choose Firestore only if two people must share data: it adds sign-in and security rules.

Then you write `Approved by <name> on <date>` under `## Product`. A brief or pitch can change on day 1; after that, change the plan only with your mentor, and say why in `PROGRESS.md`.

### Pitching your own app

Welcome, if it keeps these limits:

- one hard rule like the briefs' rules: something that must **always** be true and that a test can break on purpose;
- a core of at most the number of Must stories your task brief gives;
- Android phone and the browser only (no iOS), and the free Spark plan only: **no file or photo uploads, no Cloud Functions, no server push, no phone-number sign-in, no paid API**;
- no personal data beyond a name and an email, and nothing about health records, money accounts or children;
- only ideas the course taught, or one small new package your mentor agrees to.

If in doubt, take a brief: the briefs are sized for the week.

## The files in `capstone/`

`capstone/` is the Expo project. It also holds your plan and your notes, and every task copies the whole folder forward (never `node_modules/` or `build/`).

| File | Written in | What it holds |
|---|---|---|
| `PLAN.md` | CP1, day 1 | The specification, from [`PLAN-template.md`](PLAN-template.md) |
| `PROGRESS.md` | every task | A `## Task NN` section per task: the plan items (story IDs) it delivers, what works, and anything moved or cut |
| `AI_LOG.md` | when you use chat AI | What you asked, what it said, what you kept, changed and found wrong |
| `REVIEW.md` | milestone review | Your mentor's notes and what you changed |
| `STORE-LISTING.md` | CP2 | From [`store-listing-template.md`](store-listing-template.md) |
| `evidence.md` | every task (in the task folder) | `npx jest` and `npx tsc --noEmit` output, release details, pasted as text |

## Testing the flow with `renderRouter` (CP1 task 8)

Two things surprise everyone the first time. Both were checked on 24 November 2026 with Expo SDK 58, `expo-router` 58 and React Native Testing Library 14.

- **A button inside `<Link asChild>` is a link.** `Link` gives its child the role `link`, so find it with `screen.getByRole("link", { name: "Add expense" })`, not `"button"`.
- **`tsc` says `toBeOnTheScreen` does not exist** as soon as a test imports `expo-router/testing-library`. The tests still run in Jest; only the type check fails. `expo-router` adds its own matchers to `expect`, which hides Testing Library's. Add this file as `capstone/src/test-matchers.d.ts`:

```ts
// expo-router/testing-library adds its own matchers to `expect`, and that hides
// Testing Library's matchers (toBeOnTheScreen) from tsc. This puts them back.
import type { JestNativeMatchers } from "@testing-library/react-native/dist/matchers/types";
declare module "expect" {
  interface Matchers<R extends void | Promise<void>, T = unknown> extends JestNativeMatchers<R> {}
}
```

## The hard rule is the heart of the grade

Each brief has one hard rule. You prove it three ways:

1. **Tests** in `__tests__/hard-rule.test.ts`: the plan's example, each edge case, many generated cases, and a restart (save, throw away the app's memory, load, check again).
2. **One failing run**: break the rule on purpose, show the test fails, put it back. Paste both outputs into `evidence.md`.
3. **At the gate**: your mentor asks you to show what happens at the edge.

Two habits make the hard rule testable in Expo:

- **Inject the clock**: pass `now` (a number of milliseconds, or a `Date`) into your logic instead of calling `Date.now()` inside it. A test then sets "now" to any moment, such as 23:59 or tomorrow.
- **Keep the rule in plain TypeScript**, away from the screens, so a unit test can call it directly.

## AI in the capstone

Free chat AI may help you, and every use is logged in `AI_LOG.md`. **No coding agent** (a tool that edits your files by itself) in this course.
Your plan's wording, the Explain-it answers and the gate answers are your own, without AI.

## The three briefs

| Brief | The app | Its hard rule |
|---|---|---|
| [StudyTimer](briefs/studytimer.md) | Focus sessions and breaks for students | A session's time is right even if the app is closed and reopened |
| [ExpenseSplit](briefs/expensesplit.md) | Shared trip expenses for a group of friends | Balances always sum to zero |
| [PlantCare](briefs/plantcare.md) | Watering reminders for house plants | No plant is shown as watered on a day it was not |
