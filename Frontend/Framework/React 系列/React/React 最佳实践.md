# 一、UI and State
- 如何获取数据：
	- 在一个组件的 componentDidMount() 中发 ajax 请求
	- 如果是异步获取数据，则在 componentWillUnmount 中取消发送请求。
- 把数据放在哪里：
	- 组件树不是很复杂的小应用：所有的数据请求和管理都存放在唯一的一个根组件
	- 设置多个容器组件来负责数据请求和状态管理。
		- 展示性组件（Presentation Component）/ 无状态函数式组件
			- 关注视图，不关注数据的获取和改变
			- 一般有 DOM 和 CSS
			- 通过 props 获取数据和回调
			- 基本没有自己的状态，即使有，也是 UI 状态
		- 容器性组件（Container Component）
			- 关注如何运行工作，关注业务逻辑
			- 大都不含 DOM 标签，只含其他组件
			- 作为数据源维持许多状态，提供数据和行为给展示组件
		- 优点：
			- 分离 UI 和 App。
			- 展示组件更易复用。
	- 状态管理：Redux、Flux

# 二、一个标准组件的组织结构
- class definition
	- constructor（虽然 ES 2017 不需要使用构造函数了，但下面这些都是构造函数系列的东西）
		- basic data
			- state
			- propTypes and defaultProps
	   - event handler
	   - other class function
   - lifecycle events
   - getters
   - render


# 三、使用 PropTypes 和 defaultProps
- PropTypes 和 defaultProps 便于我们写出高度可复用的组件。
- React.PropTypes 主要用来验证组件接收到的 props 是否为正确的数据类型，如果不正确，console中就会出现对应的warning。出于性能方面的考虑，这个 API 只在开发环境下使用。
- 如果 props 是拥有复杂结构的对象，React.PropTypes.object 无法详细验证，怎么处理？
	- 比如：
	
		```
		{
			text: 'hello world',
		  	numbers: [5, 2, 7, 9],
		}
		```
	- 解决方式：shape() 和 arrayOf()
	
		```
		static propTypes = {
  			myObject: React.PropTypes.shape({
    			text: React.PropTypes.string,
    			numbers: React.PropTypes.arrayOf(React.PropTypes.number),
  			})
		}
		```

# 四、把计算和条件判断都交给 render() 方法
- 组件的 state 中不能出现 props，计算过程放置于 render()，比如：

	```
	// BAD:
	state = {
   		fullName: `${props.firstName} ${props.lastName}`
   	};
   	
   	render() {
   		var fullName = this.state.fullName;
	   	return (
	   		<div>
	        	<h2>{fullName}</h2>
	      	</div>
	  	);
	}
	
	// GOOD: 
	render () {
		var fullName = `${this.props.firstName} ${this.props.lastName}`;
	}
	
	// BEST:
	renderFullName () {
  		return `${this.props.firstName} ${this.props.lastName}`;
	}

	render () {
  		var fullName = this.renderFullName();
	}
	```
- 保持state的简洁，不要直接出现计算得来的state

	```
	// BAD:
	state = {
      listItems: [1, 2, 3, 4, 5, 6],
      itemsNum: this.state.listItems.length
    };
    ```
- 能用三元判断符，就不用If，直接放在render()里

# 五、如何动态处理 classNames
- 使用布尔值激活
- 一个 node package：<a href="https://github.com/JedWatson/classnames">classnames</a>

# 六、闭包
- 要避免向子组件传递新的闭包，example

	```
	<input
		type="text"
	  	placeholder="Your Name"
	  	
	  	// Bad
	  	onChange={(e) => { model.name = e.target.value }}
	  	// Good
	  	onChange={this.handleChange}
	/>
	```
- 原因：每次父组件渲染时，都会有一个新的函数被创建并传递给输入，浪费内存。

# 七、属性析构
- 拥有许多属性的组件要让每个属性都另起一行。
	
	```
	<input
		type="text"
	  	placeholder="Your Name"
		value={this.state.value}
	  	onChange={this.handleChange}
	/>
	```

# 八、函数式组件
- 定义：没有状态和方法的单纯的组件。
- example：

	```
	// declare propTypes
	const expandableFormRequiredProps = {
		onExpand: React.PropTypes.func.isRequired,
		expanded: React.PropTypes.bool
	}
	// component、props 解构赋值、defaultProps
	const ExpandableForm = ({ onExpand, expanded = false, children }) => (
		<form style={ expanded ? { height: 'auto' } : { height: 0 } }>
			{children}
		    <button onClick={onExpand}>Expand</button>
		</form>
	)
	
	// set propTypes
	ExpandableForm.propTypes = expandableFormRequiredProps;
	```