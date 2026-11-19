import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// TODO: replace with the session from the auth context (useAuth) once it exists.
// While the session is being restored, render a splash/loading screen instead of the Stack.
const isSignedIn = false;

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Only reachable with a session */}
        <Stack.Protected guard={isSignedIn}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>

        {/* Only reachable without a session */}
        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
