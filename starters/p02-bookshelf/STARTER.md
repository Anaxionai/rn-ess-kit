# Starter: P2 BookShelf (React Native)

The Guided starter for **P2 BookShelf** (module 3). It is the `bookshelf/` folder: an Expo SDK 58 app made with `npx create-expo-app@latest --no-agents-md` and `npm run reset-project`, with Jest set up and every piece of logic left for you.
It was built and checked on 24 November 2026 with the versions in the kit's `VERSIONS.md`.

## What is included

| Path | What it is |
|---|---|
| `package.json`, `package-lock.json`, `tsconfig.json`, `app.json` | The SDK 58 app, TypeScript strict, routes in `src/app/` (Expo Router) |
| `package.json` `jest` block, `jest.global-setup.js` | Jest 30 with `jest-expo`, React Native Testing Library 14, a fixed test time zone |
| `src/app/index.tsx` | **The one screen that is done**: the search box, the Search button and an empty results list. No searching yet |
| `src/api/types.ts` | Placeholder types: you copy yours from task 6 |
| `src/api/books.ts`, `src/api/openLibrary.ts` | Typed function signatures that throw `TODO(task NN)` |
| `__tests__/*.test.ts` | One `test.todo` placeholder per file. You write every test |

## Copy it in (task 7)

In Git Bash, in task 7's folder:

```bash
cd ~/rn-ess-kit && git pull && cd -
cp -r ~/rn-ess-kit/starters/p02-bookshelf bookshelf
cd bookshelf
npm install
```

Then carry on from task 7 step 2. In task 18, copy the kit's samples in: `mkdir -p src/test/fixtures && cp ~/rn-ess-kit/data/books/sample-*.json src/test/fixtures/`.

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
| 7 | `src/api/types.ts`, `src/api/books.ts`, `src/api/openLibrary.ts`, `src/app/index.tsx` | Your types, `firstAuthor`, `searchBooks` with the User-Agent, the results list |
| 8 | `src/app/index.tsx` | TanStack Query (`src/api/useBookSearch.ts`, the provider in `src/app/_layout.tsx`) and the four states |
| 9 | `src/api/books.ts`, `src/api/openLibrary.ts`, `__tests__/books.test.ts` | `descriptionText`, `getWork`, the detail route `src/app/book/[id].tsx` |
| 10 | none here | The reading list (new folder `src/readingList/`) |
| 16 | none here | Persisting the query cache (`src/api/queryClient.ts`) and cached covers |
| 17 | `src/api/openLibrary.ts`, `src/app/index.tsx` | Debounce (`src/hooks/useDebouncedValue.ts`) and cancelling old searches |
| 18 | `__tests__/openLibrary.test.ts` | Mocked fetch, `SearchResults` and the test helpers in `src/test/` |
| 19 | `src/app/index.tsx` | Pull to refresh and infinite scroll |
| 20, 21 | none here | Accessibility fixes; the theme (`src/theme.ts`) and icons |
| 22 | none | The wrap-up is writing and a demo: no starter code |

## What you still write yourself

All the logic: types, requests and errors, server state, routes, the reading list, the offline cache, the debounce, paging, accessibility, the theme and every test.
Also your product's `README.md` in the wrap-up (this `STARTER.md` is not it). Add packages with `npx expo install <name>`. Commit `package-lock.json`; never `node_modules/`.
