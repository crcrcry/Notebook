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

## 1.3 vue
1. vue 中，只有自定义元素组件才可以监听子组件触发的自定义事件。普通元素只能监听原生 DOM 事件。
2. 自定义事件在子组件里写了，只有父组件中那个子组件标签监听该事件，才能收的到。也就是说，自定义事件是专门为自定义组件服务的。自定义组件搞自定义事件，原生 DOM 搞原生事件。

	```
	<!-- 这样是收不到 member 子组件里 emit 的 test 事件的，hh 函数不会调用 -->
	<div id="main" v-on:test="hh">
		<member></member>
	</div>
	
	<!-- 这样才行 -->
	<div id="main">
		<member v-on:test="hh"></member>
	</div>
	```

3. 亲测，自定义组件上，任何不是 props 的东西，都没有作用，除了自定义事件的监听。换句话说，除非 member 里触发了 test 事件，否则你再怎么点，也不能触发 hh 函数。

	```
	<member v-on:test="hh" @click="hh"></member>
	```

## 1.4 vue 库
1. 类似 React，对别人定义好的组件，只使用上面暴露出的 API，不要自己乱加指令、样式在上面。不起作用的。组件上面的东西都是 props 传递进去的数据或者是自定义事件。

# 二、尚未理解
1. Vue 中，自定义组件既然能监听内部触发的自定义事件，那大概也能监听内部手动触发然后冒泡 or emit 激发的原生事件吧？为何不能自己触发原生事件呢？为何不能将 eg 中的 @click="hh" 自动绑定到 member 里面的最高 div 上呢？涉及到原理了太复杂太复杂。

	```
	<member v-on:test="hh" @click="hh"></member>
	```