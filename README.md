# D-Base-Cli
基础项目脚手架

## NPM 地址
https://www.npmjs.com/package/d-base-cli

## 使用
```
npx @daphnis/d-base-cli create
```

## [依赖解释](./Docs/DEPENDENCIES.md)


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

## 构建
使用 typeScript 的构建能力

