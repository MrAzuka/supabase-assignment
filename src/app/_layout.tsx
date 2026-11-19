import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "@/components/theme";
import { AuthProvider, useAuth } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { session, loading } = useAuth();

  // Splash screen while the saved session is restored on launch.
  if (loading) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.splashText}>Loading…</Text>
      </View>
    );
  }

  const isSignedIn = !!session;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Only reachable with a session */}
      <Stack.Protected guard={isSignedIn} redirectTo="/sign-in">
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      {/* Only reachable without a session */}
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

const styles = StyleSheet.create({
  splash: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background },
  splashText: { marginTop: spacing.md, color: colors.muted },
});
