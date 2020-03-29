module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  root: true,
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    project: 'tsconfig.json',
    sourceType: "module"
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    indent: ["error", 4],
    "import/prefer-default-export": 0,
    "import/no-unresolved": 0,
    "max-len": 0,
    "no-useless-constructor": 0,
    "new-cap": 0,
    "no-useless-catch": 0,
    "class-methods-use-this": 0,
  },
};
