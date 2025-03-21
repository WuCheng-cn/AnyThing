export default  {
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      header: '# CHANGELOG | 变更日志',
      preset: { name: 'conventionalcommits' },
      parserOpts: {
        headerPattern: /^(\p{Emoji_Presentation}|:[a-z]+:) (\w+)(?:\(([\w-]+)\))?: (.+)$/u,
        headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
        noteKeywords: ['BREAKING CHANGE']
      },
      writerOpts: {
        transform: (commit) => {
          // Emoji与类型映射表
          const typeEmojiMap = {
            fix: '🐛',
            feat: '✨',
            chore: '🚀',
            docs: '📝',
            style: '🎨',
            refactor: '♻️',
            perf: '⚡️',
            test: '✅',
            build: '📦️',
            ci: '👷',
            revert: '⏪️',
            init: '🎉',
          }
          // 提交类型与标题映射表
          const typesTitleMap = {
            feat: '✨ Features | 新功能',
            fix: '🐛 Bug Fixes | 修复 bug',
            init: '🎉 Init | 初始化',
            docs: '📝 Documentation | 文档变更',
            style: '🎨 Styles | 代码样式美化',
            refactor: '♻️ Code Refactoring | 重构',
            perf: '⚡️ Performance Improvements | 性能优化',
            test: '✅ Tests | 测试',
            revert: '⏪️ Reverts | 回退',
            build: '📦️ Builds | 打包',
            chore: '🚀 Chores | 构建/工程依赖/工具',
            ci: '👷 Continuous Integrations | CI 相关变更'
          }
          // 标准化处理
          if (typeEmojiMap[commit.type]) {
            return {
              ...commit,
              emoji: typeEmojiMap[commit.type],
              header: `${typeEmojiMap[commit.type]} ${commit.type}${
                commit.scope ? `(${commit.scope})` : ''
              }: ${commit.subject} ([${commit.shortHash}](${commit.host}/${
                commit.repository
              }/commit/${commit.hash}))`,
              shortHash: commit.hash?.substring(0, 7) || '',
              type: typesTitleMap[commit.type]
            }
          }
          return null
        },
        groupBy: 'type',
        commitGroupsSort: 'title',
        commitsSort: ['scope', 'subject'],
        filter: (commit) => {
          // 只保留有emoji映射的提交类型（早期有一些非标准的提交类型）
          return !!commit.emoji
        }
      }
    }
  },
  git: {
    commitMessage: '🚀 chore(release): Release v${version}'
  }
}
