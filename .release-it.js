module.exports = {
  "plugins": {
    "@release-it/conventional-changelog": {
      "infile": "CHANGELOG.md",
      "config": {
        "parserOpts": {
          "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"],
          "issuePrefixes": ["#"]
        },
        "writerOpts": {
          "transform": (commit) => {
            const type = commit.type;
            console.log(type);
            const emojiMap = {
              ":sparkles:": "✨",
              ":bug:": "🐛",
              ":memo:": "📝",
              ":art:": "🎨",
              ":recycle:": "♻️",
              ":zap:": "⚡️",
              ":white_check_mark:": "✅",
              ":rewind:": "⏪️",
              ":package:": "📦",
              ":rocket:": "🚀",
              ":construction_worker:": "👷"
            };
            const emoji = emojiMap[type.split(' ')[0]];
            return {
              ...commit,
              type: `${emoji} ${type.replace(/:[a-z]+:/, '')}`
            };
          }
        }
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