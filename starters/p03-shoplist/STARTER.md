# Starter: P3 ShopList (React Native)

The Guided starter for **P3 ShopList** (module 4). It is the `shoplist/` folder: an Expo SDK 58 app made with `npx create-expo-app@latest --no-agents-md` and `npm run reset-project`, with the Firebase JS SDK, Jest and the rules-test set-up in place, and every piece of logic left for you.
It was built and checked on 24 November 2026 with the versions in the kit's `VERSIONS.md`.

## What is included

| Path | What it is |
|---|---|
| `package.json`, `package-lock.json`, `tsconfig.json`, `app.json` | The SDK 58 app with `firebase`, AsyncStorage and `@firebase/rules-unit-testing` already added (task 7 step 5 and task 11 step 2 are done) |
| `package.json` `jest` block, `jest.global-setup.js` | Jest 30 with `jest-expo`, React Native Testing Library 14; `rules-tests/` is left out of the normal run |
| `jest.rules.config.js` | The second Jest config, for the rules tests only (`jest-expo/node` preset) |
| `rules-tests/node-types.d.ts`, `@types/node` | Node's types for the rules tests (`readFileSync`), which TypeScript 6 does not load by itself |
| `firestore.rules`, `firebase.json` | The kit's deny-all rules and emulator config |
| `.env.example` | The six `EXPO_PUBLIC_FIREBASE_...` names. Copy it to `.env` and fill it in task 7 |
| `src/firebase/config.ts` | Reads the config from `.env` |
| `src/firebase/auth-rn.d.ts` | The type file for `getReactNativePersistence` (see the kit's `firebase/README.md`) |
| `src/firebase/index.ts` | Notes: **you start Firebase here** in task 7 |
| `src/app/index.tsx` | **The one screen that is done**: the title, the connection and sign-in lines, an empty state and a New list button. No Firebase yet |
| `src/auth/errors.ts`, `src/lists/*.ts`, `src/notify/itemsToNotify.ts` | Typed signatures and notes for tasks 8 to 18 |
| `__tests__/errors.test.ts`, `rules-tests/lists.test.ts` | One `test.todo` placeholder each. You write every test |

## Copy it in (task 7)

In Git Bash, in task 7's folder:

```bash
cd ~/rn-ess-kit && git pull && cd -
cp -r ~/rn-ess-kit/starters/p03-shoplist shoplist
cd shoplist
npm install
cp .env.example .env
```

Then carry on from task 7 step 2 (the Firebase project and its Web app). Fill `.env` from the web app's config; it stays out of Git.

## Run it

```bash
npx tsc --noEmit
npx jest
npx expo start
```

The type check is clean, `npx jest` shows each placeholder as `todo` (not failed), and `npx expo start` opens the screen in Expo Go on your phone (scan the QR code) or in the browser (press `w`).

The rules tests run in the emulator (Java 21 or newer and the Firebase CLI, from `setup/windows.md`):

```bash
firebase emulators:exec --only firestore --project demo-shoplist "npx jest -c jest.rules.config.js"
```

As shipped it reports the placeholder as `todo`.

## The TODOs

`grep -rn "TODO(task" src __tests__ rules-tests firestore.rules` lists them.

| Task | File | What you write |
|---|---|---|
| 7 | `src/firebase/index.ts`, `src/app/index.tsx` | Start Firebase with persistent Auth; show the project id |
| 8 | `src/auth/errors.ts`, `src/app/index.tsx`, `__tests__/errors.test.ts` | Sign-in (`src/app/sign-in.tsx`, `src/auth/AuthContext.tsx`) and error messages |
| 9 | `firestore.rules`, `src/lists/types.ts`, `src/lists/email.ts`, `src/lists/api.ts` | The temporary rule, lists, sharing, the list route |
| 10 | `src/lists/api.ts` | Live items (`mapItem`, `useItems`, `useMyLists`) |
| 11 | `firestore.rules`, `rules-tests/lists.test.ts` | Your rules, proven in the emulator |
| 17 | `src/lists/api.ts` | Offline-safe updates (`src/lists/updates.ts`) |
| 18 | `src/notify/itemsToNotify.ts` | Local notifications (`src/notify/setup.ts`) |
| 19, 20 | none here | CI (`.github/workflows/ci.yml`) and the EAS release ([`release/README.md`](../../release/README.md)) |
| 21 | none | The wrap-up is writing and a demo: no starter code |

## What you still write yourself

All the logic: Firebase start-up, sign-in, lists, sharing, live items, rules and their tests, offline conflicts, notifications, CI and the release.
Also your product's `README.md` in the wrap-up (this `STARTER.md` is not it). Add packages with `npx expo install <name>`. Commit `package-lock.json`, `firebase.json`, `firestore.rules` and `.env.example`; never `.env`, `node_modules/` or a keystore.
