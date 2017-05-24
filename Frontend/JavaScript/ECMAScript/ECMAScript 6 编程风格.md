# ES6 编程风格
1. 此为 Airbnb 的 JavaScript 风格规范，具体可参考 <a href="jscs.info">jscs.info</a>
2. 块级作用域
	- let 取代 var
	- const 优于 let
3. 字符串
	- 静态字符串用单引号或反引号，不使用双引号。
	- 动态字符串使用反引号
4. 解构赋值
5. 对象
	- 单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
	- 对象静态化：
		- 定义后不得添加新的属性
		- 添加属性不可避免的话，使用 Object.assign 方法
	- 如果对象的属性名是动态的，那么使用属性表达式定义
	- 简介表达式
5. 数组
	- 拓展运算符拷贝数组
	- Array.from 方法，将类似数组的对象转为数组。
6. 函数
	- 箭头函数（取代了 Function.prototype.bind），尽量使用箭头函数的场景：
		- 立即执行函数
		- 函数表达式
		- 简单的、单行的、少复用的函数
	- 函数体复杂、行数多的函数还是应该用传统函数写法
	- 配置项：应该集中在一个对象，放在最后一个函数，布尔值不可以直接作为参数。
	- rest 运算符：代替 arguments 变量。
	- 默认值
7. Map 结构
	- 注意区分 Object 和 Map：
		- 只有模拟现实世界的实体对象时，才使用 Object。
		- 如果只是需要 key: value的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。
8. Class
	- 使用 class 取代原型操作
	- 使用 extends 实现继承
9. 模块
	- import 取代 require。
	- export 取代 module.exports。
	- 关于 export default：
		- 模块只有一个输出值用 export default，多个输出值就不用 export default。
		- export default 和 export 不要同时使用
		- 如果默认输出函数，函数名首字母小写
		- 如果默认输出对象，对象名首字母大写
	- 不要在 import 中使用通配符 *，这样可以确保模块有一个默认输出。
10. ESLint
	- 用于语法规则和代码风格检查
