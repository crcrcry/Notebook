# Framework
## 零、框架的作用
- 满足开发者的需求

## 一、React and Vue
- 两种不尽相同又各具特点的著名框架的学习：
	- 单向数据绑定的 React
	- MVVM 的 Vue


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