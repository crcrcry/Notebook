# 一、介绍
## 1.1 声明式渲染
1. {{ message }}

```
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```
2. v-bind:title="message"
3. v-if
4. v-for
5. v-on:click="reverseMessage"，绑定事件
6. v-model，表单输入和应用状态中做双向数据绑定

## 1.2 组件
```
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

<todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item>
```
- 子元素通过 props 接口实现了与父亲元素很好的解耦。我们现在可以在不影响到父应用的基础上，进一步为我们的 todo 组件改进更多复杂的模板和逻辑。
- 在一个大型应用中，为了使得开发过程可控，有必要将应用整体分割成一个个的组件。

# 二、Vue 实例
## 2.1 构造器
- 构造器： Vue 的根实例 

```
var vm = new Vue({
  // 选项
})
```
- 拓展构造器：可复用组件

```
var MyComponent = Vue.extend({
  // 扩展选项
})

// 所有的 MyComponent 实例都将以预定义的扩展选项被创建
var myComponentInstance = new MyComponent()
```
- 尽管可以命令式地创建扩展实例，不过在多数情况下建议将组件构造器注册为一个自定义元素，然后声明式地用在模板中。我们将在后面详细说明组件系统。现在你只需知道所有的 Vue.js 组件其实都是被扩展的 Vue 实例。

## 2.2 属性与方法
- 每个 Vue 实例都会代理其 data 对象里所有的属性：

```
var data = { a: 1 }
var vm = new Vue({
  data: data
})
vm.a === data.a // -> true
// 设置属性也会影响到原始数据
vm.a = 2
data.a // -> 2
// ... 反之亦然
data.a = 3
vm.a // -> 3
```
- 上例：data为对象，data.a为data中属性。
- 注意只有这些被代理的属性是响应的。如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。我们将在后面详细讨论响应系统。

- 除了 data 属性， Vue 实例暴露了一些有用的实例属性与方法。这些属性与方法都有前缀 $，以便与代理的 data 属性区分。例如：

```
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})
vm.$data === data // -> true
vm.$el === document.getElementById('example') // -> true
// $watch 是一个实例方法
vm.$watch('a', function (newVal, oldVal) {
  // 这个回调将在 `vm.a`  改变后调用
})
```
- 实例属性和方法的完整列表，可以查阅API

## 2.3 实例生命周期 
- 生命周期钩子，在实例生命周期的不同阶段调用，如created、mounted、updated、destroyed。
- 下图说明了实例的生命周期。你不需要立马弄明白所有的东西，不过以后它会有帮助。
![](https://cn.vuejs.org/images/lifecycle.png)

# 三、模板语法
## 3.1 插值
- 文本
	- 数据绑定最常见的形式就是使用 “Mustache” 语法（双大括号）的文本插值。
	- 通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。

```
<span>Message: {{ msg }}</span>
<span v-once>This will never change: {{ msg }}</span>
```

- 纯html
	- 双大括号会将数据解释为纯文本，而非 HTML 。输出HTML用 v-html 指令
	- 被插入的内容都会被当做 HTML —— 数据绑定会被忽略。
	- 站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容插值。

```
<div v-html="rawHtml"></div>
```

- 属性：v-bind 指令

```
<div v-bind:id="dynamicId"></div>
<button v-bind:disabled="someDynamicCondition">Button</button>
```

- JavaScript 表达式进行数据绑定，但每个绑定都只能包含单个表达式。

```
<!-- 下列绑定可以完成 -->
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div v-bind:id="'list-' + id"></div>

<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}
<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

## 3.2 指令
- 定义：指令（Directives）是带有 v- 前缀的特殊属性。指令属性的值预期是单一 JavaScript 表达式（除了 v-for ）。指令的职责就是当其表达式的值改变时相应地将某些行为应用到 DOM 上。
- 参数：一些指令能接受一个“参数”，在指令后以冒号指明。
- 修饰符：修饰符（Modifiers）是以半角句号 . 指明的特殊后缀，用于指出一个指定应该以特殊方式绑定。之后当我们更深入地了解 v-on 与 v-model时，会看到更多修饰符的使用。

```
<!-- .prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault(）-->
<form v-on:submit.prevent="onSubmit"></form>
```

## 3.3 过滤器
- Vue.js 允许你自定义过滤器，被用作一些常见的文本格式化。过滤器应该被添加在 mustache 插值的尾部，由“管道符”指示。
- 过滤器只能在 mustache 绑定和 v-bind 表达式中使用，因为过滤器设计目的就是用于文本转换。
- 过滤器函数总接受表达式的值作为第一个参数。
- 过滤器可以串联。
- 过滤器是 JavaScript 函数，因此可以接受参数

```
<!-- in mustaches -->
{{ message | capitalize }}

<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>

<!-- 过滤器串联 -->
{{ message | filterA | filterB }}

<!-- 过滤器函数 接收参数 -->
<!-- 这里，字符串 'message' 为第一个参数， 字符串 'arg1' 将传给过滤器作为第二个参数， arg2 表达式的值将被求值然后传给过滤器作为第三个参数 -->
{{ message | filterA('arg1', arg2) }}

//过滤器函数
new Vue({
  // ...
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
```

## 3.4 缩写
- 支持 v-bind 和 v-on 指令

```
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>

<!-- 完整语法 -->
<a v-on:click="doSomething"></a>
<!-- 缩写 -->
<a @click="doSomething"></a>
```

# 四、计算属性
## 4.1 基础例子
- 作用：模板清晰简单，解决复杂逻辑。反例：

```
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

- Vue 对象中的 computed 属性，可以像绑定普通属性一样在模板中绑定计算属性。

```
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```
```
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})
```

## 4.2 计算缓存 vs Methods
- 调用函数达到相同目标

```
<p>Reversed message: "{{ reverseMessage() }}"</p>
```

- 差别：
	- 计算属性基于它的依赖缓存。**计算属性只有在它的相关依赖发生改变时才会重新取值**。这就意味着只要 message 没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
	- 每当重新渲染的时候，method 调用总会执行函数。

## 4.3 计算属性 vs Watched Property
- Vue.js 提供了一个方法 $watch ，它用于观察 Vue 实例上的数据变动。当一些数据需要根据其它数据变化时， $watch 很诱人。

```
<div id="demo">{{ fullName }}</div>
```
```
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

- 计算属性

```
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

- 计算属性更好不是吗？

## 4.4 计算 setter
- 计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：
- 现在在运行 vm.fullName = 'John Doe' 时， setter 会被调用， vm.firstName 和 vm.lastName 也会被对应更新。

```
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

## 4.5 观察 Watchers
- Vue 提供一个更通用的方法通过 watch 选项，来响应数据的变化。当你想要在数据变化响应时，执行异步操作或开销较大的操作，这是很有用的。
- 使用 watch 选项允许我们执行异步操作（访问一个 API），限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这是计算属性无法做到的。
- example 见官方api。

# 五、Class 与 Style 绑定
## 5.1 绑定 HTML Class
- 在 v-bind 用于 class 和 style 时， Vue.js 专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组。也可以绑定在组件上。

```
<div class="static"
     v-bind:class="{ active: true, 'text-danger': false }">
</div>

<!-- 渲染为： -->
<div class="static active"></div>
```
```
<div v-bind:class="[activeClass, errorClass]">

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}

<!-- 渲染为: -->
<div class="active text-danger"></div>
```
```
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})

<my-component class="baz boo"></my-component>

<!-- 渲染为: -->
<p class="foo bar baz boo">Hi</p>
```

## 5.2 绑定内联样式 Style
- v-bind:style 的对象语法十分直观——看着非常像 CSS ，其实它是一个 JavaScript 对象。 CSS 属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）：

```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

data: {
  activeColor: 'red',
  fontSize: 30
}
```
```
<div v-bind:style="styleObject"></div>

data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```
```
<!-- v-bind:style 的数组语法可以将多个样式对象应用到一个元素上 -->
<div v-bind:style="[baseStyles, overridingStyles]">
```

# 六、条件渲染
## 6.1 v-if and v-show
```
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

- 有 key 和无 key , input复用

```
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

- v-show，简单的切换元素的 CSS 属性 display

```
<h1 v-show="ok">Hello!</h1>
```

## 6.2 v-if vs v-show
1. v-if 是真实的条件渲染，因为它会确保条件块在切换当中适当地销毁与重建条件块内的事件监听器和子组件。
2. v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——在条件第一次变为真时才开始局部编译（编译会被缓存起来）。
3. 相比之下， v-show 简单得多——元素始终被编译并保留，只是简单地基于 CSS 切换。
4. 一般来说， v-if 有更高的切换消耗而 v-show 有更高的初始渲染消耗。因此，如果需要频繁切换使用 v-show 较好，如果在运行时条件不大可能改变则使用 v-if 较好。

# 七、列表渲染
## 7.1 v-for
- v-for 指令根据一组数组的选项列表进行渲染。 v-for 指令需要以 item in items 形式的特殊语法， items 是源数据数组并且 item 是数组元素迭代的别名。
	- 基本用法
	- Template v-for
	- 对象迭代 v-for
	- 整数迭代 v-for
	- 组件和 v-for

```
<!-- 基本用法 -->
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>

var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

## 7.2 key
```
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

## 7.3 数组更新检测
- Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：
	- push()
	- pop()
	- set()：注意，Vue 不能检测数组直接赋值的更新
	- shift()
	- unshift()
	- splice()
	- sort()
	- reverse()

## 7.4 显示过滤 / 排序结果
```
<li v-for="n in evenNumbers">{{ n }}</li>

data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

# 八、事件处理器
## 8.1 事件处理
- v-on:event=“method”
- method也可以传递参数，包括传递特殊变量$event来访问原生DOM事件

```
var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // `this` 在方法里指当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      alert(event.target.tagName)
    }
  }
})

// 也可以用 JavaScript 直接调用方法
example2.greet() // -> 'Hello Vue.js!'
```

## 8.2 事件修饰符
- 在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在 methods 中轻松实现这点，但更好的方式是：methods 只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。
- 为了解决这个问题， Vue.js 为 v-on 提供了 事件修饰符。通过由点(.)表示的指令后缀来调用修饰符。
	- .stop
	- .prevent
	- .capture
	- .self
	- .once

```
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>

<!-- the click event will be triggered at most once -->
<a v-on:click.once="doThis"></a>
```

## 8.3 按键修饰符
- 在监听键盘事件时，我们经常需要监测常见的键值。 Vue 允许为 v-on 在监听键盘事件时添加按键修饰符：
	- .enter
	- .tab
	- .delete (捕获 “删除” 和 “退格” 键)
	- .esc
	- .space
	- .up
	- .down
	- .left
	- .right
	- .ctrl
	- .alt
	- .shift
	- .meta (mac “command” 键)
- 可以通过全局 config.keyCodes 对象自定义按键修饰符别名

```
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">

<!-- 同上 -->
<input v-on:keyup.enter="submit">

<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```
```
// 可以使用 v-on:keyup.f1
Vue.config.keyCodes.f1 = 112
```

# 九、表单控件绑定
## 9.1 基础用法
- 你可以用 v-model 指令在表单控件元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。它负责监听用户的输入事件以更新数据，并特别处理一些极端的例子。

```
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

## 9.2 绑定value
- 对于单选按钮，勾选框及选择列表选项， v-model 绑定的 value 通常是静态字符串（对于勾选框是逻辑值）。
- 但是有时我们想绑定 value 到 Vue 实例的一个动态属性上，这时可以用 v-bind 实现，并且这个属性的值可以不是字符串。

```
<input
  type="checkbox"
  v-model="toggle"
  v-bind:true-value="a"
  v-bind:false-value="b"
>

// 当选中时
vm.toggle === vm.a
// 当没有选中时
vm.toggle === vm.b
```

## 9.3 修饰符
- .lazy：在默认情况下， v-model 在 input 事件中同步输入框的值与数据 (除了 上述 IME 部分)，但你可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步。
- .number：如果想自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个修饰符 number 给 v-model 来处理输入值。
- .trim：如果要自动过滤用户输入的首尾空格，可以添加 trim 修饰符到 v-model 上过滤输入。

```
<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model.lazy="msg" >

<input v-model.number="age" type="number">

<input v-model.trim="msg">
```

## 9.4 v-model 与 组件
- 如果你还不熟悉Vue的组件，跳过这里即可
- HTML 内建的 input 类型有时不能满足你的需求。还好，Vue 的组件系统允许你创建一个具有自定义行为可复用的 input 类型，这些 input 类型甚至可以和 v-model 一起使用！要了解更多，请参阅API文档

# 十、组件
## 10.1 什么是组件
组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 js 特性扩展。

## 10.2 使用组件
### 10.2.1 全局注册
- 要注册一个全局组件，你可以使用 Vue.component(tagName, options)。 例如：

```
Vue.component('my-component', {
  // 选项
})
```

- 组件在注册之后，便可以在父实例的模块中以自定义元素 <my-component></my-component> 的形式使用。要确保在初始化根实例 之前 注册了组件：

```
<div id="example">
  <my-component></my-component>
</div>

// 注册
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})

// 创建根实例
new Vue({
  el: '#example'
})
```
```
// 渲染为：
<div id="example">
  <div>A custom component!</div>
</div>
```

### 10.2.2 局部注册
- 不必在全局注册每个组件。通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中可用：
- 这种封装也适用于其它可注册的 Vue 功能，如指令。

```
var Child = {
  template: '<div>A custom component!</div>'
}
new Vue({
  // ...
  components: {
    // <my-component> 将只在父模板可用
    'my-component': Child
  }
})
```

### 10.2.3 DOM 模版解析说明
- 当使用 DOM 作为模版时（例如，将 el 选项挂载到一个已存在的元素上）, 你会受到 HTML 的一些限制，因为 Vue 只有在浏览器解析和标准化 HTML 后才能获取模版内容。尤其像这些元素ul、ol、table、select限制了能被它包裹的元素， option只能出现在其它元素内部。
- 在自定义组件中使用这些受限制的元素时会导致一些问题，例如：

```
<table>
  <my-row>...</my-row>
</table>
```

- 自定义组件 <my-row> 被认为是无效的内容，因此在渲染的时候会导致错误。变通的方案是使用特殊的 is 属性：

```
<table>
  <tr is="my-row"></tr>
</table>
```

- 应当注意，如果您使用来自以下来源之一的字符串模板，这些限制将不适用：
	- \<script type="text/x-template">
	- JavaScript内联模版字符串
	- .vue 组件

### 10.2.4 data 必须是函数
- 使用组件时，大多数可以传入到 Vue 构造器中的选项可以在注册组件时使用，有一个例外： data 必须是函数。
- 错误做法如下，Vue 会在控制台发出警告，告诉你在组件中 data 必须是一个函数。

```
Vue.component('my-component', {
  template: '<span>{{ message }}</span>',
  data: {
    message: 'hello'
  }
})
```

- 正确做法如下

```
<div id="example-2">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
```
```
var data = { counter: 0 }
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // data 是一个函数，因此 Vue 不会警告，
  // 但是我们为每一个组件返回了同一个对象引用
  data: function () {
    return data
  }
})
new Vue({
  el: '#example-2'
})
```

### 10.2.5 构成组件
- 父子组件的关系可以总结为 props down, events up 。父组件通过 props 向下传递数据给子组件，子组件通过 events 给父组件发送消息。
![](https://cn.vuejs.org/images/props-events.png)

## 10.3 Prop
### 10.3.1 使用 Prop 传递数据
- prop 是父组件用来传递数据的一个自定义属性。子组件需要显式地用 props 选项声明 “prop”：

```
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 可以用在模板内
  // 同样也可以在 vm 实例中像 “this.message” 这样使用
  template: '<span>{{ message }}</span>'
})
```
```
<child message="hello!"></child>
```

### 10.3.2 camelCase vs. kebab-case
- HTML 特性不区分大小写。当使用非字符串模版时，prop的名字形式会从 camelCase 转为 kebab-case（短横线隔开）：
- 如果你使用字符串模版，不用在意这些限制。
	- 字符串模板：template: "" 
	- HTML模板：\<template>\<template/>

```
Vue.component('child', {
  // camelCase in JavaScript
  props: ['myMessage'],
  // 此时 template 选项设置模板采用了 HTML 模板
  template: '<span>{{ myMessage }}</span>'
})
```
```
<!-- kebab-case in HTML -->
<child my-message="hello!"></child>
```

### 10.3.3 动态 Prop
- 类似于用 v-bind 绑定 HTML 特性到一个表达式，也可以用 v-bind 动态绑定 props 的值到父组件的数据中。每当父组件的数据变化时，该变化也会传导给子组件：

```
<div>
  <input v-model="parentMsg">
  <br>
  <child v-bind:my-message="parentMsg"></child>
</div>
```

### 10.3.4 字面量语法 vs 动态语法
- 初学者常犯的一个错误是使用字面量语法传递数值：

```
<!-- 传递了一个字符串"1" -->
<comp some-prop="1"></comp>
```

- 因为它是一个字面 prop ，它的值以字符串 "1" 而不是以实际的数字传下去。如果想传递一个实际的 JavaScript 数字，需要使用 v-bind ，从而让它的值被当作 JavaScript 表达式计算：

```
<!-- 传递实际的数字 -->
<comp v-bind:some-prop="1"></comp>
```

### 10.3.5 单向数据流
- prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态。
- 每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop 。如果你这么做了，Vue 会在控制台给出警告。

### 10.3.6 Prop 验证
- 组件可以为 props 指定验证要求。如果未指定验证要求，Vue 会发出警告。当组件给其他人使用时这很有用。

```
Vue.component('example', {
  props: {
    // 基础类型检测 （`null` 意思是任何类型都可以）
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组／对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```

## 10.4 自定义事件
- 后面这些内容，暂时不考虑，开发不太用得到

## 10.5 使用 Slot 分发内容

## 10.6 动态组件

## 10.7 杂项










