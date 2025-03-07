module.exports = {
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      parserOpts: {
        headerPattern: /^(:[a-z_]+:) (\w*)(?:\(([\w\$\.\-\* ]*)\))?\: (.*)$$/,
        headerCorrespondence: ['emoji', 'type', 'scope', 'scope', 'subject'],
        noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        issuePrefixes: ['#']
      },
      writerOpts: {
        transform: (commit, context) => {
          console.log('调试信息', commit) // 添加调试信息
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
          console.log('调试信息emoji', emoji,type,scope,subject) // 添加调试信息

          // 构建新的提交信息
          const newCommit = {
            ...commit,
            hash: commit.hash.substring(0, 7), // 限制哈希长度
            subject: `${emoji} ${type}${scope}: ${subject}`
          }

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
