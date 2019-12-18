module.exports = {
    parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends:  [
        'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'max-classes-per-file': 'off',
        'linebreak-style': 0,
        'no-var': 0,
    },
};