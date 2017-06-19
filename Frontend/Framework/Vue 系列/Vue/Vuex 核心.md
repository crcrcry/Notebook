# 一、概述
## 1.1 是什么
- 状态管理：状态（state），分散在各个组件之中，集中式管理。
- Vuex：
	- 概述：专为 Vue.js 应用开发的状态管理模式。
	- 特点：
		- 状态是响应式的。
		- 状态不能直接改变，需要通过 commit mutations 来显式的提交。这样可以便于我们更明确地追踪状态的变化。

![](https://cn.vuejs.org/images/state.png)

## 1.2 为什么
- 当我们的应用遇到“多个组件共享同一个状态”时，会难以处理。

## 1.3 怎么办
- 将组件们共享的状态抽取出来，在全局进行统一管理。

# 二、语法
- 注：所说的状态都指 Vuex 中统一管理的共享状态，不包括每个组件的私有的状态。

## 2.1 state
- 读取状态：
	- 原理：根组件注入 store，每个子组件都可以获取 store 共享的状态。
	- 访问：this.$store.state 
	- 最佳实践：
		- 当需要的状态较少，可以直接通过计算属性的 get 和 set 操作。
		- 当需要较多状态时，通过 mapState 辅助函数生成计算属性。
		- 当需要上述二者混用时，使用拓展运算符 ...
- 状态管理：
	- Vuex 并不意味着所有的状态都应放入 Vuex store。这样会使代码变得冗杂。
	- 要区分单个组件的局部状态和多个组件的共享状态。

## 2.2 getters
- getters：
	- 概述：从 store 的 state 中派生出一些常用共享状态。
	- 访问：this.$store.getters
	- 函数参数：state 和 getters
	- 最佳实践：
		- mapGetters 辅助函数，将 store 中的 getters 映射到局部计算属性。

## 2.3 mutations
- mutations：
	- 概述：更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
	- 方式：Vuex 中的 mutations 非常类似于事件：
		- 每个 mutation 都有一个字符串的事件类型（type）和一个回调函数（handler）。
		- 回调函数会接受 state 作为第一个参数，额外参数即为载荷（payload），载荷通常是一个对象。
	- mutation 提交：
		- this.$store.commit
		- mapMutations 后调用组件方法
- 注意事项：
	- 在对象上添加新属性时，有两种方式：
		1. Vue.set
		2. 新对象替换老对象，拓展运算符 ...
	- 建议用常量替代 Mutation 事件类型，并单独放于 mutation-types.js 中。
	- mutation 必须是同步函数：
		- 原因：异步函数使 mutation 中的状态改变不可追踪。

## 2.4 actions
- actions：
	- 概述：
		- 类似 mutation，但 action 提交的是 mutation，而不是直接变更状态。
		- action 可以包含任意异步操作。
	- 方式：
		- 每个 action 也包含 type 和 handler。
		- action handler 函数接受一个与 store 实例具有相同方法和属性的 context 对象，也接受载荷（payload）。
		- 可以调用 context.commit 提交一个 mutation（或者通过解构赋值获取 commit）
	- 分发 action：
		- this.$store.dispatch 
		- mapActions 后调用组件方法
	- 组合 action：
		- 方式：通常的异步编程方式：Promise 和 async / await
		
		
## 2.5 modules
- 需求：应用非常复杂时，store 对象可能会非常臃肿。
- 概述：store 分割成模块，每个模块拥有自己的 state、getter、mutation、action 以及嵌套子模块。
- 模块：
	- 局部 store：
		- mutation 和 getter 接受的第一个参数是模块的局部状态对象。
		- action 的 context 暴露的是一个和局部 store 实例的具有相同方法和属性的对象。
		- 访问全局内容：
			- rootState 和 rootGetter 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。
			- 在全局命名空间下分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
			- example：

			```JavaScript
			modules: {
			  foo: {
			    namespaced: true,
			    getters: {
			      // 在这个模块的 getter 中，`getters` 被局部化了
			      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
			      someGetter (state, getters, rootState, rootGetters) {
			        getters.someOtherGetter // -> 'foo/someOtherGetter'
			        rootGetters.someOtherGetter // -> 'someOtherGetter'
			      },
			      someOtherGetter: state => { ... }
			    },
			    actions: {
			      // 在这个模块中， dispatch 和 commit 也被局部化了
			      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
			      someAction ({ dispatch, commit, getters, rootGetters }) {
			        getters.someGetter // -> 'foo/someGetter'
			        rootGetters.someGetter // -> 'someGetter'
			        dispatch('someOtherAction') // -> 'foo/someOtherAction'
			        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
			        commit('someMutation') // -> 'foo/someMutation'
			        commit('someMutation', null, { root: true }) // -> 'someMutation'
			      },
			      someOtherAction (ctx, payload) { ... }
			    }
			  }
			}
			```
			
	- 命名空间：
		- 需求：默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的。这样使得多个模块能够对同一 mutation 或 action 作出响应。
		- 方式：namespaced: true 的方式使其成为命名空间模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名，可以更好地了解嵌套关系。
		- example:

		```javascript
		const store = new Vuex.Store({
		  modules: {
		    account: {
		      namespaced: true,
		      // 模块内容（module assets）
		      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
		      getters: {
		        isAdmin () { ... } // -> getters['account/isAdmin']
		      },
		      actions: {
		        login () { ... } // -> dispatch('account/login')
		      },
		      mutations: {
		        login () { ... } // -> commit('account/login')
		      },
		      // 嵌套模块
		      modules: {
		        // 继承父模块的命名空间
		        myPage: {
		          state: { ... },
		          getters: {
		            profile () { ... } // -> getters['account/profile']
		          }
		        },
		        // 进一步嵌套命名空间
		        posts: {
		          namespaced: true,
		          state: { ... },
		          getters: {
		            popular () { ... } // -> getters['account/posts/popular']
		          }
		        }
		      }
		    }
		  }
		})
		```
	- 动态注册：
		- store.registerModule 
	- 重用：
		- 需求：
			- 创建多个 store，他们公用同一个模块
			- 在一个 store 中多次注册同一个模块 
		- 原因：
			- 使用一个纯对象来声明模块的状态，状态对象通过引用被共享，相互污染。
			- 类似 Vue 组件重用时会共用 data。
		- 方式：
			- 和 Vue 组件内的 data 是同样的问题。因此解决办法也是相同的，使用一个函数来声明模块状态
			- example：
				
			```
			const MyReusableModule = {
			  state () {
			    return {
			      foo: 'bar'
			    }
			  },
			  // mutation, action 和 getter 等等...
			}
			```
- 辅助函数使用：
	- **先略**



# 三、进阶
## 3.1 项目结构
```shell
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

## 3.2 插件
- 先略

## 3.3 严格模式
- 严格模式下，任何 mutation 处理函数以外修改 Vuex state 都会抛出错误。
- 不要在发布模式下使用严格模式，以避免性能损失。

## 3.4 表单处理
- 需求：
	- 方便的方式：v-model 直接修改 Vuex state
	- Vuex 的思维解决：\<input> 绑定 value -> 监听 change 事件 -> 分发 action 或者提交 mutation。
- 解决方式：
	- 计算属性的 setter 中分发 action 或者提交 mutation。

## 3.5 测试
- 先略

## 3.6 热重载
- 先略

# 四、API
- Vuex.Store 构造器选项
	- state
		- 类型：Object
	- mutations
		- 类型：{ [type: string]: Function }
	- actions
		- 类型：{ [type: string]: Function }
	- getters
		- 类型：{ [type: string]: Function }
	- modules
		- 类型：Object
	- plugins
		- 概述：store 上的插件
		- 类型：Array<Function>
	- strict
		- 概述：严格模式
		- 类型：Boolean
- Vuex.Store 实例
	- 属性：
		- state：Object，只读
		- getters：Object，只读
	- 方法：
		- commit(type: string, payload?: any) | commit(mutation: Object)
		- dispatch(type: string, payload?: any) | dispatch(action: Object)
		- replaceState(state: Object)
		- watch(getter: Function, cb: Function, options?: Object)
		- subscribe(handler: Function)
		- registerModule(path: string | Array<string>, module: Module)
		- unregisterModule(path: string | Array<string>)
		- hotUpdate(newOptions: Object)
- 辅助函数：
	- mapState(map: Array<string> | Object): Object <br>
	  批量创建组件的计算属性返回 Vuex store 中的状态。
	- mapGetters(map: Array<string> | Object): Object <br>
	  创建组件的计算属性返回 Vuex 中的 getter。
	- mapMutations(map: Array<string> | Object): Object <br>
	  创建组件方法，映射到 commit 方法，来提交 mutation。
	- mapActions(map: Array<string> | Object): Object <br>
	  创建组件方法，映射到 dispatch 方法，来分发 action。 
