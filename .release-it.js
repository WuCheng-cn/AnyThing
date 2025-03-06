const CzConfig = require('./.cz-config.js');

module.exports = {
  "plugins": {
    "@release-it/conventional-changelog": {
      "infile": "CHANGELOG.md",
      "preset": {
        "name": "conventionalcommits",
        "types": CzConfig.types.map(type => {
          return {
            "type": type.value,
            "section": type.name
          }
        })
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
}
