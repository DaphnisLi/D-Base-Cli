# daphnis-base-cli
基础项目脚手架

## NPM 地址
https://www.npmjs.com/package/daphnis-base-cli

## 使用
```
npx daphnis-base-cli create
```

## [依赖解释](./Docs/DEPENDENCIES.md)

## 本地调试
```
sudo -s
cd 到项目根目录
npm run build
npm link

卸载 link
npm unlink daphnis-base-cli

每次改完代码都要 build, 因为 daphnis-base-cli.js 中 import('../lib')
```

## 发布
```
npm run release
```

## 构建
使用 typeScript 的构建能力

