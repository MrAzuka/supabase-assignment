import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text } from "react-native";

import { useAuth } from "@/context/AuthContext";

import { colors } from "./theme";

// Header button. On success the auth context clears the session and the
// Stack.Protected guard sends the user back to the sign-in screen.
export function SignOutButton() {
  const { signOut } = useAuth();
  const [busy, setBusy] = useState(false);

  async function handlePress() {
    setBusy(true);
    const { error } = await signOut();
    setBusy(false);
    if (error) Alert.alert("Sign out failed", error);
  }

  return (
    <Pressable onPress={handlePress} disabled={busy} accessibilityRole="button" hitSlop={8} style={styles.button}>
      {busy ? <ActivityIndicator color={colors.primary} /> : <Text style={styles.text}>Sign out</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { paddingHorizontal: 8, minWidth: 70, alignItems: "center" },
  text: { color: colors.primary, fontSize: 16, fontWeight: "600" },
});
