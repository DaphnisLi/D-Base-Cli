# 踩坑总结
1、package.json 中的 bin 字段 会保存本脚手架的命令（软连接）, 当宿主环境执行的时候就可以直接执行 bin 文件夹下的命令
2、但如果是一个其他类型的工具包，比如 webpack，会在 npm install 的时候将 webpack 中的 bin 命令加入到宿主环境的 node_moudles/.bin 下，等到执行 npm run build 的时候会直接找到 node_moudles/.bin/webpack，此时其实就是执行的 webpack/bin/webpack.js
