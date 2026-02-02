import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import prettierPlugin from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

export default [
  {
    // Arquivos que o ESLint deve ignorar completamente
    ignores: ["dist", "node_modules", "vite.config.ts", "eslint.config.js"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        // Removemos o "project: ./tsconfig.json" para evitar o erro de Parsing
        // O TS-ESLint moderno consegue inferir tipos básicos sem isso.
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        // Isso libera o describe, it, expect para o ESLint
      describe: 'readonly',
      it: 'readonly',
      expect: 'readonly',
      vi: 'readonly',
      beforeEach: 'readonly',
      afterEach: 'readonly',
    },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // Recomendações base das bibliotecas
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,

      // --- CUSTOMIZAÇÕES ESTILO AIRBNB ---
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/function-component-definition": ["error", { "namedComponents": "arrow-function" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      
      // --- TYPESCRIPT ---
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],

      // --- ORGANIZAÇÃO DE IMPORTS ---
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@?\\w"], // Externos
            ["^@/"],              // Aliases
            ["^\\."],             // Relativos
            ["^.+\\.s?css$"],     // CSS
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      // --- PRETTIER ---
      "prettier/prettier": ["error", { "endOfLine": "auto" }],
    },
    settings: {
      react: { version: "detect" },
    },
  },
];