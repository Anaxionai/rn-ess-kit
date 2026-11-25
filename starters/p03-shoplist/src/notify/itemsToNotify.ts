import type { DocumentChange } from "firebase/firestore";

/**
 * The names of the items to notify about: changes of type "added", made by
 * someone else (addedBy is not myEmail), without pending writes, and never
 * from the first snapshot (the items that were already there).
 * TODO(task 18): write it, with tests in __tests__/itemsToNotify.test.ts.
 */
export function itemsToNotify(changes: DocumentChange[], myEmail: string, isFirstSnapshot: boolean): string[] {
  throw new Error("TODO(task 18): itemsToNotify");
}

// TODO(task 18): src/notify/setup.ts: setNotificationHandler, the Android
// channel `items`, then the permission request.
