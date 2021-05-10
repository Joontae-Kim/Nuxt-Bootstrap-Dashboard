module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-empty': 'error',
    'singleline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    quotes: ['off', 'single']
  }
}
