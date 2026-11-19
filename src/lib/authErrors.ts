// src/lib/authErrors.ts
import type { AuthError } from "@supabase/supabase-js";

// same text for unknown email and wrong password
export const GENERIC_SIGNIN_ERROR = "Wrong email or password.";

export function signinErrorMessage(error: AuthError): string {
  // fetch failed before reaching the server (offline, timeout)
  if (error.name === "AuthRetryableFetchError" || error.status === 0) {
    return "Can't reach the server. Check your connection and try again.";
  }
  if (error.status === 429) return "Too many attempts. Wait a minute and try again.";
  if (error.status && error.status >= 500) return "Something went wrong. Try again shortly.";
  return GENERIC_SIGNIN_ERROR;
}