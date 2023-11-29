module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-empty': [1, 'always'],
    'type-empty': [1, 'always'],
  },
};
