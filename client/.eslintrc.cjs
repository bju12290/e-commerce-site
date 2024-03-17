module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    overrides: [
      {
        files: ['scripts/*.mjs'],
        env: {
          node: true, // Specifies that Node.js global variables should be expected
          browser: false, // Optionally, explicitly set browser environment to false for these files
          es2020: true, // Keep ES2020 support
        },
        // Since these files are for Node.js, you might not need TypeScript or React-specific configurations
        extends: [
          'eslint:recommended',
        ],
        // Redefine rules or extend them specifically for your scripts as needed
        rules: {},
      },
    ],
  },
}
