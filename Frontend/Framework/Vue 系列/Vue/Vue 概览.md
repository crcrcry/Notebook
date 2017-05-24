## 概览
### DOM and BOM
1. DOM：Document Object Model，和document挂钩，html对象树(dom树)，一棵html元素的树。dom可以操纵html中的元素。
2. BOM：Browser Object Model，和windows挂钩，控制浏览器的行为而出现的接口。
3. 总结：
	1. DOM 是为了操作文档出现的 API，document 是其的一个对象；
	2. BOM 是为了操作浏览器出现的 API，window 是其的一个对象。

### MVVM
1. ViewModel
	1. 管理view的dom对象，响应至model
	2. 将model发出的directives发送至view
2. View：被 Vue 实例管理的 DOM 节点。
3. Model：一个轻微改动过的原生 JavaScript 对象。

### Directives
1. 定义：带特殊前缀的 HTML 特性，可以让 Vue.js 对一个 DOM 元素做各种处理。
2. Mustache 风格绑定

### 过滤器
1. 定义：过滤器是用于在更新视图之前处理原始值的函数。它们通过一个 “管道” 在指令或绑定中进行处理
