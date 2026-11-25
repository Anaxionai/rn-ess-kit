# Capstone brief: PlantCare

**Hard rule:** No plant is shown as watered on a day it was not.

This brief is a starting point. Your `PLAN.md` (from [`../PLAN-template.md`](../PLAN-template.md)) turns it into your own specification: choose the stories, cut to fit the week, and get your mentor's approval on day 1 ([`../README.md`](../README.md)).

## The app

House plants die from too much or too little water. PlantCare keeps your plants, **how often each needs water**, and **when you last watered it**, shows which plants need water today, and reminds you.

**Users:** someone with 3 to 20 plants at home; optionally a flatmate who shares the plants (Firestore with sign-in).

## The hard rule

**No plant is shown as watered on a day it was not.**

"Watered today" is a fact about a **calendar day** on the phone's clock. The same traps as HabitLoop's streaks apply: midnight, time zones, a flag saved yesterday, and a tick that is undone. So the app saves each watering as an event with its local date, and works out "watered today" and "needs water" from those events and today's date, every time.

Example: Fern needs water every 3 days. It was watered on 20 November at 21:00. On 21 and 22 November it shows "watered 1 day ago", "watered 2 days ago"; on 23 November it shows "needs water today". It never shows "watered today" on 21 November, even if the app was left open from 20 November at 23:59.

Edge cases to test (at least three):

1. **Midnight**: watered at 23:58; at 00:02 the next day it is **not** "watered today".
2. **The app left open overnight, or closed and reopened**: "today" is worked out again, never kept from start-up.
3. **Undo**: a watering ticked by mistake and undone is removed; the plant is not watered that day.
4. **Back-dating**: "I watered it yesterday" records yesterday's date, never today's.
5. **A time-zone change**: a watering counts on the date the phone showed when it was ticked.

## User stories to start from

Pick, change and add; your plan needs 6 to 10.

- S01 Add a plant with a name and how often it needs water (every N days).
- S02 See today's list: plants that need water today or are overdue, first.
- S03 Mark a plant as watered today (and undo it).
- S04 Mark a plant as watered on an earlier day.
- S05 See a plant's watering history.
- S06 Edit or delete a plant.
- S07 Nice: a local notification at a chosen time when plants need water (`expo-notifications`, as in ShopList; scheduled on the phone, no server push).
- S08 Nice: share the plants with a flatmate (Firestore).

## Screens

1. **Today** (main): plants needing water, then the rest, each with "watered N days ago".
2. **Plant**: details and history; water, undo, back-date.
3. **Add or edit plant**: the form, with validation.
4. Nice: **Settings**: the reminder time.

## A suggested data model

Write it as TypeScript types:

- `Plant`: `id`, `name`, `everyDays` (a whole number, 1 or more), `createdOn` (a date).
- `Watering`: `plantId`, `date` (the local date, `YYYY-MM-DD`), `at` (the moment, for the history).
- `wateredToday(plant, waterings, today)` and `needsWater(plant, waterings, today)`: **worked out**, never stored as flags.

## How to test the hard rule

- Pass `now` (a number of milliseconds, or a `Date`) into your logic instead of calling `Date.now()` inside it; build "today" from the local year, month and day.
- Test the example above day by day with a fixed "today", each edge case, and a generated test: for many random watering histories (made to repeat on every run: a formula of the loop number, or a seeded random function such as mulberry32 with the seed, 42, written in the test) and random "today" dates, `wateredToday` is true **only** when a watering with today's date exists.
- Restart: save the waterings, throw away the app's memory, load them on the next day, and expect "not watered today".
- Break it on purpose: save a `wateredToday: true` flag and show it after a restart on the next day. The restart test fails. Put the fix back.

## Out of scope

Plant photos (no uploads on Spark), plant identification, weather data, server push, iOS.
