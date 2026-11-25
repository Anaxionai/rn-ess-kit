// firebase/auth's default types come from its web build, which has no
// getReactNativePersistence. Metro loads the React Native build, which has it.
// Checked with firebase 13.4 and TypeScript 6.0.
import type { Persistence, ReactNativeAsyncStorage } from "firebase/auth";

declare module "firebase/auth" {
  export function getReactNativePersistence(storage: ReactNativeAsyncStorage): Persistence;
}
