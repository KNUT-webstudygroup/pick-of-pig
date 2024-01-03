module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh','@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/jsx-filename-extension": [1, { "allow": "as-needed", "extensions": [".js", ".jsx", ".tsx", ".ts"] }],
    'linebreak-style': "off",
  }, 'jsx-runtime': {
    plugins: [
      'react'
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      jsxPragma: null // for @typescript/eslint-parser
    },
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/jsx-uses-react': 0
    }
  }
}
