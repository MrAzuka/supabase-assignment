import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

// Placeholder: the sign-in form (React Hook Form + signinSchema) goes here.
export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <Link href="/sign-up" style={styles.link}>
        Don't have an account? Sign up
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 24 },
  link: { color: "#2563eb", marginTop: 16 },
});
