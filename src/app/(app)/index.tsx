import { ScrollView, StyleSheet, Text } from "react-native";

import { ItemList } from "@/components/ItemList";
import { colors, spacing } from "@/components/theme";
import { useAuth } from "@/context/AuthContext";
import { PROTECTED_TABLE } from "@/lib/tables";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Signed in as {user?.email}</Text>

      {/* Protected data: RLS only returns these rows to signed-in users */}
      <Text style={styles.sectionTitle}>Members-only data</Text>
      <ItemList table={PROTECTED_TABLE} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  title: { fontSize: 28, fontWeight: "700", color: colors.text },
  subtitle: { color: colors.muted, marginTop: spacing.xs },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: colors.text, marginTop: spacing.lg, marginBottom: spacing.sm },
});
