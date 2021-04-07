module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
    commonjs: true,
    jquery: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ['prettier'],
  extends: ['prettier'],
  overrides: [
    {
      files: ['lib/**'],
      rules: {
        'max-len': 'error',
      },
    },
    {
      files: ['benchmark/**', 'examples/**'],
      parserOptions: {
        ecmaVersion: 8,
      },
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['test/**'],
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
      },
      rules: {
        'handle-callback-err': 'warn',
        'no-shadow': 'off',
        'no-warning-comments': 'off',
      },
    },
  ],
  rules: {
    strict: 'off',
  },
};
