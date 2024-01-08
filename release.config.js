module.exports = {
  plugins: [
    ['@semantic-release/commit-analyzer', {preset: 'conventionalcommits'}],
    [
      '@semantic-release/release-notes-generator',
      {preset: 'conventionalcommits'},
    ],
    '@semantic-release/github',
    '@semantic-release/changelog',
    [
      '@semantic-release/exec',
      {prepareCmd: 'npx prettier --write CHANGELOG.md'},
    ],
    '@semantic-release/npm',
    '@semantic-release/git',
  ],
};
