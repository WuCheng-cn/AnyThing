module.exports = {
  "plugins": {
    "@release-it/conventional-changelog": {
      "infile": "CHANGELOG.md",
      "preset": {
        "name": "conventionalcommits",
         types: [
          {
            type: ':sparkles: feat',
            section: '✨ feat:     新功能'
          },
          {
            type: ':bug: fix',
            section: '🐛 fix:      修复 bug'
          },
          {
            type: ':tada: init',
            section: '🎉 init:     初始化'
          },
          {
            type: ':memo: docs',
            section: '📝 docs:     文档变更'
          },
          {
            type: ':art: style',
            section: '🎨 style:    代码样式美化'
          },
          {
            type: ':recycle: refactor',
            section: '♻️  refactor: 重构'
          },
          {
            type: ':zap: perf',
            section: '⚡️ perf:     性能优化'
          },
          {
            type: ':white_check_mark: test',
            section: '✅ test:     测试'
          },
          {
            type: ':rewind: revert',
            section: '⏪️ revert:   回退'
          },
          {
            type: ':package: build',
            section: '📦️ build:    打包'
          },
          {
            type: ':rocket: chore',
            section: '🚀 chore:    构建/工程依赖/工具'
          },
          {
            type: ':construction_worker: ci',
            section: '👷 ci:       CI 相关变更'
          }
        ]
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
