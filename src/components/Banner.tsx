import { StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "./theme";

// Error or success message shown above a form.
export function Banner({ message, type = "error" }: { message: string | null; type?: "error" | "success" }) {
  if (!message) return null;
  const isError = type === "error";
  return (
    <View
      style={[styles.box, { backgroundColor: isError ? colors.errorBackground : colors.successBackground }]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <Text style={{ color: isError ? colors.error : colors.success }}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderRadius: 8, padding: 12, marginBottom: spacing.md },
});
