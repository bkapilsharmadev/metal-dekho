// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["node_modules", "build", "dist"], // ✅ Ignore compiled files
  },
  {
    // ✅ Apply ESLint to TypeScript files
    files: ["src/**/*.{ts,tsx}"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json", // ✅ Enables type-aware linting
        tsconfigRootDir: import.meta.dirname, // ✅ Ensure ESLint finds tsconfig.json
      },
    },
    files: ["src/**/*.{ts,tsx}"], // ✅ Ensure rule applies to all TypeScript files
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    }
  }
);

