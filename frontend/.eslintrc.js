module.exports = {
    parser: 'babel-eslint',
  
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
  
    env: {
      browser: true,
      node: true,
      es6: true,
      jest: true
    },
  
    extends: [
      './config/eslint/rules/best-practices',
      './config/eslint/rules/style',
      './config/eslint/rules/variables',
      './config/eslint/rules/react'
    ].map(require.resolve),
  
    plugins: ['react'],
  
    rules: {
      'no-console': 0
    }
  };
  