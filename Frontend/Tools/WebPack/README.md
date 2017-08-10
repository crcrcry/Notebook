# Webpack
- 这是我学习 Webpack 时尝试写的 sample
- Babel 中的 sample 也是通过 webpack 打包的

## 关于热启动模板的原理
- 实际上是开启了一个开发服务器，和客户端通过 websocket 协议连通。
- 当客户端文件修改时，开发服务器完成检测、编译、输出到内存的工作。
- 所以也可以自己写一个 express 服务器，调用 webpack node api 和 webpack 热启动中间件，并将根路径指向 index，即可热启动。
- nodemon 会自动监视启动目录下的所有相关文件，当文件变化时自动重新执行命令。
	- 假设存在 project/server/app.js
	- 在 project 目录下，nodemon server/app.js，就会监视 project 下的文件。
	- 在 server 目录下，nodemon app.js，就会监视 server 下的文件。

## 一些使用与坑点
1. webpack-dev-server 的坑点，请查看样例中的 webpack.config.js 文件的注释。
2. webpack 只能打包 js 文件，对 json、css、less、es6的打包都需要对应引入loader。
2. loader的感叹号的作用在于使同一文件能够使用不同类型的loader。
3. 样式表的打包：
	1. css-loader 为了打包 .css 文件。
	2. style-loader 的目的是为了在 html 中以 style 的方式嵌入 css。
	3. 即：读取 css文件的 css-loader，再用 style-loader 把它插入到页面中。