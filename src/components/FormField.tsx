import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { colors, spacing } from "./theme";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
} & Omit<TextInputProps, "value" | "onChangeText" | "onBlur">;

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={styles.field}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            value={value ?? ""}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor={colors.muted}
            accessibilityLabel={label}
            {...inputProps}
          />
          {error?.message ? (
            <Text style={styles.error}>{error.message}</Text>
          ) : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: spacing.md },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
  },
  inputError: { borderColor: colors.error },
  error: { color: colors.error, fontSize: 13, marginTop: spacing.xs },
});
