// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import jest from "eslint-plugin-jest";
import * as importPlugin from "eslint-plugin-import";

export default tseslint.config(
  {
    // Ignore specific directories
    ignores: ["node_modules", "build"],
  },
  {
    // Apply to TypeScript files in the src directory
    files: ["src/**/*.{ts,tsx}"],
  },
  {
    // Special settings for JavaScript files (CommonJS)
    files: ["src/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  // Recommended ESLint and TypeScript configs
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    // Language options for TypeScript
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["tests/**/*.js"],
    ...jest.configs["flat/recommended"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
      "jest/prefer-expect-assertions": "off",
    },
  },
  {
    // Include the import plugin
    plugins: {
      import: importPlugin,
    },
    // Custom rules
    rules: {
      "@typescript-eslint/no-unused-vars": "warn", // Changed to 'warn'
      "import/extensions": [
        "error",
        "always",
        {
          js: "always",
          ts: "always",
          jsx: "always",
          tsx: "always",
        },
      ],
    },
  },
);
