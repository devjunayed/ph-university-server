import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from '@eslint/js'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
    },
  },
  {
    ignores: ['**/node-modules', '**/dist'],
  },
)
