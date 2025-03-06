module.exports = {
  "plugins": {
    "@release-it/conventional-changelog": {
      "infile": "CHANGELOG.md",
      "preset": {
        "config": "./changelog.config.js"
      }
    }
  },
  "git": {
    "commitMessage": ":rocket: chore(release): Release v${version}"
  },
  "github": {
    "release": true,
    "draft": false
  },
  "npm": {
    "publish": true
  }
};