import { Stack } from "expo-router";

// Protected area. The header will show the user's email and the sign-out button.
export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}
