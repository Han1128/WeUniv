'use strict';

module.exports = {

  types: [
    {
      value: 'WIP',
      name : 'WIP:功能开发阶段性提交'
    },
    {
      value: 'Feat',
      name : 'Feat:新功能提交'
    },
    {
      value: 'Fix',
      name : 'Fix:修复Bug'
    },
    {
      value: 'Refactor',
      name : 'Refactor:既不修复错误也不添加新功能的代码更改'
    },
    {
      value: 'Docs',
      name : 'Docs:只修改了文档相关的文件'
    },
    {
      value: 'Chore',
      name : 'Chore:构建过程或辅助工具的变动'
    },
    {
      value: 'Style',
      name : 'Style:代码风格、不影响代码功能的更改'
    },
    {
      value: 'Test',
      name: 'Test：增加测试'
    },
    {
      value: 'Merge',
      name : 'Merge:合并分支的提交'
    },
    {
      value: 'Build',
      name: 'Build:打包的提交'
    }
  ],

  scopes: [],
  allowCustomScopes: true,
  allowBreakingChanges: ["Feat", "Fix"]
};
