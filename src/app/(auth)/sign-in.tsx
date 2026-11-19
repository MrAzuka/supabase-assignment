import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

import { AuthScreen } from "@/components/AuthScreen";
import { Banner } from "@/components/Banner";
import { FormField } from "@/components/FormField";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors, spacing } from "@/components/theme";
import { signinErrorMessage } from "@/lib/authErrors";
import { supabase } from "@/lib/supabase";
import { signinSchema, type SigninFormData } from "@/schemas/signin";

export default function SignInScreen() {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setSubmitting(true);
    setFormError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setFormError(signinErrorMessage(error));
      // On success the auth context gets the new session and the root
      // layout's Stack.Protected guard sends the user to the home screen.
    } catch {
      setFormError("Can't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <AuthScreen title="Welcome back" subtitle="Sign in to your account">
      <Banner message={formError} />
      <FormField
        control={control}
        name="email"
        label="Email"
        placeholder="you@example.com"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        editable={!submitting}
      />
      <FormField
        control={control}
        name="password"
        label="Password"
        placeholder="Your password"
        secureTextEntry
        autoComplete="current-password"
        textContentType="password"
        editable={!submitting}
        onSubmitEditing={() => onSubmit()}
      />
      <PrimaryButton title="Sign in" onPress={onSubmit} loading={submitting} />
      <Link href="/sign-up" style={styles.link}>
        Don't have an account? Sign up
      </Link>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  link: { color: colors.primary, marginTop: spacing.lg, textAlign: "center" },
});
