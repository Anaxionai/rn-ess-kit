import { Pressable, StyleSheet, Text } from "react-native";

export type HabitRowProps = {
  name: string;
  done: boolean;
  onToggle: () => void;
};

/**
 * One habit in today's list.
 * TODO(task 9): make it a checkbox for screen readers
 * (accessibilityRole="checkbox", accessibilityState={{ checked: done }}),
 * show a tick and a different style when done, and call onToggle on press.
 * TODO(task 21): show the habit's current streak.
 */
export function HabitRow({ name }: HabitRowProps) {
  return (
    <Pressable style={styles.row}>
      <Text style={styles.name}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 18,
  },
});
