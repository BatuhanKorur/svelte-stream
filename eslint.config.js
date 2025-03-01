import globals from 'globals'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import svelte from 'eslint-plugin-svelte'
import tsParser from '@typescript-eslint/parser'
import stylistic from '@stylistic/eslint-plugin'
import svelteConfig from './frontend/svelte.config.js'

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  stylistic.configs.recommended,
  ...svelte.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        svelteConfig
      }
    }
  },
]
