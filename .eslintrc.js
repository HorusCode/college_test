module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "import/extensions":['error','always', {
      js: 'never',
      jsx: 'never',
      vue: 'never',
    }],
    "no-underscore-dangle": 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: {
        mocha: true,
      },
    },
  ],
};
