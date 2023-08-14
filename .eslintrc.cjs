module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': 'error',
    'react/prop-types': 0,
    'no-unused-vars': ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    'react/jsx-uses-react': 2,
    'sort-keys': 'error',
    'import/no-unresolved': 0,
    'import/order': [2, { 'alphabetize': {'order': 'asc'}}],
  },
}
