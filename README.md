# D-Base-Cli
基础项目脚手架

## 能力

- clone 新建的远端仓库，并在此基础上新建项目
- 单选安装 Dumi、单选安装 React、单选安装 TypeScript
- 多选安装各种规范化功能：changlog、eslint、stylelint、prettier、editorconfig、pushlint（push 时执行 commitlint、eslint、stylelint 检查）
- 一键发布脚本：交互式修改 npm 版本号、changelog、git push、git tag、build、npm publish
- 各选项之间有依赖关系，会根据用户的选择，灵活调整，比如：安装了 React 后会安装 Rollup

## 初始化成品
https://github.com/DaphnisLi/daphnis-base-cli-template

<img width="564" alt="image" src="https://github.com/DaphnisLi/D-Base-Cli/assets/67792799/28e13796-bcee-4c1d-b66e-fdce9ad14f99">

## 使用
```
npx @daphnis/d-base-cli create
```

## 技术栈
- typescript：本地 type 检查、tsc 构建
- commander：node 命令行工具、执行脚手架指定的命令、接收命令行参数
- inquirer：交互式命令行，收集用户的选择
- shelljs：在 node 执行 shell 命令，操作文件、输出提示信息等
- chalk：命令行文字颜色

## [依赖解释](./Docs/DEPENDENCIES.md)

## 未来规划
- 更新依赖版本
- 更新模版
- 固定依赖版本
- 支持 monorepo

## NPM 地址
https://www.npmjs.com/package/@daphnis/d-base-cli

## [踩坑总结](./Docs/ERRORSUMMARY.md)

## 本地调试
```
sudo -s
cd 到项目根目录
npm run build
npm link

在测试目录执行 d-base-cli create


卸载 link
npm unlink d-base-cli

每次改完代码都要 build, 因为 d-base-cli.js 中 import('../dist/index.js')
```

## 发布
```
npm run release
```
