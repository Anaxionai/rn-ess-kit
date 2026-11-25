import { Pressable, StyleSheet, Text, View } from "react-native";

// ShopList's home screen. The layout is done; Firebase, sign-in and the lists
// are yours.
//
// TODO(task 7): show "Connected to <projectId>" from app.options.projectId.
// TODO(task 8): sign-in (src/app/sign-in.tsx) and an AuthContext; show the
// user's email and a working Sign out.
// TODO(task 9): the user's lists, New list and Share; src/app/(app)/list/[id].tsx.
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ShopList</Text>
      <Text style={styles.status}>Not connected yet</Text>
      <Text style={styles.status}>Signed out</Text>
      <Text style={styles.empty}>No lists yet</Text>
      <Pressable accessibilityRole="button" style={styles.button} disabled>
        <Text style={styles.buttonText}>+ New list</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 8 },
  status: { fontSize: 14, color: "#555" },
  empty: { fontSize: 16, color: "#555", textAlign: "center", marginVertical: 32 },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#2e7d32",
    minHeight: 48,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
