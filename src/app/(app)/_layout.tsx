import { Stack } from "expo-router";

import { SignOutButton } from "@/components/SignOutButton";
import { useAuth } from "@/context/AuthContext";

// Protected area: the header shows the signed-in user's email and a sign-out button.
export default function AppLayout() {
  const { user } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerTitle: user?.email ?? "Home",
        headerRight: () => <SignOutButton />,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
