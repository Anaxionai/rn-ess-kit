# Release your app to testers (Expo and EAS)

This guide takes your app from your laptop to your testers' phones through **Google Play internal testing**. You use it in P3 ShopList and again in the capstone (CP2).

**You never pay anything and never need your own Play developer account.** The centre has one Google Play developer account. You build the app with EAS Build on Expo's free plan; your mentor uploads it to that account's internal testing track and adds your testers.

Checked on 24 November 2026 against https://docs.expo.dev/build/setup/, https://docs.expo.dev/build-reference/app-versions/, https://docs.expo.dev/app-signing/app-credentials/, https://docs.expo.dev/build-reference/local-builds/, https://expo.dev/pricing and the Play Console Help pages listed at the end.

## How it works, in one picture

```text
you                                   Expo (free plan)          your mentor (centre's Play account)   testers
---                                   ----------------          -----------------------------------   -------
1. package name from your mentor
2. app icon
3. eas build --platform android ----> 4. builds and signs
                                         the .aab, keeps the key
5. build link + .aab ---------------------------------------->  6. upload to Internal testing
                                                                 7. add testers' emails
   <------------------------------- release name, version code, status, opt-in link
8. join with the opt-in link                                                              ---> 9. install from Play
```

Expo Go is for developing. Testers get a real, standalone app from Google Play: they do not need Expo Go.

## Two keys, and why yours never goes into Git

Android apps are signed. Google Play uses **two keys** (Play App Signing):

- the **upload key**: signs each `.aab` you hand in, so Google knows it came from you. **EAS creates it on your first build and keeps it on Expo's servers**, in your Expo account;
- the **app signing key**: Google's. Play re-signs the app with it before it reaches phones.

So with EAS there is no key file on your laptop to lose or leak. Never download the keystore into your repository. If you ever download a backup with `eas credentials`, keep it in your user folder, never in Git (the kit's `.gitignore` ignores `*.jks`, `*.keystore` and `credentials.json`).

**Lost access to the key**, or a key pushed to GitHub by mistake? Tell your mentor the same day: the upload key can be reset in Play Console, and a new key made.

## Step 1: The package name from your mentor

Every app on Play has a unique **package name** (Android's application ID), and it can never change after the first upload. Apps starting with `com.example` are refused.
The course uses this pattern; your mentor confirms yours:

```text
com.anaxionai.<your github user name>.<app name>
```

- all lowercase; letters, digits and `_` only (change `-` to `_`); each part starts with a letter;
- examples: `com.anaxionai.asha_k.shoplist`, `com.anaxionai.ravi99.studytimer`.

In `app.json`:

```json
{
  "expo": {
    "name": "ShopList",
    "slug": "shoplist",
    "version": "1.0.0",
    "icon": "./assets/images/icon.png",
    "android": {
      "package": "com.anaxionai.asha_k.shoplist",
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundColor": "#FFFFFF"
      }
    }
  }
}
```

(Keep the other fields your template made. The SDK 58 template keeps its icons in `assets/images/` (`icon.png`, `android-icon-foreground.png`, `android-icon-background.png`, `android-icon-monochrome.png`); keep its names and paths and replace the images. If your project has `app.config.ts`, set the same fields there.)

Firestore apps: Firebase web config does not depend on the package name, so nothing changes in Firebase. If you added an Android app in the Firebase console, give it the same package name.

## Step 2: The app icon

- `icon`: a square PNG, **1024 by 1024** pixels (Expo's recommendation).
- `android.adaptiveIcon.foregroundImage`: a PNG with a transparent background; keep the picture in the middle, because Android crops adaptive icons to a circle or a rounded square.
- `android.adaptiveIcon.backgroundColor`: the colour behind it.

Save them in `assets/`. Free tools: Excalidraw, Figma, or any drawing app; use only images you made or may use.
Expo Go always shows its own icon: you see yours only in a real build.

## Step 3: EAS set-up (once per app)

You need a free Expo account and the EAS CLI (`setup/windows.md`, Step 10). In your app's folder:

```bash
eas login
eas whoami
eas build:configure
```

`eas build:configure` links the app to your Expo account and writes `eas.json`. Edit it so it looks like this:

```json
{
  "cli": {
    "appVersionSource": "remote"
  },
  "build": {
    "production": {
      "autoIncrement": true,
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

- `"appVersionSource": "remote"` means EAS keeps the **version code** (the number Play needs to grow with every upload), and
- `"autoIncrement": true` raises it on every production build. You never forget to raise it.
- `"buildType": "app-bundle"` makes an `.aab`, which Play needs. (It is the default for production builds; writing it makes it clear.)

`version` in `app.json` (`1.0.0`) is the **version name** testers see. Raise it yourself when you change what the app does (`1.0.1`, `1.1.0`).

Commit `eas.json` and `app.json`. They hold no secrets.

### Environment values (Firebase config)

`.env` files are not committed, so EAS's servers do not have them. If your app reads `EXPO_PUBLIC_...` values from `.env` (for example the Firebase config), add the same names and values as **EAS environment variables** for the production environment in your project's page on expo.dev (or with `eas env:create`; see https://docs.expo.dev/eas/environment-variables/). Otherwise the release starts with empty values and crashes.

## Step 4: Build

```bash
eas build --platform android --profile production
```

- The first time, it asks to **generate a new Android keystore**: answer **yes**. EAS keeps it.
- The build runs in Expo's cloud. On the free plan it waits in the low-priority queue: **at busy times the wait can be over 90 minutes**, and a build may run for at most 45 minutes. Start it early in the day and carry on with other work.
- The free plan allows **15 Android builds a month** (Expo's pricing page lists "up to 15 Android and 15 iOS builds"). Plan on **2 or 3 production builds** in the course: test everything in Expo Go first.

When it finishes, the terminal and the build page on expo.dev show the `.aab` link. Then:

```bash
eas build:list --platform android --limit 1
```

Paste the build ID, version, version code and status into `evidence.md`.

## Step 5: Hand the build to your mentor

Send your mentor, in the way they give you (usually the course chat or the centre's shared upload folder):

- the **build page link** from expo.dev, and the downloaded `.aab` (open the build page, select the download button; name it `<github user name>-<app>-<version code>.aab`);
- the package name and the version name and code;
- the Google account emails of your testers (yourself and up to a few classmates or family), in a private message, **never in your repository**;
- one line on what to test.

Never commit the `.aab` (the kit's `.gitignore` ignores `*.aab`).

## Step 6: What your mentor does, and sends back

On the centre's account in Play Console, your mentor:

1. creates the app (once) for your package name;
2. opens **Test and release → Testing → Internal testing**, creates a release, uploads your `.aab` and names the release (for example `3 (1.0.0)`);
3. adds your testers' emails to the internal testers list (internal testing allows up to 100 testers per app);
4. rolls the release out and sends you, as text:
   - the **release name**, the **version code** and the **track status** (for example "Internal testing: available to internal testers"),
   - the **opt-in link** for testers.

Paste that text into `evidence.md` as your task asks. Internal test releases usually reach testers within minutes, but may need review: if nothing arrives the same day, ask your mentor.

(EAS also has `eas submit`, which uploads to Play with a service-account key. Students have no access to the centre's Play account, so the mentor uploads instead.)

## Step 7: Testers join and install

Each tester:

1. opens the **opt-in link** on their phone while signed in to the Google account your mentor added;
2. selects **Accept invite** (or "Become a tester"), then the link to download it from Google Play;
3. installs the app from Google Play like any app.

Testers cannot find the app by searching Play: only the link works. A new upload reaches them as an update in Play.

## If the EAS queue is slow or your builds run out

- **Start early and wait.** The free plan's low-priority queue can take over 90 minutes at busy times, but it does finish. Start the build in the morning, test in Expo Go meanwhile, and check `eas build:list` later.
- **Do not build on your laptop.** `eas build --local` does **not** run on Windows (Expo supports local builds on macOS and Linux only), and a full Android build needs Android Studio, JDK 17 and more memory than an 8 GB laptop has spare.
- **Tell your mentor** if the build has not finished by the afternoon of a release day, or if you have used your free builds. Your mentor has a fallback: they build your pushed code on a Mac or Linux machine with the **same EAS-held key**, so Play still accepts the upload.

Never make a second upload key yourself: Play accepts only one upload key per app, and a build signed with another key is refused.

## Why not a public release?

A new personal Play account must run a **closed test with at least 12 testers for 14 days in a row** before it may apply for production. The course has no time for that, so every app stays in internal testing, which is enough to put it on real phones. Production release is out of scope.

## Release checklist

- [ ] Package name from your mentor in `app.json`, not `com.example...`
- [ ] App name, version, icon and adaptive icon set
- [ ] `eas.json` has `"appVersionSource": "remote"` and `"autoIncrement": true` in `production`
- [ ] EAS environment variables set for every `EXPO_PUBLIC_` value the app needs
- [ ] The main flow works in Expo Go before you spend a build
- [ ] `eas build --platform android --profile production` finished; `eas build:list` details in `evidence.md`
- [ ] Build link and `.aab` sent to your mentor; testers' emails sent privately
- [ ] Release name, version code, status and opt-in link pasted into `evidence.md`
- [ ] No keystore, `.env` or `.aab` in any commit

## Sources (checked 24 November 2026)

- EAS Build set-up and limits: https://docs.expo.dev/build/setup/ and https://expo.dev/pricing
- eas.json: https://docs.expo.dev/eas/json/ ; versions: https://docs.expo.dev/build-reference/app-versions/
- Credentials: https://docs.expo.dev/app-signing/app-credentials/
- Local builds (not on Windows): https://docs.expo.dev/build-reference/local-builds/
- app.json fields (`android.package`, `icon`, `adaptiveIcon`): https://docs.expo.dev/versions/latest/config/app/
- Internal testing (up to 100 testers, opt-in link): https://support.google.com/googleplay/android-developer/answer/9845334
- Play App Signing and resetting a lost upload key: https://support.google.com/googleplay/android-developer/answer/9842756
- Testing requirements for new personal accounts (12 testers, 14 days): https://support.google.com/googleplay/android-developer/answer/14151465
