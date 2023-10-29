module.exports = {
  extends: ['plugin:cypress/recommended'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
};
