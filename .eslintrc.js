module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'semi': [2, 'always'],
    'comma-dangle': [0, 'always-multiline'],
    'object-shorthand': ['error', 'methods'],
    'space-before-function-paren': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'keyword-spacing': ['error'],
    'quotes': ['warn', 'single', { 'allowTemplateLiterals': true }],
    'camelcase': 'warn',
    'curly': ['error', 'all'],
    'prefer-template': 'error',
    'linebreak-style': ['error', 'unix'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'import/extensions': [0, {
      'js': 'never',
      'vue': 'never',
      'yaml': 'never',
      'svg': 'always',
      'png': 'always'
    }],
    'import/no-unresolved': 0,
    'no-restricted-imports':  [ 'error',
      {
        patterns: [ '../*' ],
      }
    ],
    'vue/eqeqeq': ['error', 'always'],
    /* These rules are commonly broken in existing codebase and should perhaps be re-enabled at some point. */
    'no-unused-vars': ['warn', { 'args': 'none' }],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
