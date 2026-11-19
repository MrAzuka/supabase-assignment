import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

// Placeholder: the sign-up form and the public-read data list go here.
export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Link href="/sign-in" style={styles.link}>
        Already have an account? Sign in
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 24 },
  link: { color: "#2563eb", marginTop: 16 },
});
