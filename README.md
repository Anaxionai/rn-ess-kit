# RN-ESS course kit

This is the course kit for **RN-ESS, React Native Essentials**: nine weeks, three apps and a capstone, built with React Native, Expo and TypeScript for your own Android phone and the browser.
It holds what your tasks need beyond your own code: the laptop and phone setup guides, sample data, the Firebase and release guides, the Guided starters and the capstone briefs.
Your task briefs link to files in this kit.

## Get the kit

Run this once, in Git Bash, when your Launchpad task says so:

```bash
cd ~ && git clone https://github.com/Anaxionai/rn-ess-kit.git
```

This makes the folder `~/rn-ess-kit`, which is `C:\Users\<your name>\rn-ess-kit` on Windows.
Keep it next to your course repository, never inside it.

Check it: `ls ~/rn-ess-kit` lists `README.md`, `VERSIONS.md`, `setup` and the other folders below.

## Update the kit

When a task says "Run `git pull` in your copy of the course kit", run:

```bash
cd ~/rn-ess-kit
git pull
```

Do not change the kit's files. Copy a file into your own repository first, then change your copy.
If `git pull` says your local changes would be overwritten, run `git restore .` in the kit folder. It undoes your changes to the kit's files. Then run `git pull` again.

Every command in the kit is written for **Git Bash**, unless it says PowerShell. [`setup/windows.md`](setup/windows.md) sets it up.

## What is in the kit

| Path | What it is | Used in |
|---|---|---|
| `README.md` | This file | the whole course |
| `VERSIONS.md` | The version of every tool and package the course uses, checked on 24 November 2026 | the whole course |
| `LICENSE` | The MIT licence for the kit's code | — |
| `.gitattributes`, `.gitignore` | LF line endings, and the files Git must never take: build output, signing keys (`*.jks`, `*.keystore`, `key.properties`), `google-services.json`, `.env` | the whole course |
| `setup/windows.md` | Windows laptop setup in Git Bash: Git, VS Code, Node.js 24, Expo Go on your phone, the Expo CLI through npx, adb, the Firebase CLI, Java for the Firebase emulator and an Expo account for EAS | Launchpad |
| `setup/phone.md` | Developer options, USB and Wi-Fi debugging, `adb devices`, what to do when the phone is not found, and the 8 GB laptop advice | Launchpad |
| `setup/day1.md` | Day 1 in the browser: Expo Snack, opening it on your phone with Expo Go, and what to change | Launchpad, day 1 |
| `try-it.md` | Free sites where you practise each new idea in the browser | learn cards |
| `data/habits/` | `sample-habits.json`: sample habits and check-ins, and six named tricky cases (midnight, a time-zone change, a gap, the same day twice, not yet today, a month end) plus two extras, each with the right streaks | P1 HabitLoop |
| `data/books/` | The Open Library addresses BookShelf uses, the polite-use rules, and saved real responses (`sample-search.json`, `sample-work.json`) for offline tests | P2 BookShelf |
| `firebase/` | Creating a Firebase project on the free Spark plan, connecting the app with the Firebase JS SDK, what Spark leaves out, and the Local Emulator Suite; a deny-all rules file and an emulator config to start from | P3 ShopList, capstone |
| `release/README.md` | Release builds: the app icon, EAS Build on the free plan (with a local fallback), signing keys (never in Git), and internal testing through your mentor | P3 ShopList, CP2 |
| `starters/` | Guided starters: an Expo TypeScript project with the folders, the types and one screen done | P1 to P3 |
| `capstone/` | How the capstone works, the plan template, three app briefs (StudyTimer, ExpenseSplit, PlantCare) and the store listing template | CP1, CP2 |

The `data/` folders are the same in the Flutter Essentials and React Native Essentials kits, so the apps behave the same in both courses.

## Line endings

The kit's `.gitattributes` makes Git check out every text file with LF line endings, on Windows too (except Windows `.bat` files, which keep CRLF).
Do not convert the kit's files to CRLF. In VS Code, set **Files: Eol** to `\n` ([`setup/windows.md`](setup/windows.md) shows how).

## Keys and secrets never go into Git

Your course repository is public. These files must never be committed: signing keystores (`*.jks`, `*.keystore`), `key.properties`, `.env` files and any password.
Copy the kit's `.gitignore` lines into your own repository's `.gitignore` before P3. [`release/README.md`](release/README.md) says what to do if a key is pushed by mistake.

## Licence and attribution

- **The kit's code** is under the MIT licence: see [`LICENSE`](LICENSE). That covers the starters, examples and configuration files written for the kit.
- **Made-up data.** The habits and check-ins in `data/habits/` are made up by the kit. Use them freely.
- **Open Library data.** `data/books/` holds two responses saved from the Open Library API on 24 November 2026, for testing. Open Library is a project of the Internet Archive; see `data/books/README.md` for its terms and the credit line to show in your app.
- **Tools and services.** Expo, React Native, Firebase, Google Play and the other tools the course uses keep their own licences and terms. The course uses only their free plans: you never pay for anything. Company and product names belong to their owners.
