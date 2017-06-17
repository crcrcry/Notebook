# 一、概览
## 1.1 DOM and BOM
1. DOM：Document Object Model，和 document 挂钩，html 对象树(dom 树)，一棵 html 元素的树。dom 可以操纵 html 中的元素。
2. BOM：Browser Object Model，和 windows 挂钩，控制浏览器的行为而出现的接口。
3. 总结：
	1. DOM 是为了操作文档出现的 API，document 是其的一个对象；
	2. BOM 是为了操作浏览器出现的 API，window 是其的一个对象。

## 1.2 MVVM 与双向绑定
![](http://image.beekka.com/blog/2015/bg2015020110.png)

- MVVM：
	-  ViewModel
		- 概述：前端的业务逻辑
		- ViewModel in Vue：
			- 管理 view 的 dom 对象，响应至 model
			- 将 model 发出的 directives 发送至 view
	- View：
		- 概述：前端视图、用户界面。
		- View in Vue：被 Vue 实例管理的 DOM 节点。
	- Model：
		- 概述：后端的数据保存。
		- Model in Vue：一个轻微改动过的原生 JavaScript 对象，数据。
- 双向绑定：
	- View 与 ViewModel 双向绑定

# 二、语法
## 2.1 Vue 实例
- 概述：
	- MVVM 中的 ViewModel，组织着前端业务逻辑。
	- 语法：new Vue() 声明实例，传入一个选项对象。
- Vue 实例的属性、方法和选项
	- 关系：属性和方法，很多都可以在实例选项中设置
	- 实例选项
		- 数据：
			- data：数据对象
			- props
			- propsData
			- computed：计算属性
			- methods
			- watch：监听器
		- DOM：
			- el
			- template
			- render
		- 生命周期钩子：
			- beforeCreate
			- created
			- beforeMount
			- mounted
			- beforeUpdate
			- updated
			- activated
			- deactivated
			- beforeDestroy
			- destroyed
		- 资源：
			- directives
			- filters：过滤器
			- components
		- 杂项：
			- parent
			- mixins
			- name
			- extends
			- delimiters
			- functional
	- 实例属性
		- vm.$data
		- vm.$el
		- vm.$options
		- vm.$parent
		- vm.$root
		- vm.$children
		- vm.$slots
		- vm.$scopedSlots
		- vm.$refs
		- vm.$isServer
	- 实例方法
		- 数据
			- vm.$watch
			- vm.$set
			- vm.$delete
		- 事件
			- vm.$on
			- vm.$once
			- vm.$off
			- vm.$emit
		- 生命周期
			- vm.$mount
			- vm.$forceUpdate
			- vm.$nextTick
			- vm.$destroy
- 生命周期图示

![](https://cn.vuejs.org/images/lifecycle.png)
		
		
## 2.2 Vue 模板
- 概述：
	- MVVM 中的 View，组织着前端的视图。
	- View 中的插值、指令都是为了和 ViewModel 进行相应的双向绑定，以实现相应功能。
- 插值
	- 作用：将 ViewModel 中的变量值（数据对象、计算属性、props...）拿到视图 View 中使用，此时会自动进行双向数据绑定。
	- 基本语法：
		- HTML 标签值：Mustache 语法，双大括号。支持 JavaScript 表达式，结果会解释为纯文本。
		- HTML 属性值：
			- 应使用 v-bind 指令和双引号。双引号内的内容会被解释为 JavaScript 表达式而不是字符串，欲添加字符串可以在双引号内添加单引号。
			- 直接使用 HTML 标签的属性，此时双引号表示字符串。
	- 计算属性：
		- 目的：一个数据延伸出多个相关数据的情况下，进行相关的插值。
		- 原理：
			- 依赖发生变化时才自动重新求值。
			- 也可以设置其 setter，使设置计算属性值时，依赖相应更新。
	- 过滤器：
		- 目的：进行文本的简单转换和格式化，复杂的数据变换不应该在此完成，应该使用计算属性等其他方式。
		- 语法：在插值中的 JavaScript 表达式的尾部，由“管道”符指示，可以通过多个管道符串联过滤器。
	- 缩写：
		- v-bind -> :
		- v-on -> @
- 指令：
	- 作用：当其表达式的值改变时相应地将某些行为应用到 DOM 上。
	- 指令列表：
		- v-text：
			- 概述：更新元素的 textContent，如果要部分更新，请使用 Mustache 插值。
		- v-html：
			- 概述：更新元素的 innerHTML，被插入的内容都会被当做 HTML，而不会作为 Vue 模板编译。也就是说，数据绑定会被忽略，同时也不能插入组件。
		- v-show：
			- 概述：显示与隐藏，实际是切换 display CSS 属性。但带有 v-show 的元素始终会被渲染并保留在 DOM 中。
		- v-if（v-else、v-else-if）：
			- 概述：
				- 条件渲染，切换过程中的确会适当的销毁和重建事件监听器、子组件等。
				- 惰性的，在条件第一次为 true 时才会开始渲染条件代码块。
		- v-for：
			- 概述：
				- 列表渲染，of、in 都可以用且都取到 value，不过 in 可以遍历对象属性。
				- 在自定义组件中，结合 props 进行循环渲染。
			- 注意：
				- 同一节点中，v-for 优先级高于 v-if。
				- 数组更新检测中，Vue 不能检测以下变动的数组，建议最好用 Array 下的相应 API 操作数组：
					- 当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue
					- 当你修改数组的长度时，例如： vm.items.length = newLength
		- v-on：
			- 概述：v-on 指令监听 DOM 事件，并做出相应行为。
			- 事件处理器：
				- 方法事件处理器：将事件与方法绑定，默认传递 event 对象。
				- 内联处理器方法：将事件与 JavaScript 内联语句绑定，若需要传递 event 对象可以用特殊变量 $event。
			- 修饰符：v-on. 调用修饰符
				- 事件修饰符
				- 按键修饰符
		- v-bind：
			- 概述：动态地绑定一个或多个属性，或一个组件 prop 到表达式。
		- v-model：
			- 概述：表单控件双向数据绑定，绑定的是 value 属性，会根据控件类型自动选取正确的方式更新元素。
			- 修饰符：v-model. 调用修饰符。
		- v-pre
		- v-cloak
		- v-once
			- 概述：只渲染元素和组件一次。随后的重渲染将被视为静态内容并跳过，用于优化性能。
	- 指令修饰符：以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。
- 特殊属性：
	- key：
		- 目的：用于标记元素的独立性。
		- 原理：在 Virtual DOM 的 diff 算法中，如果没有 key，Vue 会尽可能减少动态元素、修复/再利用相同类型元素，然后再重新渲染；有 key，Vue 会根据 key 的映射变化对元素重排列，而不是简单地重新渲染。
		- 用途：
			- 结合 v-for 循环。
			- 强制替换元素、组件，而不是重复使用。
	- ref
	- slot

## 2.3 全局配置与全局 API
- 全局配置
- 全局 API


## 2.4 一些功能的多种实现比较
- 计算属性 vs Methods
- 计算属性 vs Watched 属性
- v-if vs v-show
		
		
# 三、进阶
## 3.1 组件化
		
		
		
		
		
		
		
		
		
		
		
		
		
