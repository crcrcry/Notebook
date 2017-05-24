# Babel
- 这是我学习 Babel 时尝试写的 sample


## Note
1. babel：一个js模块，es6转换器
1. .babelrc：babel配置文件，用于写babel的转码规则和插件，写好后还需要通过npm安装。然后才可以使用下面的babel工具和模块。
2. babel-cli
3. babel-node：支持es6的node环境
4. babel-register：改写了require命令，对require的文件实时转码
5. babel-core：babel核心模块代码，包含babel的api
6. babel-polyfill：用于转换es6的api（babel只转换es6的句法）
7. 浏览器环境：browser.js