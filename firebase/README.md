# Firebase on the free Spark plan

P3 ShopList (and a capstone that shares data) uses **Firebase Authentication** (email and password sign-in) and **Cloud Firestore** (a live database), on Firebase's free **Spark** plan.
This page sets up a project, connects your app, and tests your security rules on your laptop with the **Local Emulator Suite**.

Checked on 24 November 2026 against https://firebase.google.com/pricing, https://firebase.google.com/docs/projects/billing/firebase-pricing-plans, https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024, https://firebase.google.com/docs/emulator-suite/install_and_configure, https://firebase.google.com/docs/firestore/security/get-started and https://docs.expo.dev/guides/using-firebase/.

## 1. The Spark plan: free, no card, and what it leaves out

Spark needs **no payment method**. Never add a card or upgrade to Blaze for this course: if a page asks you to, stop and ask your mentor.

What Spark gives you (from the pricing page):

| Product | Free on Spark |
|---|---|
| Cloud Firestore | 1 GiB stored; **50,000 document reads, 20,000 writes and 20,000 deletes a day**; 10 GiB of network egress a month |
| Authentication | Email and password sign-in, up to 50,000 monthly active users |

If a project goes over a free quota, Firebase turns that product off for the project until the quota resets; nothing is charged. A shopping list for a family uses a tiny part of these limits. The way to blow them is a bug: a listener inside a loop, or a screen that re-reads everything on every rebuild. Watch **Firestore → Usage** in the console in your first week.

**What Spark does not include, so the course does not use it:**

| Not on Spark | Why it matters |
|---|---|
| **Cloud Storage for Firebase** | Since 3 February 2026 every Cloud Storage bucket, even the default one, needs the paid Blaze plan; Spark projects get 402 or 403 errors. So: **no photo or file uploads** |
| **Cloud Functions** | Needs Blaze. So: no server code, and **no server push notifications**. ShopList notifies with local notifications from the app's own Firestore listener |
| **Phone-number sign-in** (SMS) | Not available on Spark. The course uses email and password only |

## 2. Create your project (once per app)

1. Open https://console.firebase.google.com and sign in with the Google account you use for the course.
2. Select **Create a project**. Name it `shoplist-<your name>` (for the capstone, `<app>-<your name>`). Turn **Google Analytics off**: the course does not use it. Finish.
3. Check the plan: the project's settings show **Spark**. Leave it.
4. **Authentication**: open **Build → Authentication → Get started**, then **Sign-in method → Email/Password → Enable → Save**.
5. **Firestore**: open **Build → Firestore Database → Create database**. Choose a location near your users (you cannot change it later) and **production mode**. Production mode denies every read and write until you deploy rules, which is the safe start.

## 3. Connect your Expo app with the Firebase JS SDK

The course uses the **Firebase JS SDK** (the `firebase` npm package). Expo recommends it for apps that run in **Expo Go**, and it works on Android and the web from one code base. (React Native Firebase, the other library, needs a development build and cannot run in Expo Go.)

1. In the Firebase console, open **Project settings → General → Your apps → Add app → Web** (the `</>` icon). Give it a nickname such as `shoplist-app`. Do **not** tick Firebase Hosting. Firebase shows a `firebaseConfig` object: keep that page open.
2. In your app's folder:

```bash
npx expo install firebase @react-native-async-storage/async-storage
```

3. Put the config values in a `.env` file in your app's folder (Expo loads `EXPO_PUBLIC_` variables into the app):

```text
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

`.env` is kept out of Git by the kit's `.gitignore`; commit a `.env.example` with the names and no values. These values are **not secrets** (every phone has them), but keeping them out of Git keeps your project easy to swap. For release builds, add the same names as EAS environment variables (see [`release/README.md`](../release/README.md)).

4. Put the config in `src/firebase/config.ts` and start Firebase once in `src/firebase/index.ts` (the Guided starter has `config.ts` ready):

```ts
// src/firebase/config.ts
export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};
```

```ts
// src/firebase/index.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { firebaseConfig } from "./config";

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Keep the user signed in after the app restarts (AsyncStorage on the phone).
export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

export const db = getFirestore(app);
```

Expo's Firebase guide links to this `initializeAuth` set-up (https://expo.fyi/firebase-js-auth-setup). Without it, users are signed out every time the app restarts.

**If TypeScript says `getReactNativePersistence` is not exported:** `firebase/auth`'s default types come from its web build, which does not have it; Metro loads the React Native build, which does. Add this 8-line type file as `src/firebase/auth-rn.d.ts` (the Guided starter has it). It was checked on 24 November 2026 with `firebase` 13.4 and TypeScript 6.0:

```ts
// firebase/auth's default types come from its web build, which has no
// getReactNativePersistence. Metro loads the React Native build, which has it.
// Checked with firebase 13.4 and TypeScript 6.0.
import type { Persistence, ReactNativeAsyncStorage } from "firebase/auth";

declare module "firebase/auth" {
  export function getReactNativePersistence(storage: ReactNativeAsyncStorage): Persistence;
}
```

5. Restart Expo (`npx expo start --clear`) after changing `.env`. Show `app.options.projectId` on a screen to check the connection.

You do **not** need `google-services.json` or an Android app in the Firebase console for the JS SDK. If you add one anyway, use your package name from [`release/README.md`](../release/README.md); the kit's `.gitignore` keeps the file out of Git.

**Connecting the app to the emulator** (for practice and tests): after creating `auth` and `db`, call `connectAuthEmulator(auth, "http://localhost:9099")` and `connectFirestoreEmulator(db, "localhost", 8080)`. On a phone, `localhost` is the phone itself: use the emulator from Expo web, or your laptop's Wi-Fi IP address with `"host": "0.0.0.0"` added to each emulator in `firebase.json`.

## 4. `firebase.json`: rules and emulators

The kit's [`firebase.json.example`](firebase.json.example) points the Firebase CLI at your rules file and sets the emulator ports:

| Emulator | Port |
|---|---|
| Authentication | 9099 |
| Cloud Firestore | 8080 |
| Emulator Suite UI | 4000 (open http://localhost:4000) |

Copy the example into your app's folder as `firebase.json` (`cp ~/rn-ess-kit/firebase/firebase.json.example firebase.json`). If you ran `firebase init` and it wrote its own `firebase.json`, copy the example's `firestore` and `emulators` keys into it instead.

Commit `firebase.json` and `firestore.rules`. They hold no secrets.

## 5. Security rules: start from "deny everything"

The kit's [`firestore.rules.example`](firestore.rules.example) denies every read and write:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Copy it to `firestore.rules` in your app's folder. Then open up **only** what your app needs, for example "a signed-in member of a list may read it", and prove each rule with a test in the emulator (section 6) **before** you deploy:

```bash
firebase deploy --only firestore:rules --project <your project id>
```

Your Firebase config values (the API key and project id in your app) are **not secrets**: every user's phone has them. What protects your data is the rules. A stranger who knows a list's id must still be stopped by a rule.

## 6. The Local Emulator Suite: test without touching the real project

The emulators run Authentication and Firestore on your laptop. Nothing reaches your real project, nothing counts against your quota, and you can break things freely.

**You need:** the Firebase CLI, **Java 21 or newer** (the CLI refuses older Java, although the install page still says 11) and, for rules tests, **Node 24.12 or newer**. `setup/windows.md` installs them; check with `firebase --version`, `java -version` and `node --version`.

**Use a demo project id.** A project id that starts with `demo-`, such as `demo-shoplist`, needs no real project and can never reach the cloud:

```bash
firebase emulators:start --project demo-shoplist
```

- Open http://localhost:4000 for the Emulator Suite UI: the Authentication tab (add test users), the Firestore tab (see and edit documents) and the logs.
- Stop with Ctrl+C. The data is thrown away (add `--import` and `--export-on-exit` with a folder name to keep it; the kit's `.gitignore` ignores `emulator-data/`).
- **Port already in use** (often 8080 on Windows): change the port in `firebase.json` and in your app's emulator connection, or stop the other program.
- `java` not found or too old: see `setup/windows.md`, the Java step.

### Rules tests with `@firebase/rules-unit-testing`

The library loads your rules into the Firestore emulator and lets a test act as any user. The course runs these tests with **Jest**, in their own folder `rules-tests/` and with their own Jest config, because they need the emulator and Node, not React Native. In your app's folder:

```bash
npx expo install @firebase/rules-unit-testing --dev
npm install --save-dev @types/node@24
```

The tests read `firestore.rules` with `readFileSync` from Node. TypeScript 6 does not load `@types/node` by itself, so add `rules-tests/node-types.d.ts` with this one line (the Guided starter has it); otherwise `npx tsc --noEmit` fails with the error TS2591 on `node:fs`:

```ts
/// <reference types="node" />
```

`jest.rules.config.js` (the Guided starter has it):

```js
// Jest config for the Firestore rules tests only. They run in Node, inside
// the Firestore emulator: see firebase/README.md in the course kit.
module.exports = {
  preset: "jest-expo/node",
  testMatch: ["<rootDir>/rules-tests/**/*.test.ts"],
};
```

and in `package.json`, keep them out of the normal `npx jest` run:

```json
"jest": {
  "preset": "jest-expo",
  "testPathIgnorePatterns": ["/node_modules/", "/rules-tests/"]
}
```

A first test, `rules-tests/lists.test.ts`, that proves the deny-all file denies a read:

```ts
import { afterAll, beforeAll, test } from "@jest/globals";
import { readFileSync } from "node:fs";
import { assertFails, initializeTestEnvironment, type RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { doc, getDoc } from "firebase/firestore";

let env: RulesTestEnvironment;

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-shoplist",
    firestore: { rules: readFileSync("firestore.rules", "utf8") },
  });
});

afterAll(async () => {
  await env.cleanup();
});

test("a signed-in user cannot read a list under deny-all rules", async () => {
  const db = env.authenticatedContext("asha", { email: "asha@example.com" }).firestore();
  await assertFails(getDoc(doc(db, "lists/l1")));
});
```

Run it inside the emulator, from your app's folder:

```bash
firebase emulators:exec --only firestore --project demo-shoplist "npx jest -c jest.rules.config.js"
```

`emulators:exec` starts the emulator, runs the command and stops the emulator again. The output ends with `Tests: 1 passed`; paste it into `evidence.md`. Long `PERMISSION_DENIED` warnings from `@firebase/firestore` appear next to tests that pass: `assertFails` expects that denial, so they are normal. Read the pass and fail lines and the `Tests:` line at the end. (Checked on 24 November 2026 with firebase-tools 15.37.0, Java 21 and Node 24.22 in the emulator.) Your P3 task then adds the real cases: a member reads, a stranger fails, a signed-out user fails, and so on. Seed data with `env.withSecurityRulesDisabled(...)`, and use `assertSucceeds` for what must work.


## 7. Offline and conflicts, in one paragraph

Firestore keeps the listener's latest data in memory while the app runs, and writes made offline are queued and sent when the connection returns. In the JS SDK on React Native the cache is in **memory**, not on disk (the disk cache uses the browser's IndexedDB, which phones do not have in React Native), so a cold start offline shows nothing until the phone is online again. When two phones change the same field, the **last write to reach the server wins**. So update only the fields that changed (`updateDoc`, not `setDoc` of the whole document), use `increment()` for counts, and `serverTimestamp()` for times. P3 has you prove this with two phones, one of them offline.

## Sources (checked 24 November 2026)

- Pricing and the Spark plan: https://firebase.google.com/pricing and https://firebase.google.com/docs/projects/billing/firebase-pricing-plans
- Cloud Storage needs Blaze: https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024
- Emulator Suite: https://firebase.google.com/docs/emulator-suite/install_and_configure and https://firebase.google.com/docs/emulator-suite/connect_firestore (the `demo-` prefix)
- Java 21 for the emulators: https://firebase.google.com/support/release-notes/cli
- Rules: https://firebase.google.com/docs/firestore/security/get-started ; rules tests: https://firebase.google.com/docs/rules/unit-tests (`@firebase/rules-unit-testing` 6.0.0 needs Node 24.12 or newer)
- Firebase CLI: https://firebase.google.com/docs/cli
- Firebase with Expo: https://docs.expo.dev/guides/using-firebase/ and https://expo.fyi/firebase-js-auth-setup
- Offline data: https://firebase.google.com/docs/firestore/manage-data/enable-offline
