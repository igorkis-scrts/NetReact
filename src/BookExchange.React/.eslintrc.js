module.exports = {
  ignorePatterns: [".eslintrc.js"],
  env: {
    es6: true,
    browser: true,
    amd: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
      alias: {
        map: [
          ["app", "./src/app"],
          ["api", "./src/api"],
          ["config", "./src/config"],
          ["utils", "./src/utils"],
          ["hooks", "./src/hooks"],
          ["models", "./src/app/models"],
          ["shared", "./src/app/components/shared"],
          ["stores", "./src/app/stores"],
          ["Pages", "./src/app/components/Pages"]
        ],
        extensions: [".ts", ".js", ".jsx", ".json"],
      },
    },
    react: {
      version: "detect",
    },
  },
  plugins: ["react", "@typescript-eslint", "react-hooks", "import"],
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript"
  ],
  rules: {
    "import/extensions": "off",
    "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    "prefer-const": [
      "warn",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
    quotes: ["warn", "double"],
    "max-len": [
      "error",
      {
        code: 144,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreTrailingComments: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
      },
    ],
    "no-trailing-spaces": "warn",
    "semi-style": ["warn", "last"],
    "object-curly-spacing": ["warn", "always"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/jsx-wrap-multilines": [
      "warn",
      {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "parens-new-line",
        logical: "ignore",
        prop: "ignore",
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": [0],
    "@typescript-eslint/no-extra-semi": ["warn"],
    "@typescript-eslint/no-inferrable-types": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-non-null-assertion": "off"
  },
};
