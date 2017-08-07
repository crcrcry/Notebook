# 一、引子
## 1.1 引子
- 在写 React 的时候，大家一定都写过下面两行代码

	```
	import ReactDOM from 'react-dom';
	
	ReactDOM.render(
		<App />,
		document.getElementById('root')
	)
	```
- 在使用 React 的过程中，最终终将需要将 React 渲染到真实 DOM 上，所以，React 和 DOM 密不可分。

## 1.2 场景
- 想要写一个 Dialog 组件，Dialog 通常绝对定位在屏幕中央，背后有一层半透明的遮罩。 Dialog 通常直接渲染在 document.body 下。
- 我们想要调用某个 DOM 中的方法，比如表单中 input 的 focus、比如 HTML5 Audio/Video 的 play 播放视频。
- 想对 Popup 组件绑定事件，当点击其他区域可以收缩此组件。
- 想要获取 DOM 尺寸。
- ...


# 二、原理
## 2.1 背景
> React 0.14 版本开始，React 将 React 中涉及 DOM 操作的部分剥离开，目的是为了抽象 React，同时适用于 Web 端和移动端。

- 上述很好理解。0.14 版本之前，React 的设计思路为 App —— Virtual DOM —— DOM。可是，React 立志大前端，为了更方便的与其他平台集成，比如 React-Native 是基于 Virtual DOM 渲染出原生控件。因此，Virtual DOM 的映射输出，将由平台决定。在 Web 输出 DOM，在移动端输出 Android/IOS 控件。
- 因此抽离 ReactDOM 也更容易让人理解，Virtual DOM 可输出多种形式而不单单是 DOM，再将 DOM 放入 React 中就不合逻辑了。

## 2.2 相关 API
### 2.2.1 获取实例
- ReactDOM.findDOMNode(xxx)：获取 xxx 的 DOM 实例。
- JSX 中的 ref 属性：获取 React 中 DOM 元素或组件元素的实例。并添加到 this.refs 中。

### 2.2.2 操作 DOM
- ReactDOM.render()：将 Virtual DOM 挂载到浏览器 DOM 中。
- ReactDOM.unstable_renderSubtreeIntoContainer()：将 Virtual DOM 插入到 DOM 节点下。
- 上述两个函数的差别：前者是将 Virtual DOM 与 DOM 绑定替换。后者是插入其中，不替换内容。
- ReactDOM.unmountComponentAtNode()：与 render 相反，从浏览器 DOM 中卸载 Virtual DOM。


