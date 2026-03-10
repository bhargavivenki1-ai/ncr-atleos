/**
 * ESLint configuration for NCR ATLEOS ATM Backend Services
 */

module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: [
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    // Allow console.log in development
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    
    // Allow unused vars that start with underscore
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    
    // Allow function declarations to be used before they are defined
    'no-use-before-define': ['error', { functions: false }],
    
    // Allow async functions without await
    'require-await': 'off',
    
    // Allow dangling underscores in identifiers
    'no-underscore-dangle': 'off',
    
    // Allow param reassignment
    'no-param-reassign': 'off',
    
    // Allow nested ternary
    'no-nested-ternary': 'off',
    
    // Allow multiple classes per file
    'max-classes-per-file': 'off',
    
    // Line length
    'max-len': ['error', { code: 120, ignoreUrls: true, ignoreStrings: true }],
    
    // Allow object property shorthand
    'object-shorthand': 'off',
    
    // Allow function expressions
    'func-names': 'off',
    
    // Allow anonymous functions
    'prefer-arrow-callback': 'off',
    
    // Import rules
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    
    // Allow certain globals
    'no-restricted-globals': 'off',
    
    // Allow continue statements
    'no-continue': 'off',
    
    // Allow for...of loops
    'no-restricted-syntax': 'off',
    
    // Allow await in loops
    'no-await-in-loop': 'off'
  },
  
  // Override rules for test files
  overrides: [
    {
      files: ['**/*.test.js', '**/tests/**/*.js'],
      rules: {
        'no-console': 'off',
        'max-len': 'off'
      }
    }
  ]
};