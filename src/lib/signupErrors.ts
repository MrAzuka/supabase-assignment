import type { AuthError } from "@supabase/supabase-js";

export function signupErrorMessage(error: AuthError): string {
  if (error.name === "AuthRetryableFetchError" || error.status === 0) {
    return "Can't reach the server. Check your connection and try again.";
  }
  if (error.code === "weak_password" || error.name === "AuthWeakPasswordError") {
    return "That password is too weak. Use a longer password with letters and numbers.";
  }
  if (error.code === "user_already_exists" || error.code === "email_exists") {
    return "An account with this email already exists. Try signing in.";
  }
  if (error.code === "email_address_invalid") return "That email address isn't accepted. Try another one.";
  if (error.status === 429) return "Too many attempts. Wait a minute and try again.";
  if (error.status && error.status >= 500) return "Something went wrong. Try again shortly.";
  return "Couldn't create your account. Try again.";
}
