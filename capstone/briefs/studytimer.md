# Capstone brief: StudyTimer

**Hard rule:** A session's time is right even if the app is closed and reopened.

This brief is a starting point. Your `PLAN.md` (from [`../PLAN-template.md`](../PLAN-template.md)) turns it into your own specification: choose the stories, cut to fit the week, and get your mentor's approval on day 1 ([`../README.md`](../README.md)).

## The app

Students lose track of how long they really studied. StudyTimer runs **focus sessions and breaks** (for example 25 minutes of focus, then 5 of break), keeps a log of finished sessions, and shows the total focus time for today and this week.

**Users:** a student preparing for exams who studies on their phone's timer; optionally a study partner who compares weekly totals (only with Firestore).

## The hard rule

**A session's time is right even if the app is closed and reopened.**

Phones kill apps in the background all the time. A timer that counts seconds in memory loses them when the app is closed. So the app never "counts": it saves the moment a session **started** (and every pause and resume), and works out the time from those moments and the current time, every time the screen is built.

Example: a 25-minute session starts at 10:00:00. The app is swiped away at 10:07 and opened again at 10:20:30. The screen shows 4:30 left, not 18:00 and not 25:00. At 10:25:00 the session is finished and logged as 25 minutes, even if the app was closed at that moment and is only opened at 11:00.

Edge cases to test (at least three):

1. **Closed and reopened mid-session**: time left = length - (now - start - time paused).
2. **Closed through the end**: opened after the session should have ended; it is logged once, with its planned length, not the time until reopening.
3. **Paused, closed, reopened**: a paused session stays paused; paused time never counts.
4. **Midnight**: a session from 23:50 to 00:15 counts in the day it started (write your choice in the plan).
5. **The phone's clock changes** (a time-zone change while travelling): store moments as UTC timestamps, so the elapsed time is still right.

## User stories to start from

Pick, change and add; your plan needs 6 to 10.

- S01 Start a focus session of a chosen length (15, 25 or 50 minutes).
- S02 See the time left, updating each second, and the right time after reopening the app.
- S03 Pause and resume a session.
- S04 A break starts when a focus session ends; skip the break.
- S05 See today's sessions and the total focus time.
- S06 See this week's total by day.
- S07 Cancel a session (not logged).
- S08 Nice: a local notification when a session ends, even if the app is in the background (`expo-notifications`, as in ShopList).
- S09 Nice: change the default lengths in settings.

## Screens

1. **Timer** (main): the time left, the session type, start/pause/resume/cancel.
2. **Today**: the finished sessions and the total.
3. **Week**: total focus minutes per day.
4. Nice: **Settings**: default lengths.

## A suggested data model

Write it as TypeScript types:

- `Session`: `id`, `kind` (focus or break), `plannedMinutes`, `startedAt` (a UTC timestamp), `pausedAt` (or none), `pausedMs` (total paused so far), `endedAt` (or none), `status` (running, paused, done, cancelled).
- Today's and the week's totals are **worked out** from the sessions, never stored as running counters.

## How to test the hard rule

- Pass `now` (a number of milliseconds, or a `Date`) into your logic instead of calling `Date.now()` inside it.
- Test: start a session at 10:00:00; "close" the app (throw away the in-memory state); load the saved session; at "now" = 10:20:30 expect 4:30 left.
- Test each edge case above with a fixed "now"; then a generated test: for many random start times, pauses and reopen times (made to repeat on every run: a formula of the loop number, or a seeded random function such as mulberry32 with the seed, 42, written in the test), the time left plus the time elapsed minus paused time always equals the planned length.
- Break it on purpose: count down with a timer that subtracts one second per tick and does not use the saved start. The reopen test fails. Put the fix back.

## Out of scope

Server push, accounts (unless you choose Firestore for the study-partner story), sound files, widgets on the home screen, iOS.
