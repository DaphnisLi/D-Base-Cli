# daphnis-base-cli
基础项目脚手架

## NPM 地址
https://www.npmjs.com/package/daphnis-base-cli

## 使用
```
npx daphnis-base-cli newProject

```

## [依赖解释](./DEPENDENCIES.md)

## 关联 git 远端仓库
```
git add .
git commit -m "仓库初始化"
git remote add origin url
git remote -v
git push origin master:master
```
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
1、git push
2、npm run changelog
3、修改 version
4、git push
5、sh publish.sh
```
## 构建
使用 typeScript 的构建能力
