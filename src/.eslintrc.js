const DISABLED = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: "@typescript-eslint/parser",
  files: ["**/*.lite.tsx", "**/*.lite.ts"],
  // Specifies the ESLint parser
  plugins: ["@builder.io/mitosis"],
  extends: [
    "plugin:@builder.io/mitosis/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    // Allows for the parsing of modern ECMAScript features
    sourceType: "module",
    // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // Mitosis rules due to some limitations
    // Source: https://github.com/BuilderIO/mitosis/tree/main/packages/eslint-plugin/docs/rules
    "@builder.io/mitosis/no-unused-expressions": DISABLED,
    "@builder.io/mitosis/ref-no-current": ERROR,
    "@builder.io/mitosis/css-no-vars": ERROR,
    "@builder.io/mitosis/no-var-name-same-as-state-property": ERROR,
    "@builder.io/mitosis/jsx-callback-arg-name": ERROR,
    "@builder.io/mitosis/jsx-callback-arrow-function": ERROR,
    "@builder.io/mitosis/no-assign-props-to-state": ERROR,
    "@builder.io/mitosis/no-async-methods-on-state": ERROR,
    "@builder.io/mitosis/no-conditional-logic-in-component-render": ERROR,
    "@builder.io/mitosis/no-state-destructuring": ERROR,
    "@builder.io/mitosis/no-var-declaration-in-jsx": ERROR,
    "@builder.io/mitosis/no-var-declaration-or-assignment-in-component": ERROR,
    "@builder.io/mitosis/no-var-name-same-as-prop-name": ERROR,
    "@builder.io/mitosis/no-var-name-same-as-state-property": ERROR,
    "@builder.io/mitosis/only-default-function-and-imports": ERROR,
    "@builder.io/mitosis/prefer-show-over-ternary-operator": ERROR,
    "@builder.io/mitosis/use-state-var-declarator.": ERROR,
  },
};
