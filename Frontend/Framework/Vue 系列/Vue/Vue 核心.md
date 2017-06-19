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
	- Vue 实例需要挂载到视图上才能发挥作用。
- Vue 实例的属性、方法和选项
	- 关系：属性和方法，很多都可以在实例选项中设置
	- 实例选项
		- 数据：
			- data：
				- 数据对象
			- props：
				- 父组件数据 props
			- propsData
			- computed：
				- 计算属性
			- methods：
				- 方法
			- watch：
				- 监听器
		- DOM：
			- el：
				- 实例挂载 DOM
			- template：
				- 替换挂载元素的字符串模板
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
			- filters：
				- 过滤器
			- components：
				- 可用组件的哈希表
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
				- 监听当前实例的自定义事件
			- vm.$once
				- 只监听一次
			- vm.$off
				- 移除事件监听器
			- vm.$emit
				- 触发事件
		- 生命周期
			- vm.$mount
				- 手动挂载 Vue 实例
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
	- 指令修饰符：以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。
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
			- 概述：跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
		- v-cloak
			- 概述：这个指令保持在元素上直到关联实例结束编译。
			- 作用：和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。
		- v-once
			- 概述：只渲染元素和组件一次。随后的重渲染将被视为静态内容并跳过，用于优化性能。
- 特殊属性：
	- key：
		- 目的：用于标记元素的独立性。
		- 原理：在 Virtual DOM 的 diff 算法中，如果没有 key，Vue 会尽可能减少动态元素、修复/再利用相同类型元素，然后再重新渲染；有 key，Vue 会根据 key 的映射变化对元素重排列，而不是简单地重新渲染。
		- 用途：
			- 结合 v-for 循环。
			- 强制替换元素、组件，而不是重复使用。
	- ref：
		- 概述：子组件索引
	- slot：
		- 概述：内容分发，slot 对应

## 2.3 全局配置与全局 API
- 全局配置
	- 概述：
		- Vue.config 是 Vue.js 的全局配置对象。
		- 可以在应用启动前，通过 Vue.config.xxx 进行全局配置。
		- 通常在入口文件 main.js 中进行配置工作。
	- 可配置项：
		- silent：
			- 是否取消日志与警告
		- optionMergeStrategies
			- 自定义合并策略的选项。
		- devtools：
			- 是否允许检查代码
		- errorHandler
			- 错误处理器
		- ignoredElements
			- 忽略自定义元素
		- keyCodes
			- v-on 自定义键位别名
		- performance
			- 在浏览器开发者模式中，启用对组件初始化、渲染和打补丁的性能追踪
		- productionTip
			- 生产提示生成
- 全局 API
	- Vue.extend
		- 使用基础 Vue 构造器，创建一个“子类”。
	- Vue.nextTick
		- 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
	- Vue.set
		- 设置对象的属性。
	- Vue.delete
		- 删除对象的属性。
	- Vue.directive
		- 注册或获取全局指令。
	- Vue.filter
		- 注册或获取全局过滤器。
	- Vue.component
		- 注册或获取全局组件。
	- Vue.use
		- 安装 Vue.js 插件。
	- Vue.mixin
		- 全局注册一个混合。
	- Vue.compile
		- 在 render 函数中编译模板字符串。

## 2.4 内置组件
- component
	- 渲染动态组件
- transition
- transition-group
- keep-alive
	- 缓存动态组件中不活动的组件实例
- slot
	- 内容分发插槽

## 2.5 一些功能的多种实现比较
- 计算属性 vs Methods
- 计算属性 vs Watched 属性
- v-if vs v-show
		
		
# 三、进阶
## 3.1 组件化
- 单个组件
	- 注册：
		- 概览：就类似于，将一个 Vue 实例挂载到一个自定义的 HTML 标签下。
		- 方式：全局注册、局部注册。
	- 动态组件：
		- 通过使用保留的 \<component> 元素，动态的绑定到它的 is 特性，来让多个组件使用同一挂载点，并动态切换。
		- 利用 \<keep-alive> 将切换出去的组件保存在缓存，避免重渲染。
	- 可复用组件：
		- Props 允许外部环境传递数据给组件
		- Events 允许组件触发外部环境的副作用
		- Slots 允许外部环境将额外的内容组合在组件中。
	- 异步组件：
		- 按需下载模块
- 父子组件：
	- 概览：props down, events up
	- props：
		- 单向数据流，父->子
		- props 验证
	- 自定义事件：
		- 子组件传递数据给父组件
		- 也可用于非父子组件通信，创建中央事件总线 bus 来转发，麻烦
	- .sync：
		- props 双向绑定，本质是一个语法糖，自动帮人们完成了 props 和自定义事件
	- 内容分发
		- 概述：父组件内容可能和子组件模板混合，需要合理安排。
		- 方式：子组件模板中的 \<slot> 插口接受父组件内容。 

		
		
		
		
		
		
		
		
		
		
		
		
