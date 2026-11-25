# HabitLoop sample data

`sample-habits.json` is for HabitLoop (P1). It is the same file in the Flutter kit and the React Native kit, so both courses test the same tricky dates.
It is made up: use it freely. Copy what you need into your own project; never change the kit's copy.

| Key | What it is | Use it for |
|---|---|---|
| `habits` | Three habits: `h-water` "Drink 8 glasses of water", `h-read` "Read 10 pages", `h-walk` "Walk 20 minutes" | Demo data for the list screen |
| `checkIns` | 33 ticks for those habits from 1 to 14 November 2026, with some days missed | Demo data for the list and the stats screen |
| `cases` | **The six named cases** for your streak tests | One test per case |
| `extraCases` | Two more cases: clocks going forward (New York, 8 March 2026) and a restart after midnight | Extra tests; the React Native course tests the 23-hour day |

## The demo data on 14 November 2026

The right numbers for `habits` and `checkIns` when today is **14 November 2026** (for example `now` = 14 Nov 2026, 9:00 pm). Use them to test a stats screen. "Last 7 days" counts done days from 8 to 14 November.

| Habit | Current streak | Best streak | Last 7 days | Done days in total |
|---|---|---|---|---|
| `h-water` Drink 8 glasses of water | 8 | 8 | 7 | 13 |
| `h-read` Read 10 pages | 2 | 2 | 5 | 10 |
| `h-walk` Walk 20 minutes | 6 | 6 | 6 | 10 |

## The shapes

```json
{ "id": "h-read", "name": "Read 10 pages", "createdAt": "2026-11-01T07:31:00+05:30" }
{ "habitId": "h-read", "day": "2026-11-20", "at": "2026-11-20T23:59:00+05:30", "timeZone": "Asia/Kolkata" }
```

| Field | Meaning |
|---|---|
| `Habit.id`, `Habit.name` | The habit's id and name |
| `Habit.createdAt` | When it was made: an ISO 8601 moment |
| `CheckIn.habitId` | Which habit was ticked |
| `CheckIn.day` | The **local calendar day** of the tick, `YYYY-MM-DD`: the day the tick counts for. Always the date part of `at` |
| `CheckIn.at` | The moment of the tick as the phone's clock showed it, with the phone's offset from UTC |
| `CheckIn.timeZone` | Where the phone was (an IANA name). Extra information for you; your app does not need to store it |

These are the React Native course's `Habit` and `CheckIn` types. In the Flutter course, `createdAt` becomes your `createdOn` (`DateTime.parse(createdAt)`), and `day` becomes your date-only `day` (`DateTime.utc(year, month, day)` from the `YYYY-MM-DD` text).

Work out the day **once**, when the user ticks, from the phone's local year, month and day, and save it. Never work it out again later from a UTC time: the `midnight` and `time-zone-change` cases show why.

## The rule every answer follows

1. A day is **done** if it has at least one check-in. Two ticks on one day count once.
2. **Today** is the local date of `now`, the case's stated moment.
3. `doneToday` is true when today is done.
4. `currentStreak` counts done days in a row, going back **from today if today is done, otherwise from yesterday**; if neither is done, it is 0. So a streak stays alive until the end of the day after its last tick.
5. `bestStreak` (your longest streak; `longestStreak` in the Flutter course) is the longest run of done days in a row anywhere in the history.
6. Days are calendar days, not blocks of 24 hours. Step from one day to the one before with a date function, never by subtracting 24 hours or taking 1 from the day number.

## The six cases

Ticks are the phone's local clock. IST is India (`Asia/Kolkata`, UTC+05:30); GMT is London (`Europe/London`, UTC+00:00 in November).
"Today" is the stated `now`. "Current" and "best" are the right streaks on that day.

| `id` | Ticks (local time, time zone) | Today (`now`) | Done today | Current | Best | The trap (the wrong answer it catches) |
|---|---|---|---|---|---|---|
| `midnight` | 20 Nov **11:59 pm** IST; 21 Nov **12:01 am** IST | 21 Nov 2026, 8:00 am IST | yes | **2** | 2 | Two minutes apart but two days. Code using the UTC date (both are 20 Nov in UTC) or "less than 24 hours" says **1** |
| `time-zone-change` | 19 Nov 10:00 pm in **London** (GMT); flies to India; 21 Nov **3:00 am** IST | 21 Nov 2026, 9:00 am IST | yes | **1** | 1 | 20 November was missed. In UTC the second tick is 20 Nov 21:30, so **UTC hides the gap** and code using UTC says **2**. Each tick's `day` was stored at tick time, from the clock the user saw |
| `gap` | 10, 11, 12, 14 and 15 Nov, each 8:00 am IST (13 Nov missed) | 15 Nov 2026, 8:00 pm IST | yes | **2** | **3** | Code that never checks for a missing day says 5; code with one running counter forgets the best streak (3) |
| `same-day-twice` | 5 Nov 8:00 am and 5 Nov 8:30 pm IST; 6 Nov 8:00 am IST | 6 Nov 2026, 9:00 am IST | yes | **2** | 2 | Counting check-ins instead of days says **3** |
| `not-yet-today` | 1 Nov 8:00 pm IST; 2 Nov 9:00 pm IST | 3 Nov 2026, **12:05 am** IST | no | **2** | 2 | Today has no tick yet, but the streak is alive. Counting back only from today says **0** |
| `month-end` | 29 Nov 6:30 pm, 30 Nov 6:30 pm IST; 1 Dec 7:15 am IST | 1 Dec 2026, 9:00 pm IST | yes | **3** | 3 | "The day before 1 December" is 30 November. Taking 1 from the day number gives day 0 and stops the run at **1** |

Each case in the JSON also has `trap` (the same words) and `wrongAnswer` (the wrong current streak and why), so your test can name what it guards against.

### The two extra cases

| `id` | Ticks | Today (`now`) | Done today | Current | Best | The trap |
|---|---|---|---|---|---|---|
| `clocks-go-forward` | 7, 8 and 9 March 2026, each 10:30 pm in **New York** (`America/New_York`). Clocks go forward on Sunday 8 March, so that day has 23 hours | 9 Mar 2026, 11:00 pm | yes | 3 | 3 | "(later minus earlier) / 24 hours" gives 0 days between ticks 23 hours apart. Dart's `difference().inDays` does exactly this |
| `restart-next-day` | 19 Nov 9:00 pm IST; 20 Nov 11:57 pm IST. The app was closed at 11:58 pm and opened at 12:03 am | 21 Nov 2026, 12:03 am IST | no | 2 | 2 | An app that saved a `doneToday: true` flag (see `savedOnDisk`), or worked out "today" once at start-up, still shows the habit as ticked |

## Writing the tests

- **Never read the real clock in a test**, or it passes today and fails tomorrow. Give your streak function today's day as a parameter, for example `currentStreak(checkIns, habitId, today)`, and pass the case's `now` day (the first 10 characters of `now`).
- **Use the stored `day` values**, or build each tick from the local year, month, day, hour and minute in the table and turn it into a day the way your app does. Your laptop's own time zone then does not matter.
- **Dart**: `DateTime(2026, 11, 20, 23, 59)` is a local moment; your `dayOf` turns it into a date-only value. `DateTime.parse(at)` gives a UTC time for a string with an offset: taking `.day` from it is exactly the trap.
- **TypeScript**: `new Date(at)` is a moment, and `getDate()` reads it in the laptop's time zone (in the course's Jest set-up, New York), not the case's. Use the `day` strings, and step between days with a helper that handles month ends, such as `previousDay`.
- The `time-zone-change` case needs no time-zone library: the stored `day` values already come from the clock the user saw.

The answers were checked on 24 November 2026 with a short script that applies the rule above using the real time-zone rules for `Asia/Kolkata`, `Europe/London` and `America/New_York`. The same script proved the UTC wrong answers in the `midnight` and `time-zone-change` cases.
