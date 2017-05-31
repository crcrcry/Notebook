# 一、引子
- 相信大家在使用 React 的过程中都写过这样的代码

	```
	listView = list.map((item,index) => {
		return (
			<p onClick={this.handleClick.bind(this, item.id)} key={index}>{item.text}</p>
		);
	})
	```
- 这时，不知道你有没有想到一种情况：假如 list 有 10000 项会怎么样啊？
	- 天哪，我生产了一万个几乎一模一样的函数？
	- 是的。
	- 天哪，我操作了一万次 DOM？
	- 哦，那倒是没有。
- 众所周知
	- DOM 是一个独立于语言的文档接口 API。在浏览器中，该 API 是用 JavaScript 实现的。但浏览器通常把DOM 和 JavaScript 分开实现。所以每次 JavaScript 访问 DOM 都会伴随着巨大的开销。
	- bind() 会创建一个绑定了作用域的函数实例。于是，内存中存储了几乎一样的函数的一万个拷贝，这是一种巨大的浪费。
- 该怎么解决这一类问题呢？如何不用 bind 还向事件绑定函数传递参数呢？React 到底是怎么实现这些的呢？本文就用于解决这些问题。

# 二、React 事件系统介绍
- React 自己实现了一套高效的事件注册、存储、分发和重用的逻辑，在 DOM 事件体系基础上做了很大改进。不仅减少了内存消耗，最大化解决了 IE 等浏览器的不兼容问题，而且简化了事件逻辑，对开发者来说非常友好。它有如下的特点：
	- 使用事件委托技术进行事件代理，React 组件上声明的事件最终都转化为 DOM 原生事件，绑定到了 document 这个 DOM 节点上。从而减少了内存开销。
	- 自身实现了一套事件冒泡机制，以队列形式，从触发事件的组件向父组件回溯，调用在 JSX 中绑定的 callback。因此我们也没法用 event.stopPropagation() 来停止事件传播，应该使用 React 定义的 event.preventDefault()。
	- React 有一套自己的合成事件 SyntheticEvent，而不是单纯的使用 DOM 原生事件，但二者可以平滑转化。
	- React 使用对象池来管理合成事件对象的创建和销毁，这样减少了垃圾的生成和新对象内存的分配，大大提高了性能。
- 这些是如何实现的呢，通过源码来分析。

# 三、React 事件系统源码分析
- 当我们在 JSX 中写下 onClick={this.handleClick.bind(this, item.id)}，我们即声明了一个 React 事件。那这个事件是如何被注册到 React 事件系统中的呢？
- 根据 React 的特点，我们容易知道，这个事件被绑定到了 document 的节点上。实际上，在 React 中，一个事件声明之后，会在 document 节点相应 addEventListener 并在一个二维数组 listenerBank 中保存相应的事件回调。

## 3.1 事件注册
- 事件注册即在 document 节点，将 React 事件转化为 DOM 原生事件，并注册回调。

```
// enqueuePutListener 负责事件注册。
// inst：注册事件的 React 组件实例
// registrationName：React 事件，如：onClick、onChange
// listener：和事件绑定的 React 回调方法，如：handleClick、handleChange
// transaction：React 事务流，不懂没关系，不太影响对事件系统的理解

function enqueuePutListener(inst, registrationName, listener, transaction) {
	// 前面太长，省略一部分
	doc 为找到的 document 节点
  	var doc = isDocumentFragment ? containerInfo._node : containerInfo._ownerDocument;
  	// 事件注册
  	listenTo(registrationName, doc);
  	// 事件存储，之后会讲到，即存储事件回调方法
  	transaction.getReactMountReady().enqueue(putListener, {
  		inst: inst,
    	registrationName: registrationName,
    	listener: listener
  	});
}
```
- 来看事件注册的具体代码，如何在 document 上绑定 DOM 原生事件。

```
// 事件注册
// registrationName：React 事件名，如：onClick、onChange
// contentDocumentHandle：要将事件绑定到的 DOM 节点

listenTo: function (registrationName, contentDocumentHandle) {
	// document
	var mountAt = contentDocumentHandle;	  
  	// React 事件和绑定在根节点的 topEvent 的转化关系，如：onClick -> topClick
  	var dependencies = EventPluginRegistry.registrationNameDependencies[registrationName];
  	
  	for (var i = 0; i < dependencies.length; i++){
  		// 内部有大量判断浏览器兼容等的步骤，提取一下核心代码
  		var dependency = dependencies[i];
  		
  		// topEvent 和原生 DOM 事件的转化关系
  		if (topEventMapping.hasOwnProperty(dependency)) {
  			// 三个参数为 topEvent、原生 DOM Event、Document
  			// 将事件绑定到冒泡阶段
  			trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
		}
  	}
}
```
- 来看将事件绑定到冒泡阶段的具体代码

```
// 三个参数为 topEvent、原生 DOM Event、Document（挂载节点）
trapBubbledEvent: function (topLevelType, handlerBaseName, element) {
	if (!element) {
		return null;
	}
	return EventListener.listen(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
}

// 三个参数为 Document（挂载节点）、原生 DOM Event、事件绑定函数
listen: function listen(target, eventType, callback) {
	// 去除浏览器兼容部分，留下核心后
	target.addEventListener(eventType, callback, false);
	// 返回一个解绑的函数
	return {
		remove: function remove() {
      		target.removeEventListener(eventType, callback, false);
      	}
   	}
}
```
- 在 listen 方法中，我们终于发现了熟悉的 addEventListener 这个原生事件注册方法。只有 document 节点才会调用这个方法，故仅仅只有 document 节点上才有 DOM 事件。这大大简化了 DOM 事件逻辑，也节约了内存。

## 3.2 事件存储
- 事件注册之后，还需要将事件绑定的回调函数存储下来。这样，在触发事件后才能去寻找相应回调来触发。在一开始的代码中，我们已经看到，是使用 putListener 方法来进行事件回调存储。

```
// inst：注册事件的 React 组件实例
// registrationName：React 事件，如：onClick、onChange
// listener：和事件绑定的 React 回调方法，如：handleClick、handleChange

putListener: function (inst, registrationName, listener) {
	// 核心代码如下
	
	// 生成每个组件实例唯一的标识符 key
	var key = getDictionaryKey(inst);
	// 获取某种 React 事件在回调存储银行中的对象
	var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
	bankForRegistrationName[key] = listener;
}
```
- 也就是说，listenerBank 是一个 React 事件和 React 组件的二维映射集合，通过访问 listenerBank[事件名][组件key]，就可以得到对应的绑定回调函数。

## 3.3 事件执行
- 贴代码太累了，就讲讲理论好了。
- 每次触发事件都会执行根节点上 addEventListener 注册的回调，也就是 ReactEventListener.dispatchEvent 方法，事件分发入口函数。该函数的主要业务逻辑如下：
	- 找到事件触发的 DOM 和 React Component
	- 从该 React Component，调用 findParent 方法，遍历得到所有父组件，存在数组中。
	- 从该组件直到最后一个父组件，根据之前事件存储，用 React 事件名 + 组件 key，找到对应绑定回调方法，执行，详细过程为：
		- 根据 DOM 事件构造 React 合成事件。
		- 将合成事件放入队列。
		- 批处理队列中的事件（包含之前未处理完的，先入先处理） 
- 注：在调用回调时，有一个类似 listener(event) 的调用，所以事件绑定函数可以默认传参 event。


# 四、最佳实践
- 希望看下面代码的同学能对 ES 2017 有所了解，我们希望我们写的代码能随时跟随 ECMAScript 的步伐。所以尽可能不再使用 ES 2015 提倡的 constructor，而是使用最新的ES 2017 类属性提案。
- 回到这一段代码，相信大家现在明白这一段代码到底做了什么。

	```
	listView = list.map((item,index) => {
		return (
			<p onClick={this.handleClick.bind(this, item.id)} key={index}>{item.text}</p>
		);
	})
	```
- 虽然我们的写法很类似 DOM 原生事件绑定，但实际上 React 仍旧帮你进行了事件委托，这大大优化了性能。
- 每个 bind 都会生成一个实例存储于 listenerBank 中。而这些函数实例都功能类似，这样写是极大浪费内存的。但我们可以利用默认参数 event，来用解决内存浪费的问题。 

	```
	this.handleClick = (event) => {
		let componentID = event.target.id;
		// code
	}
	listView = list.map((item,index) => {
		return (
			<p onClick={this.handleClick} id={item.id} key={index}>{item.text}</p>
		);
	})
	```
- 有些封装的很好的组件（eg：蚂蚁金服 ant design 的评分 Rate 组件），不默认传 event。就导致，有多个相同组件时，无法将所有组件的相同事件绑定在一个函数上，否则无法分辨是哪一个函数触发了事件。于是只能用 bind 或者箭头函数内部调用函数的方式来批量创建函数实例，极大的浪费了内存。如果大家有好的方法，也欢迎评论讨论。
	- 解决方案，详见<a href="https://zhuanlan.zhihu.com/p/27132447">我的知乎专栏</a>
		1. 外部封装一层组件
	
	
	
	
