# Store listing: <your app's name>

Copy this file into `capstone/STORE-LISTING.md`. **Keep every heading.** Write only what the app does **today**: a feature counts only if its Must story is marked done in `PROGRESS.md`.
Your mentor uses this text for the internal-testing listing on the centre's Play account. Google Play's limits are below each heading. Count characters with `printf '%s' "your text" | wc -m` in Git Bash.

## App name

*At most 30 characters.*

<name> (<count> characters)

## Short description

*At most 80 characters: the one line people see first. Say what it does, plainly. No "best", "#1" or emoji spam.*

<short description> (<count> characters)

## Full description

*At most 4,000 characters. Who it is for, what it does (your done Must stories as features), and what it does not do. Short paragraphs or a list.*

<full description>

## Category

*One Play category, for example Productivity, Education, Finance, Lifestyle or Tools.*

<category>

## Screenshots

*Four phone screenshots of the main flow, saved as PNG files in `capstone/store/`. For each: the file name, the screen it shows and a one-line caption. Never show a real phone number, email or other personal data in a screenshot: use made-up test data.*

| File | Screen | Caption |
|---|---|---|
| `store/01-<name>.png` | | |
| `store/02-<name>.png` | | |
| `store/03-<name>.png` | | |
| `store/04-<name>.png` | | |

## Privacy note

*Play asks every app for a privacy policy. Write it in plain words for your users, and check every line against the code that saves data (`src/data/`). Name the files you checked.*

**What the app keeps:** <every piece of data it saves, for example "your plant names and the days you watered them">

**Where it is kept:** <"only on this phone" | "in Google's Cloud Firestore, in the project <name>">

**Who can see it:** <"only you" | "you and the people you share a list with, as the security rules enforce">

**How long:** <"until you delete it or uninstall the app">

**How to delete it:** <the steps in the app, or "uninstall the app">

**What the app does not do:** <for example "no ads, no tracking, no data sold or shared with anyone else">

**Contact:** <the contact email your mentor gives you for the centre's Play account. Never your phone number>

*Checked against:* <file names>

## Data safety (for a production release)

*Optional for the course: fill it only if your task asks. Google Play asks every app for these answers before a production release. Answer for each kind of data your app handles.*

| Data | Collected? | Shared with others? | Why | Can the user delete it? |
|---|---|---|---|---|
| Email address | | | | |
| Name | | | | |
| App content (your lists, entries) | | | | |
