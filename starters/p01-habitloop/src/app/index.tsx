import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

// HabitLoop's home screen: today's habits. The layout is done; the data and
// the logic are yours.
//
// TODO(task 9): keep habits and check-ins in useState (start with three
// habits from createHabit), today = toDayKey(new Date()), render a HabitRow
// per habit, and show "<done> of <total> done today".
// TODO(task 10): replace the add button with a HabitForm
// (src/components/HabitForm.tsx) above the list, labelled Add; a long press on
// a row renames.
// TODO(task 11): delete with an Undo.
// TODO(task 20): load at start and save every change.
export default function Index() {
  const habits: { id: string; name: string }[] = [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today</Text>
      <Text style={styles.count}>0 of 0 done today</Text>
      <FlatList
        data={habits}
        keyExtractor={(h) => h.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        ListEmptyComponent={<Text style={styles.empty}>No habits yet</Text>}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add a habit"
        style={styles.add}
        disabled
      >
        <Text style={styles.addText}>+ Add habit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold" },
  count: { fontSize: 16, marginVertical: 8, color: "#444" },
  empty: { fontSize: 16, color: "#666", textAlign: "center", marginTop: 32 },
  add: {
    marginTop: 16,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#00796b",
  },
  addText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
