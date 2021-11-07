module.exports = {
  plugins: [
    // '@typescript-eslint',
    'eslint-comments',
    'jest',
    'promise',
    'unicorn',
    'react-hooks'
  ],
  extends: [
    // 'airbnb-typescript/base',
    'plugin:jsx-a11y/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier'
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
    es6: true
  },
  rules: {
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/prefer-default-export': 'off',
    // 'import/no-default-export': 'error',
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    'react/jsx-filename-extension': 'off',
    // Use function hoisting to improve code readability
    'no-use-before-define': 'off',
    // Common abbreviations are known and readable
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/no-array-reduce': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'off',
      {
        additionalHooks: 'useRecoilCallback|useRecoilTransaction_UNSTABLE'
      }
    ]
  },
  ignorePatterns: ['.eslintrc.js', 'setupTests.js', 'reportWebVitals.js', '*.js'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
}
