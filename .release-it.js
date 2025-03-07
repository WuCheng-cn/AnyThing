module.exports = {
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      preset: {
        name: 'conventionalcommits',
        types: [
          {
            type: 'feat',
            section: '✨ Features | 新功能'
          },
          {
            type: 'fix',
            section: '🐛 Bug Fixes | 修复 bug'
          },
          {
            type: 'init',
            section: '🎉 Init | 初始化'
          },
          {
            type: 'docs',
            section: '📝 Documentation | 文档变更'
          },
          {
            type: 'style',
            section: '🎨 Styles | 代码样式美化'
          },
          {
            type: 'refactor',
            section: '♻️ Code Refactoring | 重构'
          },
          {
            type: 'perf',
            section: '⚡️ Performance Improvements | 性能优化'
          },
          {
            type: 'test',
            section: '✅ Tests | 测试'
          },
          {
            type: 'revert',
            section: '⏪️ Reverts | 回退'
          },
          {
            type: 'build',
            section: '📦️ Builds | 打包'
          },
          {
            type: 'chore',
            section: '🚀 Chores | 构建/工程依赖/工具'
          },
          {
            type: 'ci',
            section: '👷 Continuous Integrations | CI 相关变更'
          }
        ]
      },
      parserOpts: {
        headerPattern: /^(?:[a-z_]+:) (\w*)(?:\(([\w\$\.\-\* ]*)\))?\: (.*)$$/,
        headerCorrespondence: ['emoji', 'type', 'scope', 'scope', 'subject'],
        noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        issuePrefixes: ['#']
      },
      writerOpts: {
        transform: (commit, context) => {
          const emojiMap = {
            ':sparkles:': '✨',
            ':bug:': '🐛',
            ':tada:': '🎉',
            ':memo:': '📝',
            ':art:': '🎨',
            ':recycle:': '♻️',
            ':zap:': '⚡️',
            ':white_check_mark:': '✅',
            ':rewind:': '⏪️',
            ':package:': '📦',
            ':rocket:': '🚀',
            ':construction_worker:': '👷'
          }

          const emoji = emojiMap[commit.emoji]
          const type = commit.type
          const scope = commit.scope ? `(${commit.scope})` : ''
          const subject = commit.subject

          // 构建新的提交信息
          const newCommit = {
            ...commit,
            // hash: commit.hash.substring(0, 7), // 限制哈希长度
            // subject: `${emoji} ${type}${scope}: ${subject}`
          }
          console.log('newCommit', newCommit)
          return newCommit
        },
        commitGroupsSort: 'title',
        commitsSort: ['scope', 'subject'],
        noteGroupsSort: 'title'
      }
    }
  },
  git: {
    commitMessage: ':rocket: chore(release): Release v${version}'
  },
  github: {
    release: true,
    draft: false
  },
  npm: {
    publish: true
  }
}
