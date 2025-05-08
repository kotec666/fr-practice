import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintReact from "eslint-plugin-react";
import eslintReactHooks from "eslint-plugin-react-hooks";
import eslintReactRefresh from "eslint-plugin-react-refresh";
import prettierPlugin from "eslint-plugin-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// settings -> ESLint

const memoCallbackRule = {
  meta: {
    type: "problem",
    docs: {
      description: "Запрещает передачу немемоизированных функций в React.memo",
      recommended: "error",
    },
    messages: {
      missingUseCallback:
        "Функция, передаваемая в React.memo, должна быть обёрнута в useCallback",
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        const componentName = node.name?.name;

        // Предполагаем, что любой компонент с заглавной буквы может быть memo-компонентом
        if (!componentName || !/^[A-Z]/.test(componentName)) return;

        const sourceCode = context.getSourceCode();
        const scope = sourceCode.getScope(node);

        if (!scope) return;

        node.attributes.forEach((attr) => {
          if (
            attr.type === "JSXAttribute" &&
            attr.value?.type === "JSXExpressionContainer" &&
            attr.value.expression?.type === "Identifier"
          ) {
            const variableName = attr.value.expression.name;
            const propVariable = scope.variables.find(
              (v) => v.name === variableName,
            );

            if (!propVariable) return;

            const isFunction =
              propVariable.defs.length > 0 &&
              propVariable.defs[0].node.type === "VariableDeclarator" &&
              ["ArrowFunctionExpression", "FunctionExpression"].includes(
                propVariable.defs[0].node.init?.type,
              );

            if (!isFunction) return;

            const isMemoizedFunc = propVariable.defs.some(
              (def) =>
                def.node.init &&
                def.node.init.type === "CallExpression" &&
                def.node.init.callee?.name === "useCallback",
            );

            if (!isMemoizedFunc) {
              context.report({
                node: attr,
                messageId: "missingUseCallback",
              });
            }
          }
        });
      },
    };
  },
};

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: eslintReact,
      "react-hooks": eslintReactHooks,
      "react-refresh": eslintReactRefresh,
      prettier: prettierPlugin,
      custom: {
        rules: {
          "memo-callback": memoCallbackRule,
        },
      },
    },
  },
  js.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        project: ["tsconfig.json", "tsconfig.node.json"],
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "dist",
      "coverage",
      "eslint.config.js",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      ...eslintReactHooks.configs.recommended.rules,
      "prettier/prettier": [
        "off",
        {
          trailingComma: "none",
        },
      ],
      "prefer-const": "error",
      "react/jsx-curly-brace-presence": [
        "warn",
        { props: "never", children: "never" },
      ],
      "react/self-closing-comp": ["error", { component: true, html: true }],
      "max-lines": ["warn", { max: 450 }],
      "react-refresh/only-export-components": "off",
      "react/function-component-definition": "off",
      "max-params": ["error", 6],
      "custom/memo-callback": "error",
    },
  },
);
