# 一、Why React
1. 目的：使用 React 来建立数据总是改变的大型应用。
2. React 特性：
	1. 在数据改变时，自动管理 UI 的更新。
	2. UI 局部更新。
	3. 可复用组件。

# 二、显示数据
1. JSX 与 HTML 非常相似。
1. JS 表达式作属性值，放在大括号{}中。

# 三、动态交互式用户界面
## 3.1 自动绑定
在 JavaScript 里创建回调的时候，为了保证 this 的正确性，一般都需要显式地绑定方法到它的实例上。有了 React.createClass，所有方法被自动绑定到了它的组件实例上。

## 3.2 事件系统
- 概述：React 实际并没有把事件处理器绑定到具体的节点本身。而是采用事件代理的模式，即事件委托技术，在根节点上为每种事件添加唯一的 Listener，即 addEventListener。然后通过事件的 target 找到真实的触发事件的 DOM 节点。这样从触发元素到顶层节点之间的所有节点如果有绑定这个事件，React 都会触发对应的事件处理函数。这就是所谓的 React 模拟事件系统。
- 详细机制：
	1. 事件注册
		1. 将 React 合成事件转化为 DOM 标准事件。
		2. 源码中有一个转换关系：
			- registrationName：React 注册事件名称，如：onClick
			- registrationNameDependencies：React 事件和绑定在根节点的 topEvent 的转化关系，如：onClick -> topClick
			- topEventMapping：topEvent 事件名称转化为标准 DOM 事件名称的映射关系。如：topClick -> click
		3. 将事件、事件调度函数和挂载的节点绑定，并返回一个解绑的 remove 函数。同时处理了浏览器兼容。
	2. 事件存储
		- 概述：按照事件名和 React 组件对象进行了二维映射划分。
		- 实现：
			1. 将组件实例、React 注册事件名 registrationName、事件绑定函数传入函数 putListener。
			2. 根据组件实例生成唯一的 key，将绑定函数存入 listenerBank[registrationName][key]。
	3. 事件执行
		1. 执行根节点上 addEventListener 注册的回调，即 ReactEventListener.dispatchEvent，事件分发入口函数。
			1. 找到事件触发的 DOM 和 React Component。
			2. 执行回调前，先由当前组件遍历得到所有父组件数组。
			3. 从当前组件向父组件，依次执行注册的回调方法。
				1. 根据 topEvent 构造 React 合成事件，eg：
SyntheticMouseEvent。
				2. 批处理合成事件。
- 解决的问题：事件处理函数过多，事件重复绑定，形成重复函数，性能消耗大。eg：假设 list 有100项。

	```
	// 虽然你这么写了，但 React 仍旧事件委托，将 click 事件绑定到了根节点
	// 但你的确生产了 100 个几乎一样的函数存储在了 listenerBank，消耗了内存
	list.map((item,index) => {
    	<p onClick={() => this.clickHandler(item.name)} key={index}>{item}</p>
	})
	``` 
	
## 3.3 组件状态机
- React 把用户界面当成状态机，渲染不同组建的不同状态。state 更新时会自动重绘。
	- 哪些组件应该有 state：
		- 大部分组件的工作应该是从 props 里取数据并渲染出来。但是，有时需要对用户输入、服务器请求或者时间变化等作出响应，这时才需要使用 State。
		- 尝试把尽可能多的组件无状态化。这样做能隔离 state，把它放到最合理的地方，也能减少冗余并，同时易于解释程序运作过程。
		- 常用的模式是创建多个只负责渲染数据的无状态（stateless）组件，在它们的上层创建一个有状态（stateful）组件并把它的状态通过 props 传给子级。这个有状态的组件封装了所有用户的交互逻辑，而这些无状态组件则负责声明式地渲染数据。
	- 哪些应该作为 State，哪些不应该：
		- State 应该包括那些可能被组件的事件处理器改变并触发用户界面更新的数据，应该仅包括能表示用户界面状态所需的最少数据。
		- State 不应该包括计算所得的数据，把所有的计算都放到 render() 里更容易保证用户界面和数据的一致性。
		- State 不应该包括基于 props 的重复数据，尽可能使用 props 来作为惟一数据来源。把 props 保存到 state 的一个有效的场景是需要知道它以前值的时候。
- setState 更新机制：**批量更新策略 unfinished**
![](https://segmentfault.com/image?src=http://gtms01.alicdn.com/tps/i1/TB1ZiadKpXXXXXGaXXXXsca3pXX-1774-1374.png&objectId=1190000003969996&token=9a539dd1a90661dbe891b5f2d300290b)
- **Transaction unfinished**
	- 概念：一个所谓的 Transaction 就是将需要执行的 method 使用 wrapper 封装起来，再通过 Transaction 提供的 perform 方法执行。而在 perform 之前，先执行所有 wrapper 中的 initialize 方法；perform 完成之后（即 method 执行后）再执行所有的 close 方法。一组 initialize 及 close 方法称为一个 wrapper。

	```
	/*
	 * <pre>
	 *                       wrappers (injected at creation time)
	 *                                      +        +
	 *                                      |        |
	 *                    +-----------------|--------|--------------+
	 *                    |                 v        |              |
	 *                    |      +---------------+   |              |
	 *                    |   +--|    wrapper1   |---|----+         |
	 *                    |   |  +---------------+   v    |         |
	 *                    |   |          +-------------+  |         |
	 *                    |   |     +----|   wrapper2  |--------+   |
	 *                    |   |     |    +-------------+  |     |   |
	 *                    |   |     |                     |     |   |
	 *                    |   v     v                     v     v   | wrapper
	 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
	 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
	 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | +---+ +---+   +---------+   +---+ +---+ |
	 *                    |  initialize                    close    |
	 *                    +-----------------------------------------+
	 * </pre>
	 */
 	```
	

# 四、组件
## 4.1 复合组件
- 目的：关注组件的可组合性（composability）。
- 父级可以对获取子级信息：Parent 能通过专门的 this.props.children props 读取子级。this.props.children 是一个不透明的数据结构： 通过 React.Children 工具类来操作。
- 子级校正：校正就是每次 render 方法调用后 React 更新 DOM 的过程。 一般情况下，子级会根据它们被渲染的顺序来做校正。	

	```
	// 第一次渲染
	<Card>
	  <p>Paragraph 1</p>
	  <p>Paragraph 2</p>
	</Card>
	// 第二次渲染
	<Card>
	  <p>Paragraph 2</p>
	</Card>
	
	// React 先更新第一个子级的内容，然后删除最后一个组件。
	```
- 动态子级：父级给子级设置唯一标识 key。这样，在 React 校正带有 key 的子级时，会确保它们被重排序或者删除，这样就保证了子级校正的性能。注意：务必把 key 添加到子级数组里组件本身上，而不是每个子级内部最外层 HTML 上。
- 子组件状态管理：对于使用 this.state 来在多次渲染过程中里维持数据的状态化组件，不需要时直接删除存在很多问题。多数情况下，可以通过隐藏组件而不是删除它们来绕过这些问题。
- 数据流：React 里，数据通过 props 从拥有者流向归属者。这就是高效的单向数据绑定(one-way data binding)。
- 单向数据绑定：
	- 数据流是单向的，拥有者通过它的 props 或 state 计算出一些值，并把这些值绑定到它们拥有的组件的 props 上。因为这个过程会递归地调用，所以数据变化会自动在所有被使用的地方自动反映出来。
	- 由于数据流是单向的，所以
		- 状态可以直接更新视图。
		- 视图无法直接更新状态，只能通过事件等方式来更新状态。

## 4.2 可复用组件
- Prop 验证：为保证组件被正确的使用。引入 propTypes 和 React.PropTypes 进行验证，传入无效数据时控制台会抛出警告。
- 默认 Prop 值：通过 getDefaultProps 来设置，结果会被缓存。
- 单个子级：React.PropTypes.element 可以限定只能有一个子级传入，在 propTypes 的 children 属性设置。
- Mixins：一些复杂的组件间也需要共用一些功能。有时会被称为“跨切面关注点”。

# 五、传递 Props
- 大量未知 Props 需要传递时：
	1. ES2017新特性，利用解构赋值来提取属性，利用对象的拓展运算符“...”来传递。
	2. Underscore 库也可以实现相同效果	
	
# 六、表单组件
- 表单组件可以通过 onChange 回调函数来监听组件变化。
- 受限组件：设置了 value 的 \<input> 是一个受限组件。
	- 当 React 的表单已经设置值（value、checked、selected）后，用户在渲染出来的元素里输入任何值都不起作用。
	- 因为 React 每次重绘时，执行的都是已经设置了 value 值的代码。
	- 但改变输入框的值时，DOM 中的 value 属性是实时变化的。
	- 这也体现了 React 的单向数据绑定。不像 Angular 和 Vue 的双向数据绑定。
	- 如果想响应更新用户输入的值，就得使用 onChange 事件。
- 不受限组件：没有设置 value(或者设为 null) 的 \<input> 组件是一个不受限组件。
	- 对于不受限的 \<input> 组件，渲染出来的元素直接反应用户输入。
	- 如果想给组件设置一个非空的初始值且组件不受限，可以使用 defaultValue 属性。

# 七、浏览器中的工作原理
- Virtual DOM	
	- React 在内存中维护一个快速响应的 DOM 描述，即 Virtual DOM。Vitrual DOM 就是 components tree。
	- render() 方法返回一个 DOM 的描述，React 能够利用内存中的描述来快速地计算出差异，然后更新浏览器中的 DOM。
	- 多数时候你应该呆在 React 的“虚拟浏览器”世界里面，因为它性能更加好，并且容易思考。但是，也有时需要调用底层的API，React 也提供直接使用底层 DOM API 的途径。
	- 优点：React 能够等到事件循环的结尾, 而在之前完全不用操作真实的 DOM。在这基础上, React 计算出几乎最小的 diff, 以最小的步骤将 diff 作用到真实的 DOM 上。批量处理 DOM 操作和作用最少的 diff 极大的提高了性能。
- Refs 和 getDOMNode()
	- 每一个挂载的 React 组件有一个 getDOMNode() 方法，你可以调用这个方法来获取对该节点的引用。若组件未被挂载（也就是未被放进 DOM），会抛出一场。
	- 为了获取一个到 React 组件的引用，你可以使用 this 来得到当前的 React 组件，接着你可以通过设置的 refs 属性来指向一个你拥有的组件实例（ref也可以是回调函数），再调用 getDOMNode() 或 React.findDOMNode(this.refs.xxx) 直接访问组件的 DOM 节点。
- 组件生命周期
	- 生命周期的三个主要部分：
		- 挂载：组件被插入到 DOM 中。
		- 更新：组件被重新渲染，查明 DOM 是否应该刷新。
		- 移除：组件从 DOM 中移除。
	- React 提供生命周期的方法，来方便开发者对组件做相关操作。

# 八、插件
- React.addons，包含：
	- 动画
	- 双向绑定辅助工具
	- 类名操作工具
	- 组件克隆
	- 测试工具集
	- 不可变数据的辅助工具
	- 性能分析工具
- 使用时：
	- JS文件：react-with-addons.js 替换常规的React.js。
	- npm包：require('react/addons') 替换 require('react')。

	
# 九、高级性能
- 避免调和 DOM：即 React 尽可能少的更新和操作 DOM。
- shouldComponentUpdate：是 React 提供的组件生命周期功能，在重绘过程开始前触发，进行 Virtual DOM 比较。React 非常频繁调用该函数，所以执行必须快。
	- 组件不需更新
	- 组件需要更新，但是和 Virtual DOM 相等，不需调和 DOM
	- 组件需要更新，和 Virtual DOM 不相等，需要调和 DOM

	![](http://wiki.jikexueyuan.com/project/react/images/should-component-update.png)
- shouldComponentUpdate 的具体实现
	- 主要是追踪 props 和 state 的变化。
	- 难点在于引用类型。
	- 解决方案：利用到了 Facebook 开源库 Immutable-JS。	
	
# 十、Context

# 十一、Reference and Tips
- Reference 包括 API、组件的详细说明和生命周期、事件系统、标签和属性支持、DOM相关、调和等。
- Tips 部分提供了一些信息，来解答可能遇到的常见问题，也为了警告避免常见的错误。
- 建议对 React 研究的更深更底层时再来学习。
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
