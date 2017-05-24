# 一、排坑
## 1.1 vue-router
1. router-view 可以嵌套也可以并列，但实质上只是一个容器，而多组件最后组合起来成一个 web app，所以 router-link 和 router-view 不在一起也没关系，嵌套和并列关系对应好就好。
2. router 配置文件 index.js 中：
	1. path 和 component 对应，但 component 必须对应一个组件变量而不能是对象（不能乱加大括号）。但在 .vue 文件的 components 属性中，可以随便加括号
	2. 当 path 和 components 对应时，必须是多个并列 router-view 对应多个组件的情况，此时可以大括号。
	3. 区分 component 和 components。
	4. component{} 中写 “template：” 的组件可以渲染。

## 1.2 vue-cli
1. 由于 vue-cli 构建项目、webpack 打包，要注意映射，实际上内存会有 dist 目录装载编译后文件，而 /static/ 会映射进去，/src/assets/ 不会映射进去。

# 二、尚未理解