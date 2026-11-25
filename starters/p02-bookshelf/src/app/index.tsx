import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

// BookShelf's search screen. The layout is done; searching and showing the
// results are yours.
//
// TODO(task 7): call searchBooks on Search and show docs in the FlatList:
// title, first author and first publish year.
// TODO(task 8): move the request into useBookSearch (TanStack Query) and show
// the loading, error (with Retry) and "No books found" states.
// TODO(task 9): a tap opens book/[id].
// TODO(task 17): search as you type with a debounce.
// TODO(task 19): pull to refresh and load more as the user scrolls.
export default function Index() {
  const [query, setQuery] = useState("");
  const results: { key: string; title: string }[] = [];

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Title or author"
          accessibilityLabel="Search books"
          returnKeyType="search"
        />
        <Pressable accessibilityRole="button" style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>
      <FlatList
        data={results}
        keyExtractor={(d) => d.key}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        ListEmptyComponent={<Text style={styles.hint}>Search for a book to start</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  searchRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    minHeight: 48,
  },
  button: {
    backgroundColor: "#3949ab",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    minHeight: 48,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  hint: { color: "#555", fontSize: 16, textAlign: "center", marginTop: 32 },
});
