module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      // Allows for the parsing of JSX
      jsx: true
    }
  },
  ignorePatterns: [
    "cypress",
    "src/locales/**/*.js",
    "src/locales/**/en-US.po",
    "node_modules",
    "src/**/charting_library.*",
    "src/service-worker.ts",
    "src/serviceWorker/document.ts",
    "src/**/charting_library/**",
    "build",
    "dist",
    ".DS_Store",
    ".env.local",
    ".env.development.local",
    ".env.test.local",
    ".env.production.local",
    ".idea/",
    ".vscode/",
    "public",
    "package-lock.json",
    "yarn.lock"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended"
  ],
  plugins: ["better-styled-components", "unused-imports", "jsx-a11y", "lingui"],
  rules: {
    "unused-imports/no-unused-imports": process.env.NODE_ENV === "production" ? "error" : "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "prettier/prettier": [
      0,
      {
        endOfLine: "auto"
      }
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/camelcase": "off",
    "react/prop-types": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "no-duplicate-imports": "error",
    "react/react-in-jsx-scope": "off",
    "react/jsx-pascal-case": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_"
      }
    ],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",

    "lingui/no-unlocalized-strings": 0,
    "lingui/t-call-in-function": 2,
    "lingui/no-single-variables-to-translate": 2,
    "lingui/no-expression-in-message": 2,
    "lingui/no-single-tag-to-translate": 2,
    "lingui/no-trans-inside-trans": 2
  }
}
