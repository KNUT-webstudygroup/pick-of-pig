module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true 
  },
  extends: [
    'plugin:react-hooks/recommended',
    'airbnb',
    "airbnb-typescript",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs','vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@stylistic/eslint-plugin'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "linebreak-style":["error", "windows"],
  	"react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx",".ts", ".tsx"] }],
    "import/no-absolute-path" : "off"
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  
}