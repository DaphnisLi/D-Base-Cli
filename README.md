# daphnis-base-cli
基础项目脚手架

## 依赖解释

```js
"devDependencies": {
  "@types/node": "^18.6.1", // node.js 的类型定义包
  "typescript": "^4.7.4" // typescript
},
"dependencies": {
  "chalk": "^5.0.1", // 给终端文字添加样式
  "clear-console": "^1.1.0", // 清空命令行的当前界面，类似于浏览器控制台的 clear() 和 命令行下的 clear
  "commander": "^9.4.0", // 完整的 node.js 命令行解决方案
  "inquirer": "^9.0.2", // 通用交互式命令行用户界面，收集用户的选择
  "shelljs": "^0.8.5" // 在 node.js 中使用 unix shell 命令
}
```

## fs 相关文章
[文章链接](https://juejin.cn/post/6844903677782654983)

## comander 相关文章
[文章链接](https://juejin.cn/post/6844903586833711112)

## shelljs
[文档](https://github.com/shelljs/shelljs)

# 新建项目后和 git 远端仓库关联
git add .
git commit -m "仓库初始化"
git remote add origin url
git remote -v
git push origin master:master

# 本地调试
sudo -s
cd 到项目根目录
npm run build
npm link

卸载 link
npm unlink daphnis-base-cli

每次改完代码都要 build, 因为 daphnis-base-cli.js 中 import('../lib')

# 发布
1、git push
2、npm run changelog
3、修改 version
4、git push
5、sh publish.sh
