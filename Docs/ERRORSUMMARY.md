# 踩坑总结
1、package.json 中的 bin 字段 会保存本脚手架的命令（软连接）, 当宿主环境执行的时候就可以直接执行 bin 文件夹下的命令

2、但如果是一个其他类型的工具包，比如 webpack，会在 npm install 的时候将 webpack 中的 bin 命令加入到宿主环境的 node_moudles/.bin 下，等到执行 npm run build 的时候会直接找到 node_moudles/.bin/webpack，此时其实就是执行的 webpack/bin/webpack.js

3、Permission denied 报错
  - 对某一个文件没有权限, 有两个[解决办法](https://zhuanlan.zhihu.com/p/95148639)
  - chmod a+x ./文件名  ———— 针对单一文件
  - sudo chmod -R 777 目录路径  ———— 针对整个目录
注意: 此方法在 git 看来是改变文件的表现, 但如果用 git 放弃修改, 那么权限会被去掉, 所以只能提交

4、ESM 是 ES6 的规范, 只能在浏览器使用, 在 Node 中并未实现此规范,
为什么此 Node 项目可以使用 ESM ? 因为在构建时会使用 typeScript 编译成 CJS, 在运行 cli 时就可以正常使用了
为什么配置 webpack 的时候要用 CJS ? 因为这取决于 npm 包的导出方式, 比如 webpack 都是用 CJS 导出的 API, 用的时候只能用 CJS 引入, 但目前大部分的 npm 包都支持了 ESM, 还有一点要注意, ESM 在构建的时候会被 webpack 处理成自动执行函数, 不能像 Rollup 那样直接构建出 ESM 的包

5、lint-staged 只是针对于本地暂存文件的校验, 也就是对应 git commit
