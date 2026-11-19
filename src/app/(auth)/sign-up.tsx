import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text } from "react-native";

import { AuthScreen } from "@/components/AuthScreen";
import { Banner } from "@/components/Banner";
import { FormField } from "@/components/FormField";
import { ItemList } from "@/components/ItemList";
import { PrimaryButton } from "@/components/PrimaryButton";
import { colors, spacing } from "@/components/theme";
import { signupErrorMessage } from "@/lib/signupErrors";
import { supabase } from "@/lib/supabase";
import { PUBLIC_TABLE } from "@/lib/tables";
import { signupSchema, type SignupFormData } from "@/schemas/signup";

export default function SignUpScreen() {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setSubmitting(true);
    setFormError(null);
    setNotice(null);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setFormError(signupErrorMessage(error));
      } else if (!data.session) {
        // Email confirmation is on in Supabase: no session until the link is clicked.
        reset();
        setNotice("Account created. Check your email to confirm it, then sign in.");
      }
      // With a session, the Stack.Protected guard redirects to the home screen.
    } catch {
      setFormError("Can't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <AuthScreen title="Create account" subtitle="Sign up with your email">
      <Banner message={formError} />
      <Banner message={notice} type="success" />
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
        placeholder="At least 8 characters, letters and numbers"
        secureTextEntry
        autoComplete="new-password"
        textContentType="newPassword"
        editable={!submitting}
      />
      <FormField
        control={control}
        name="confirmPassword"
        label="Confirm password"
        placeholder="Type your password again"
        secureTextEntry
        autoComplete="new-password"
        textContentType="newPassword"
        editable={!submitting}
        onSubmitEditing={() => onSubmit()}
      />
      <PrimaryButton title="Sign up" onPress={onSubmit} loading={submitting} />
      <Link href="/sign-in" style={styles.link}>
        Already have an account? Sign in
      </Link>

      {/* Public data: RLS allows anyone to read this table */}
      <Text style={styles.sectionTitle}>Public data</Text>
      <ItemList table={PUBLIC_TABLE} />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  link: { color: colors.primary, marginTop: spacing.lg, textAlign: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: colors.text, marginTop: spacing.lg * 1.5, marginBottom: spacing.sm },
});
