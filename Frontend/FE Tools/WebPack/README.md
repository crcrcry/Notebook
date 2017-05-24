# Webpack
- 这是我学习 Webpack 时尝试写的 sample
- Babel 中的 sample 也是通过 webpack 打包的


## 一些使用与坑点
1. webpack-dev-server 的坑点，请查看样例中的 webpack.config.js 文件的注释。
2. webpack 只能打包 js 文件，对 json、css、less、es6的打包都需要对应引入loader。
2. loader的感叹号的作用在于使同一文件能够使用不同类型的loader。
3. 样式表的打包：
	1. css-loader 为了打包 .css 文件。
	2. style-loader 的目的是为了在 html 中以 style 的方式嵌入 css。
	3. 即：读取 css文件的 css-loader，再用 style-loader 把它插入到页面中。