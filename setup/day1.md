# Day 1: your first app on your phone with Expo Snack

On day 1 you install nothing on the laptop. You change a React Native app in **Expo Snack**, a free editor that runs in your browser, and open it on your own phone with **Expo Go**.
Tomorrow you install Git, and later in the week Node.js and a real project ([`windows.md`](windows.md)).

## Before you start (5 minutes)

Install **Expo Go** on your Android phone:

1. Open the **Google Play Store** app.
2. Search for `Expo Go`. Choose the app whose developer is **Expo**.
3. Tap **Install**, then **Open**. You may skip signing in.
4. Expo Go's home screen shows a **Scan QR code** button. That is all you need today.

If Google Play says Expo Go is not available for your phone, tell your mentor and use the **Web** preview today.
Put the phone on the **same Wi-Fi** as your laptop if you can; Snack also works over mobile data.

## Open Snack

**The course's Snack link: https://snack.expo.dev/?sdkVersion=58.0.0**

Use this link, not the plain snack.expo.dev address. Expo Go from Google Play runs **only SDK 58** (the version in [`VERSIONS.md`](../VERSIONS.md)), but on 24 November 2026 a new Snack still started on an older SDK. The `?sdkVersion=58.0.0` part makes the new Snack use SDK 58.

- Use Chrome or Edge on your laptop. If Snack asks you to sign in, create a free Expo account at https://expo.dev/signup (you need one for EAS in week 6 anyway). Never add a card.
- A new Snack opens with a small app in `App.js`: the code is on the left and a preview is on the right.

What you see: the editor, a preview on the right with tabs for **My Device**, **Android**, **iOS** and **Web**, and in the bar under the editor the **Expo SDK version** picker.

**Check the SDK first:** the picker in the bar under the editor must say **58.0.0**. If it shows another number, choose 58.0.0 there. If 58 is not in the list, use the **Web** preview today (it needs no phone) and open it on the phone tomorrow with your own Expo project ([`windows.md`](windows.md)).

## Open it on your phone

1. On the right, select **My Device**. Snack shows a QR code.
2. On the phone, open **Expo Go** and choose **Scan QR code**. Point the phone at the screen.
3. The app opens on your phone. Every time you save a change in Snack, the phone updates by itself.

If the phone shows an error about an incompatible SDK version, Expo Go and the Snack use different Expo SDKs:

- check the SDK picker under the editor says 58.0.0, and choose it if not, or
- update Expo Go from Google Play, or
- use the **Web** preview today and tell your mentor.

To leave the Snack on the phone, shake the phone (or press the floating Expo button) and choose **Go home**.

## What to change (day 1)

Your tasks give the exact steps. This is the map, so you can find each part:

| You want to change | Find this in the code | Try |
|---|---|---|
| The text on screen | the words between `<Text>` and `</Text>` | Your own name |
| The background colour | `backgroundColor:` inside `StyleSheet.create` | `'#E0F2F1'`, `'teal'`, `'orange'` |
| The text size | add `fontSize: 24` to a text style | `fontSize: 32` |
| A new line of text | add another `<Text>...</Text>` inside the `<View>` | A second line about you |
| A button | `import { Button } from 'react-native';`, then `<Button title="Tap me" onPress={() => alert('Hi!')} />` | Your own title |

After each change, watch the preview and your phone. If Snack shows a red error, read it: it names the file and the line. Check that every `<Tag>` has its `</Tag>`, and every `(`, `[` and `{` has a partner.

## Saving your work

To keep your code, either:

- copy all of `App.js` (Ctrl+A, Ctrl+C) and paste it into a file in your course repository on GitHub's website, as your task says (**Add file → Create new file**, then **Commit changes**), or
- sign in to Snack with a free Expo account and select **Save**. Your task still needs the code on GitHub.

## If Snack does not load or the phone cannot connect

- Refresh the page, or try another browser.
- A college network may block it: try your phone's hotspot for both the laptop and the phone.
- Use the **Web** tab on the right to see the app in the browser, and finish the phone step later with your mentor.

## Sources (checked 24 November 2026)

- Expo Snack: https://snack.expo.dev and https://docs.expo.dev/more/glossary-of-terms/
- Expo Go and SDK versions: https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/
