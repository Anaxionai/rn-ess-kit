# Set up your Android phone

You build and test on **your own Android phone**. This page turns on developer options and debugging, connects the phone to the laptop with a cable or over Wi-Fi, and fixes the usual problems.
It takes about 15 minutes. There are no iPhone steps: the course does not build for iOS.

Never post your phone's serial number, IMEI or phone number in `evidence.md` or anywhere else. The model name (for example "Moto g54") is enough.

## 1. Turn on developer options

1. Open **Settings → About phone**. On some phones it is **Settings → About phone → Software information**, or **Settings → System → About phone**.
2. Find **Build number** (Xiaomi and Redmi phones: **MIUI version** or **OS version**) and tap it **seven times**.
3. Enter your phone's PIN if it asks. You see **"You are now a developer!"**

**Developer options** now appear in Settings, usually under **System** or **Additional settings**.

## 2. Turn on USB debugging

1. Open **Developer options**.
2. Turn on **USB debugging** and confirm.
3. On Xiaomi, Redmi and POCO phones, also turn on **Install via USB** (it may ask you to sign in to a Mi account) and **USB debugging (Security settings)**.

## 3. Connect with a USB cable (always works)

1. Plug the phone into the laptop with a cable that carries data. Many cheap cables only charge.
2. On the phone, pull down the notification shade. If it says **Charging this device via USB**, tap it and choose **File transfer** (or **MTP**).
3. The phone asks **"Allow USB debugging?"** with the laptop's key fingerprint. Tick **Always allow from this computer** and tap **Allow**.
4. In Git Bash:

```bash
adb devices
```

You see:

```text
List of devices attached
R58N12ABCDE    device
```

The word **`device`** means it works. Then:

```bash
npx expo start --localhost
```

Expo Go normally connects over Wi-Fi with the QR code and needs no cable. When the Wi-Fi blocks it, plug in the cable, run the line above in your project folder, and press `a` in the Expo terminal: Expo forwards the port with adb and opens the app in Expo Go through the cable.

### When the phone is not found

| `adb devices` shows | What it means | What to do |
|---|---|---|
| Nothing under `List of devices attached` | Windows cannot see the phone | Try another cable and another USB port (not a hub). Choose **File transfer** on the phone. Install the driver (below) |
| `unauthorized` | You did not allow this laptop | Unlock the phone and tap **Allow** on the prompt. No prompt? In Developer options tap **Revoke USB debugging authorisations**, unplug, plug in again |
| `offline` | adb lost the connection | Run `adb kill-server`, then `adb devices`. Unplug and plug in again |
| `adb: command not found` | adb is not on your PATH | Go back to `setup/windows.md`, the adb step |

**The USB driver.** Many phones work on Windows 10 and 11 with no extra driver. If yours does not appear:

- **Google Pixel**: install the **Google USB Driver** (https://developer.android.com/studio/run/win-usb).
- **Samsung, Xiaomi, OnePlus, Motorola, Vivo, OPPO, realme and others**: install the maker's driver from the list at https://developer.android.com/studio/run/oem-usb. Restart the laptop after installing it.

## 4. Connect over Wi-Fi (Android 11 and newer)

Wireless debugging needs Android 11 (API level 30) or newer, and the phone and laptop on the **same Wi-Fi**. Many college and office networks block devices from seeing each other: then use a phone hotspot or the cable.

1. In **Developer options**, turn on **Wireless debugging** and confirm.
2. Tap the words **Wireless debugging** to open its page, then tap **Pair device with pairing code**. The phone shows a six-digit code and an address such as `192.168.1.23:37099`.
3. In Git Bash, pair with **that** address and type the code when asked:

```bash
adb pair 192.168.1.23:37099
```

4. Back on the Wireless debugging page, read the address under **IP address & Port** (the port is different from the pairing port), and connect:

```bash
adb connect 192.168.1.23:41235
adb devices
```

With Wi-Fi debugging on, `adb` works without a cable, for example to read logs with `adb logcat`. Expo Go itself only needs the QR code and the same Wi-Fi.

You pair once per laptop. The connection drops when the phone sleeps or changes network: run `adb connect` again with the new port.

## 5. The 8 GB laptop advice

Most course laptops have 8 GB of memory. On 8 GB:

- **Use your own phone, never the Android emulator.** Google's emulator page asks for 16 GB of memory and 16 GB of free disk; on 8 GB the emulator, the build and VS Code together make the laptop crawl.
- Close Android Studio, extra Chrome tabs and other apps while you build or run.
- Restart the laptop once a day in a heavy week; it frees memory that tools leave behind.
- Keep at least 10 GB of disk free.

**On a 16 GB laptop** the emulator is optional. Expo's Android emulator guide (https://docs.expo.dev/workflow/android-studio-emulator/) installs Android Studio and a virtual device. Press `a` in the Expo terminal to open the app in it. You still test the hard parts (notifications, the release) on a real phone.

No phone, or the phone will not connect today? Run the app in the browser (`npx expo start --web`) and tell your mentor. Most tasks can be finished on the web; the ones that need a real phone (notifications and the release) can use a phone the centre lends you.

## 6. When you finish for the day

- Turn **Wireless debugging** off when you leave a shared network.
- You can leave USB debugging on, but only allow laptops you trust. Revoke the authorisations if you used a shared laptop.

## Sources (checked 24 November 2026)

- Developer options: https://developer.android.com/studio/debug/dev-options
- adb and wireless debugging: https://developer.android.com/tools/adb
- USB drivers: https://developer.android.com/studio/run/oem-usb and https://developer.android.com/studio/run/win-usb
- Emulator requirements: https://developer.android.com/studio/run/emulator
