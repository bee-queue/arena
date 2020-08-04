module.exports = {
  plugins: [
    ['@semantic-release/commit-analyzer', { preset: 'conventionalcommits' }],
    ['@semantic-release/release-notes-generator', { preset: 'conventionalcommits' }],
    '@semantic-release/github',
    '@semantic-release/npm',
    '@semantic-release/changelog',
    '@semantic-release/git',
  ],
};
