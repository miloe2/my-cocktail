import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      react: pluginReact,
      "@typescript-eslint": tseslint,
      js: pluginJs,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...prettierConfig.rules,

      // Prettier 규칙
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          tabWidth: 2,  // Prettier와 일치하는 들여쓰기 설정
          useTabs: false,
        },
      ],
      "react/react-in-jsx-scope": "off", // React 17+에서는 필요하지 않음
      semi: ["error", "always"],
      indent: ["error", 2], // Eslint에서 2 스페이스 들여쓰기
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
