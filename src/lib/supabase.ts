import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

// Added a check in case env variables are missing
if (!supabaseUrl || !supabasePublishableKey) {
  const missing = [
    !supabaseUrl && "EXPO_PUBLIC_SUPABASE_URL",
    !supabasePublishableKey && "EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  ].filter(Boolean);

  throw new Error(
    `Add Supabase env var(s): ${missing.join(", ")} to the .env file`
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);