/* eslint-disable */

module.exports = {
  root: true,
  // parser: 'babel-eslint',
  parserOptions: {
    "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  globals: {'plus': true, 'window': true, 'document': true, 'alert': true, 'new': true},
  env: {
    browser: true,
  },
  // eslint-disable-next-line
  extends: [
    // 'plugin:vue/recommended',
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
