# Versions

The tools and packages React Native Essentials uses, and the version of each.
Briefs never name versions: when a version matters, a task points here.
**Checked on 24 November 2026** against each project's official release page or package registry (the sources are at the end).

How to read the tables:

- **Course version** means: install this version. A newer patch release (the last number) is fine.
- **SDK 58 pin** means: the version Expo SDK 58 expects. Never type it yourself: `npx expo install <package>` picks it for you, and `package-lock.json` pins it; commit it.
- **Current** means: the newest release on 24 November 2026, which the course was written against.

## On your laptop (Windows)

[`setup/windows.md`](setup/windows.md) installs these.

| Tool | Version | Kind | Notes |
|---|---|---|---|
| Windows | 10 or 11, 64-bit | minimum | |
| Laptop memory | 8 GB | minimum | Enough with your own phone and Expo Go. The Android emulator wants 16 GB: see [`setup/phone.md`](setup/phone.md) |
| Git for Windows (Git Bash) | 2.56.1 | course version | Any 2.45 or newer works |
| VS Code | the newest (1.146 on 24 Nov 2026) | — | It updates itself. Add the **Expo Tools** and **ESLint** extensions |
| **Node.js** | **24.22.3 LTS ("Krypton")** | course version | Expo SDK 58 needs Node 22.13 or newer; the rules-testing library (`@firebase/rules-unit-testing` 6.0.0) needs **24.12 or newer**. Node 24 is a supported LTS until April 2028. Node 26 (what `winget install OpenJS.NodeJS.LTS` gives today) also works |
| npm | comes with Node.js | — | |
| Expo CLI | comes with the `expo` package | — | Never install it globally: run it with `npx expo ...` inside your project |
| EAS CLI (`eas-cli`) | 27.11.0 | course version | Only for release builds in P3 and CP2: `npx eas-cli@latest ...`, or `npm install -g eas-cli` |
| Android SDK Platform-Tools (adb) | 37.0.3 | course version | Only `adb`, no Android Studio: `winget install -e --id Google.PlatformTools` |
| Google Chrome or Edge | the newest | — | For Expo web (`npx expo start --web`) |
| Firebase CLI (`firebase-tools`) | 15.37.0 | course version | `npm install -g firebase-tools`. Needs Node 20 or newer |
| Java for the Firebase Local Emulator Suite | **JDK 21 or newer** (Microsoft Build of OpenJDK 21.0.13) | minimum | The Firebase CLI release notes say the emulators no longer run on Java older than 21 (the emulator install page still says 11). `winget install -e --id Microsoft.OpenJDK.21` |

## Your phone

| What | Version | Kind | Notes |
|---|---|---|---|
| Android | the minimum in Expo Go's Play Store listing | minimum | If Play Store will not install Expo Go, tell your mentor |
| **Expo Go** | **for SDK 58** | course version | From Google Play. Each Expo Go build runs one SDK version, and it must match your project's. Play Store can lag a few days after a new SDK: then get it from https://expo.dev/go |
| Wireless debugging | Android 11 (API 30) or newer | minimum | Only for `adb` over Wi-Fi. Expo Go itself needs only the same Wi-Fi as the laptop |
| iPhone | — | not used | The course has no Macs, so there are no iOS builds |

## Expo SDK 58 and its packages

Create projects with `npx create-expo-app@latest` (see the starters). Add packages with **`npx expo install <name>`**, never plain `npm install`, so you get the version SDK 58 expects.

| Package | Version | Kind | Job | First used |
|---|---|---|---|---|
| `expo` | 58.0.26 | current | The Expo SDK | LP |
| `react-native` | 0.88.1 | SDK 58 pin | React Native | LP |
| `react`, `react-dom` | 19.3.0 | SDK 58 pin | React (`react-dom` only for Expo web) | LP |
| `react-native-web` | ~0.21.4 | SDK 58 pin | Expo web | LP |
| `typescript` | ~6.0.3 | the template's pin | TypeScript. The Expo template pins 6.0; npm's newest is 7.0.2. Keep the template's | LP |
| `expo-router` | ~58.0.32 | SDK 58 pin | Screens, tabs and routes from files | P1 |
| `@react-native-async-storage/async-storage` | 2.2.0 | SDK 58 pin | Saving small data on the device (npm's newest is 3.1.1: keep the SDK's) | P1 |
| `expo-sqlite` | ~58.0.18 | SDK 58 pin | SQLite on the device | P1 (optional) |
| `jest-expo` | ~58.0.15 | SDK 58 pin | Jest set up for Expo | P1 |
| `jest`, `@types/jest` | as `npx expo install` picks | — | The test runner | P1 |
| `@testing-library/react-native` | 14.1.0 | current | Component tests | P1 |
| `@tanstack/react-query` | 5.108.4 | current | Server state: loading, errors and caching | P2 |
| `@tanstack/react-query-persist-client`, `@tanstack/query-async-storage-persister` | 5.108.4 | current | Keeping the query cache on the device (offline) | P2 |
| `expo-image` | ~58.0.18 | SDK 58 pin | Images with a disk cache (covers) | P2 |
| `firebase` | 13.4.0 | current | The Firebase JS SDK: Auth and Firestore. Works in Expo Go. Expo supports `firebase` 12.0.0 and newer | P3 |
| `expo-notifications` | ~58.1.9 | SDK 58 pin | Local notifications | P3 |
| `@firebase/rules-unit-testing` | 6.0.0 | current | Testing Firestore rules in the emulator; needs Node 24.12 or newer | P3 |
| `@types/node` | 24.x | current major for Node 24 | Node's types for the rules tests (TypeScript 6 does not load them by itself) | P3 |
| `eslint-config-expo` | 58.0.4 | current | Lint rules, added by `npx expo lint` | P3 |

The course modules may name one more package for a job; when they do, their brief says which and why.

## Free plans the course relies on

| Service | Plan | What matters |
|---|---|---|
| Expo account and EAS Build | Free | 15 Android builds a month ("up to 15 Android and 15 iOS builds"), a low-priority queue (waits can pass 90 minutes at busy times) and a 45-minute build timeout (https://expo.dev/pricing). Plan for 2 or 3 release builds in the course |
| Firebase | Spark (no cost, no card) | See [`firebase/README.md`](firebase/README.md) |

## GitHub Actions (P3)

| Action | Version |
|---|---|
| `actions/checkout` | `v7` |
| `actions/setup-node` | `v7`, with `node-version: 24` and `cache: npm` |

Run jobs on `runs-on: ubuntu-latest`.

## Sources (read on 24 November 2026)

- Expo SDK: https://docs.expo.dev/versions/latest/ (v58.0.0: React Native 0.88, React 19.3.0, Node 22.13 or newer); the SDK 58 pins in `packages/expo/bundledNativeModules.json` on the `sdk-58` branch of https://github.com/expo/expo; a fresh `npx create-expo-app@latest --template blank-typescript` (expo ~58.0.26, react-native 0.88.1, typescript ~6.0.3)
- Expo Go: https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/ ; notifications in Expo Go: https://docs.expo.dev/versions/latest/sdk/notifications/
- EAS: https://expo.dev/pricing, https://docs.expo.dev/build/setup/, https://docs.expo.dev/build-reference/local-builds/
- npm registry (`https://registry.npmjs.org/<name>/latest`): expo 58.0.26, eas-cli 27.11.0, firebase 13.4.0, firebase-tools 15.37.0, @tanstack/react-query 5.108.4, @testing-library/react-native 14.1.0, eslint-config-expo 58.0.4
- Node.js: https://nodejs.org/en/about/previous-releases and https://github.com/nodejs/Release (24 is Maintenance LTS to 30 April 2028; 26 is Active LTS)
- Emulator Java: https://firebase.google.com/support/release-notes/cli (Java older than 21 no longer supported), https://firebase.google.com/docs/emulator-suite/connect_firestore and https://firebase.google.com/docs/emulator-suite/install_and_configure
- Android: https://developer.android.com/tools/releases/platform-tools (37.0.3)
- winget package versions (`winget show`): Git 2.56.1, Platform-Tools 37.0.3, OpenJDK 21.0.13
- GitHub Actions: the releases pages of `actions/checkout` (v7.0.1) and `actions/setup-node` (v7.1.0)
