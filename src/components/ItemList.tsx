import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useItems } from "@/hooks/useItems";

import { colors, spacing } from "./theme";

export function ItemList({
  table,
  emptyText = "No items yet.",
}: {
  table: string;
  emptyText?: string;
}) {
  const { items, loading, error, reload } = useItems(table);

  if (loading)
    return <ActivityIndicator style={styles.status} color={colors.primary} />;

  if (error) {
    return (
      <View style={styles.status}>
        <Text style={styles.error}>{error}</Text>
        <Pressable onPress={reload} accessibilityRole="button">
          <Text style={styles.retry}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  if (items.length === 0)
    return <Text style={[styles.status, styles.muted]}>{emptyText}</Text>;

  return (
    <View>
      {items.map((item) => (
        <View key={String(item.id)} style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          {item.description ? (
            <Text style={styles.muted}>{item.description}</Text>
          ) : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  status: { marginVertical: spacing.md },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: spacing.sm,
  },
  title: { fontSize: 16, fontWeight: "600", color: colors.text },
  muted: { color: colors.muted, marginTop: 2 },
  error: { color: colors.error },
  retry: { color: colors.primary, fontWeight: "600", marginTop: spacing.sm },
});
