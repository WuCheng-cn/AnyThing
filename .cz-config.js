module.exports = {
  types: [
    {
      value: '✨ feat',
      name: '✨ feat:     新功能'
    },
    {
      value: ':bug: fix',
      name: '🐛 fix:      修复 bug'
    },
    {
      value: ':tada: init',
      name: '🎉 init:     初始化'
    },
    {
      value: ':memo: docs',
      name: '📝 docs:     文档变更'
    },
    {
      value: ':art: style',
      name: '🎨 style:    代码样式美化'
    },
    {
      value: ':recycle: refactor',
      name: '♻️  refactor: 重构'
    },
    {
      value: ':zap: perf',
      name: '⚡️ perf:     性能优化'
    },
    {
      value: ':white_check_mark: test',
      name: '✅ test:     测试'
    },
    {
      value: ':rewind: revert',
      name: '⏪️ revert:   回退'
    },
    {
      value: ':package: build',
      name: '📦️ build:    打包'
    },
    {
      value: ':rocket: chore',
      name: '🚀 chore:    构建/工程依赖/工具'
    },
    {
      value: ':construction_worker: ci',
      name: '👷 ci:       CI 相关变更'
    }
  ],
  scopes: [
    { name: "view" },
    { name: "desktop" },
    { name: "graph" },
    { name: "gis" },
    { name: "decorator" },
    { name: "dto" },
    { name: "entity" },
    { name: "enum" },
    { name: "helper" },
    { name: "http" },
    { name: "interface" },
    { name: "model" },
    { name: "service" },
    { name: "type" },
  ],
  messages: {
    type: '选择你的提交类型（必填）:',
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述,使用"|"换行(可选)：',
    footer: '关联关闭的issue，例如：#1, #2(可选);破坏性修改参照 BREAKING CHANGE: 变动的描述/理由/迁移方法:',
    confirmCommit: '确认要使用以上信息提交?'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['特性', '修复'],
  subjectLimit: 100
}
