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

## Permission denied 报错
  - 对某一个文件没有权限, 有两个[解决办法](https://zhuanlan.zhihu.com/p/95148639)
  - chmod a+x ./文件名  ———— 针对单一文件
  - sudo chmod -R 777 目录路径  ———— 针对整个目录
注意: 此方法在 git 看来是改变文件的表现, 但如果用 git 放弃修改, 那么权限会被去掉, 所以只能提交
