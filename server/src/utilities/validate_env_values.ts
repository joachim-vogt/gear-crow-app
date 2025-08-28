// Fail-fast by validating presence of env values.
const validated_env = (var_value: string): string => {
  const value = process.env[var_value];
  if (!value) {
    console.error(`Missing env variable: ${var_value}`);
    process.exit(1);
  }
  return value;
};

export default validated_env;
