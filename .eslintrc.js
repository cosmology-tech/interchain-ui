const DISABLED = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
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
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
    "@typescript-eslint/camelcase": DISABLED,
    "@typescript-eslint/ban-ts-comment": DISABLED,
    "@typescript-eslint/interface-name-prefix": DISABLED,
    "@typescript-eslint/no-empty-interface": DISABLED,
    "@typescript-eslint/no-empty-function": DISABLED,
    "@typescript-eslint/no-var-requires": DISABLED,
    "@typescript-eslint/no-non-null-assertion": DISABLED,
    "react/prop-types": DISABLED,
    "react/prop": DISABLED,
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
  },
};
