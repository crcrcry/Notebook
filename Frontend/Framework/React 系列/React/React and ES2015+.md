# 一、状态机初始化
1. ES5 中的写法

	```
	getInitialState: function(){
		return {
			// code
		};
	}
	```

2. ES6 中的写法，ES6明确规定，Class内部只有静态方法，没有静态属性。

	```
	constructor(props) {
		super(props);
		this.state = {
			// code
		};
	}
	```

3. ES7 中的写法，类属性提案

	```
	constructor(props) {
		super(props);
	}
	
	state = {
		// code
	};
	```

# 二、Props 验证和默认 Props
1. ES5 中的写法

	```
	getDefaultProps: function() {
		return {
			title: 'Undefined Product',
	      	price: 100,
	      	initialQty: 0
	  	};
	}
	
	propTypes: {
		title: React.PropTypes.string.isRequired,
		price: React.PropTypes.number.isRequired,
		initialQty: React.PropTypes.number
	}
	```

2. ES6 中的写法，ES6明确规定，Class内部只有静态方法，没有静态属性。

	```
	// 写在类的外部
	CartItem.defaultProps = {
	    title: 'Undefined Product',
	    price: 100,
	    initialQty: 0
	}
	
	CartItem.propTypes = {
	    title: React.PropTypes.string.isRequired,
	    price: React.PropTypes.number.isRequired,
	    initialQty: React.PropTypes.number
	}
	```

3. ES7 中的写法，类属性提案

	```
	static defaultProps = {
		title: 'Undefined Product',
		price: 100,
		initialQty: 0
	};
	
	static propTypes = {
		title: React.PropTypes.string.isRequired,
		price: React.PropTypes.number.isRequired,
		initialQty: React.PropTypes.number
	};    
	```

## 3.自动绑定
	```
	// 函数定义
	increaseQty() {
		this.setState({qty: this.state.qty + 1}, this.recalculateTotal);
	}
	
	// ES 5
	onClick={this.increaseQty}
	
	// ES 6
	onClick={this.increaseQty.bind(this)}
	```
- 原因：
	- this.increaseQty 的 this 指向整个 React App。
	- this.setState 的 this 指向 increaseQty 的调用者。
	- 此处 increaseQty 的调用者为 undefined（不是 windows）。
- ES5：React.createClass() 所有的方法将会自动绑定对象的实例。
- ES6：React team通过 ES6 来实现对 React 组建的支持时，没有设置自动绑定是 React team 的一个决定。
	- 原因：
	- 解决方案：
		- 在调用函数时 bind，如样例。
		- 构造函数中定义和绑定。
		- 构造函数中使用箭头函数，
			- 箭头函数的特殊性之一：函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。即箭头函数会保留上下文。
		- 使用箭头函数和 ES7 的类属性。
		- 使用 ES7 的函数绑定。

## 4.Mixins
- 关于组件共用功能。
- 还没开始写。

## 5.JSPM 和 Webpack
- JavaScript Package Management
- 还没开始写。
