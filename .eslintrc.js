module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'react-app',
    'google',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'object-curly-spacing': [2, 'always'],
    'indent': [2, 2],
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'linebreak-style': 'off',
    'operator-linebreak': ['error', 'after'],
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'always' }],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-closing-tag-location': ['error', 'always'],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  settings: {
    'react': {
      version: 'detect',
    },
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'paths': ['./src'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    },
  ],
  ignorePatterns: ['react-app-env.d.ts'],
};
