# Set up your Windows laptop for React Native and Expo

This guide sets up a Windows laptop for the whole course. **Git Bash is your terminal**, inside VS Code.
Do Part 1 in the Launchpad (week 1) when your task says so, and Part 2 at the start of P3 ShopList (week 6). After each step, run its check before you go on.

The versions are in [`VERSIONS.md`](../VERSIONS.md). Steps that need your phone are in [`phone.md`](phone.md).

## Before you start

- **Windows 10 or 11, 64-bit.** Press Windows+R, type `winver` and press Enter to see your version.
- **At least 8 GB of memory.** Your app runs on your own phone in Expo Go, not in an emulator: see [`phone.md`](phone.md).
- **About 5 GB of free disk space** (our estimate: Node.js, your projects' `node_modules` folders and the tools).
- **An administrator account** on the laptop.
- **Your Android phone**, on the **same Wi-Fi** as the laptop, and its USB cable (one that carries data).
- Keep the charger plugged in. If your laptop does not run Windows, ask your mentor for the matching steps.

You do **not** need Android Studio, the Android SDK or an emulator: Expo Go on your phone runs your app, and EAS Build makes the release in the cloud.

## What you install, and when

| Tool | What it is for | When |
|---|---|---|
| Git for Windows (Git Bash) | Version control and your terminal | Week 1 |
| VS Code + Expo Tools + ESLint | Where you write code | Week 1 |
| Node.js 24 LTS and npm | Runs Expo, Jest and the other tools | Week 1 |
| Expo Go (on the phone) | Opens your app on the phone | Week 1 (day 1) |
| Expo CLI | Starts your app: `npx expo start`. Comes with each project, never installed globally | Week 1 |
| Android Platform-Tools (`adb`) | Talks to your phone over USB: logs, and the USB fallback | Week 1 |
| Firebase CLI | Runs the Firebase Local Emulator Suite | Week 6 |
| Java (JDK 21 or newer) | Runs the Firebase emulator | Week 6 |
| An Expo account and the EAS CLI | Release builds in the cloud | Week 6 |

Run every command in **Git Bash**, unless a step says PowerShell.

## Part 1, week 1

### Step 1: Git for Windows

Your Launchpad task installs Git from https://git-scm.com/downloads/win with the default options. Those options include Git Bash and Git Credential Manager (for signing in to GitHub).

Check it in Git Bash: `git --version` prints `git version 2.` and more numbers. Any version from 2.45 is fine.

### Step 2: VS Code, Git Bash and LF line endings

1. Install VS Code from https://code.visualstudio.com/download with the default options. Tick **Add to PATH** if the installer asks.
2. Make Git Bash the terminal: press Ctrl+Shift+P, type `Terminal: Select Default Profile` and choose **Git Bash**.
3. Line endings: open **Settings** (Ctrl+,), search for `eol` and set **Files: Eol** to `\n`.
4. Select **Extensions** (Ctrl+Shift+X) and install **Expo Tools** (from Expo) and **ESLint** (from Microsoft).

Check it: open a new terminal with Ctrl+`. The prompt shows `MINGW64`. Open a new file: the status bar at the bottom right shows `LF`.

### Step 2b: The course kit, and its two Git files in your repository

Clone the kit next to your course repository (never inside it):

```bash
cd ~ && git clone https://github.com/Anaxionai/rn-ess-kit.git
ls ~/rn-ess-kit
```

You see `README.md`, `VERSIONS.md`, `setup` and the other folders.

Your course repository needs the kit's `.gitignore` (keeps `node_modules/`, `.expo/`, keys and `.env` out of Git) and `.gitattributes` (LF line endings). Copy them to the **top folder** of your course repository once, when your task says so:

```bash
cd <your course repository>
cp ~/rn-ess-kit/.gitignore ~/rn-ess-kit/.gitattributes .
git add .gitignore .gitattributes
git commit -m "chore: add the course kit's gitignore and gitattributes"
```

If your repository already has a `.gitignore`, add the kit's lines to the end of yours instead: `cat ~/rn-ess-kit/.gitignore >> .gitignore`.

### Step 3: Node.js 24 LTS

1. Download the **Windows Installer (.msi)** for **Node.js 24 LTS** from https://nodejs.org/en/download (choose v24 in the version list) and run it with the default options. You do not need the "Tools for Native Modules" option. (Node 26 also works with the course; `winget install OpenJS.NodeJS.LTS` gives 26.)
2. Close VS Code completely and open it again.

Check it:

```bash
node --version
npm --version
```

`node --version` prints `v24.12` or newer (or `v26.`): the Firebase rules tests in P3 need 24.12 or newer. `npm --version` prints a number.

### Step 4: Expo Go on your phone

On your Android phone, open Google Play, search for **Expo Go** (from Expo) and install it. Day 1 ([`day1.md`](day1.md)) uses it with Expo Snack.

Expo Go runs one Expo SDK version at a time, and it must match your project's: the course uses the SDK in `VERSIONS.md`. If Expo Go says the project's SDK is not supported, update Expo Go from Google Play, or get it from https://expo.dev/go.

### Step 5: Your first Expo project (the Launchpad task does this)

Your task gives the exact command. It looks like this:

```bash
npx create-expo-app@latest my-app --no-agents-md
cd my-app
npx expo start
```

`npx` downloads the right Expo tools for the project each time; you never install the Expo CLI globally.
`npx expo start` prints a QR code. In Expo Go, select **Scan QR code** and point the phone at it. The app opens on the phone.

If the phone cannot connect (the laptop and phone are on different networks, or the Wi-Fi blocks devices from seeing each other, as many college and office networks do):

- connect both to a phone hotspot, or
- use a USB cable and `adb` (Step 6): run `npx expo start --localhost`, then press `a` in the Expo terminal, or
- use a tunnel: run `npx expo login` once (with your free Expo account), then `npx expo start --tunnel`. It is slower, but works on networks that block devices from seeing each other. (SDK 58 tunnels need no ngrok.)

When Windows Defender Firewall asks about Node.js, allow it. If your Wi-Fi is marked **Public** in Windows (Settings → Network & internet), the phone cannot reach the laptop until you allow Public networks too, or mark your home Wi-Fi as Private.

### Step 6: Android Platform-Tools (adb)

`adb` lets the laptop talk to the phone over USB. You need it for logs and as a fallback when Wi-Fi does not work. In **PowerShell**:

```powershell
winget install -e --id Google.PlatformTools
```

(Or download "SDK Platform-Tools for Windows" from https://developer.android.com/tools/releases/platform-tools, unzip it to `C:\Users\<your name>\platform-tools`, and add that folder to your user PATH.)

Close and reopen VS Code. Check it: `adb version` prints `Android Debug Bridge version 1.0.41` and `Version 37.` or newer.

Then follow [`phone.md`](phone.md) to turn on USB debugging, plug in the phone and run:

```bash
adb devices
```

It lists your phone with the word `device` after its serial number.

### Step 7: Expo web in the browser

Your Launchpad task runs the same app in the browser. In a project made with `create-expo-app`, press `w` in the Expo terminal, or run:

```bash
npx expo start --web
```

If Expo says packages are missing, it prints the command, which is: `npx expo install react-dom react-native-web @expo/metro-runtime`.

## Part 2, week 6: Firebase and release tools for P3 ShopList

### Step 8: Firebase CLI

```bash
npm install -g firebase-tools
firebase --version
firebase login
```

`firebase --version` prints `15.` or newer. `firebase login` opens your browser: sign in with the Google account you use for the course. If Git Bash waits forever, press Ctrl+C and run `firebase login --no-localhost`, then follow its steps.

### Step 9: Java 21 for the Firebase emulator

The Firebase Local Emulator Suite runs on Java, and the Firebase CLI refuses Java older than 21 (the emulator install page still says 11; the CLI's release notes are newer). In **PowerShell**:

```powershell
winget install -e --id Microsoft.OpenJDK.21
```

Close and reopen VS Code. Check it in Git Bash:

```bash
java -version
```

You see `openjdk version "21.` If you see `java version "1.8.`, an old Oracle Java comes first on your PATH: open "Edit the system environment variables" → Environment Variables → Path, and move the `Microsoft\jdk-21...` line above any `Oracle\Java` line (or uninstall the old Java). Ask your mentor if you are not sure.

### Step 10: An Expo account and the EAS CLI

EAS Build makes your release build in Expo's cloud, on the free plan.

1. Sign up for a free account at https://expo.dev/signup. Use your course email. You never add a card.
2. In Git Bash:

```bash
npm install -g eas-cli
eas --version
eas login
eas whoami
```

`eas whoami` prints your Expo user name. (Instead of a global install you can type `npx eas-cli@latest` in place of `eas` every time.)

[`release/README.md`](../release/README.md) has the build steps and the free-plan limits.

## When something goes wrong

| What you see | What to do |
|---|---|
| `npx: command not found` or `node: command not found` | Close every VS Code window and open it again. If it still fails, run the Node.js installer again |
| Expo Go: "Project is incompatible with this version of Expo Go" | Your project's SDK and Expo Go's differ. Update Expo Go, and check `expo` in `package.json` against `VERSIONS.md` |
| The QR code opens but loading never finishes | Different networks or a blocked Wi-Fi: use a hotspot, USB (`npx expo start --localhost`, then `a`) or `--tunnel` |
| A red error screen on the phone | Read the first lines: they name the file and the line. Fix it and save; the app reloads |
| `npm install` errors about peer dependencies | Use `npx expo install <package>`, which picks versions that fit SDK 58. `npx expo install --check` lists wrong ones |
| Strange errors after changing packages | Stop Expo (Ctrl+C) and run `npx expo start --clear` |
| Copying a project folder takes many minutes, or File Explorer says a file name is too long | `node_modules/` holds about 70,000 files, some with paths over 260 characters. Never copy or delete it with File Explorer. Copy a project without it, in Git Bash: `tar -C <from folder> --exclude=node_modules -cf - <project> \| tar -xf -`, then `npm install`. Delete it with `rm -rf node_modules` |
| A component test fails with "Exceeded timeout of 5000 ms" on the first run | The first `npx jest` after `npm install` compiles every file. Add `"testTimeout": 20000` to the `jest` block in `package.json` (the starters have it) |

## Sources (checked 24 November 2026)

- Expo: https://docs.expo.dev/get-started/create-a-project/, https://docs.expo.dev/more/expo-cli/, https://docs.expo.dev/workflow/web/, https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/
- EAS: https://docs.expo.dev/build/setup/ and https://expo.dev/pricing
- Android Platform-Tools: https://developer.android.com/tools/releases/platform-tools
- Node.js: https://nodejs.org/en/download
- Firebase CLI: https://firebase.google.com/docs/cli ; emulator requirements: https://firebase.google.com/docs/emulator-suite/install_and_configure
