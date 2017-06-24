module.exports = {
    devtool: 'eval-source-map',

    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/public",    //path：用来存放打包后文件的输出目录 
        publicPath: "/assets/",         //publicPath：指定资源文件引用的目录 
        filename: "bundle.js"
    },

    module: {
        loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'   //感叹号的作用在于使同一文件能够使用不同类型的loader
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
		]
    },

    // gg，直接在指令中用 webpack-dev-server 吧
    // webpack-dev-server 的编译输出文件会缓存于内存中，会默认放在 “/”
    // 所以 index.html 中引用的 bundle.js 实际输出在 localhost:2345/bundle.js
    // 引用的是 localhost:2345/assets/bundle.js
    // 而不是引用的本地的
    // webpack 指令直接打包，会输出到本地
    
    // 另外 .json 中不能加注释
    
    // devServer: {
    //     contentBase: "./public", //本地服务器所加载的页面所在的目录
    //     colors: true, //终端中输出结果为彩色
    //     historyApiFallback: true, //不跳转
    //     inline: true, //实时刷新
    //     port: 2345
    // }
}