# Framework
## 零、框架的作用
- 满足开发者的需求

## 一、React and Vue
- 上手：
	- Vue 先易后难：
		- 语法简单，约束少，上手容易。
		- 模板即组件更好理解，分割了 UI 和业务逻辑。
		- 状态管理简单。但有坑，比如属性的添加和删除的检测，需要利用类似 set 的 API 解决。
		- 难以编写高阶组件。
	- React 先难后易。
		- 函数/类即为组件。
- 场景：
	- Vue 适合小而快的项目，Vue 官网测试结果，测试情况较快，Vue 压缩后的版本较小。
	- React 适合大型应用、全端应用。
- 生态：
	- React 生态的插件大多来源于社区，生态极为庞大。
	- 而 Vue 生态的 Vuex 和 Vue-router 都是由官方编写，社区维护的。



## 二、Rapid Deployment Tools
1. vue-cli
2. create-react-app

### 2.1 问题解决
#### 2.1.1 create-react-app 执行慢的解决方法：
- 在使用 create-react-app my-app 来创建一个新的React应用，在拉取各种资源时,往往会非常慢,一直卡在那：
	- fetchMetadata: sill mapToRegistry uri http://registry.npmjs.org/whatwg-fetch
- 可以看到资源还是使用了 npmjs.org，解决方法是换成淘宝的资源：

	```	
	$ npm config set registry https://registry.npm.taobao.org
	-- 配置后可通过下面方式来验证是否成功
	$ npm config get registry
	-- 或 npm info express
	```
	
### 2.2 尚未搞懂的点
1. vue-cli和create-react-app是如何做到让main.js和index.html关联起来的？（自己打包的话会生产bundle.js并在index.html中引入）