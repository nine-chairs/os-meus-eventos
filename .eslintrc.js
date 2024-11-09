module.exports = {
  root: true,
  extends: ['prettier', '@react-native-community'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        'jsx-quotes': ['error', 'prefer-single'],
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/quotes': [
          'error',
          'single',
          {
            avoidEscape: true,
            allowTemplateLiterals: true,
          },
        ],
        semi: ['error', 'never'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'comma-dangle': ['error', 'only-multiline'],
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal'],
            pathGroups: [
              {
                pattern: 'react+(|-native)',
                group: 'external',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['react'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
        'react-hooks/exhaustive-deps': 'warn',
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            jsxSingleQuote: true,
            arrowParens: 'avoid',
            endOfLine: 'auto',
            semi: false,
          },
        ],
      },
    },
  ],
}
