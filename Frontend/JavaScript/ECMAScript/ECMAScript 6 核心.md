# 前言
- ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（另外的 ECMAScript 方言还有 Jscript 和 ActionScript）。
- ES6 的第一个版本，就这样在2015年6月发布了，正式名称就是《ECMAScript 2015标准》（简称 ES2015）。2016年6月，小幅修订的《ECMAScript 2016标准》（简称 ES2016）如期发布，这个版本可以看作是 ES6.1 版，因为两者的差异非常小（只新增了数组实例的includes方法和指数运算符），基本上是同一个标准。根据计划，2017年6月发布 ES2017 标准。
- ES6 既是一个历史名词，也是一个泛指，含义是5.1版以后的 JavaScript 的下一代标准，涵盖了ES2015、ES2016、ES2017等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。

# 一、babel
	1. babel：一个js模块，es6转换器
	1. .babelrc
	2. babel-cli
	3. babel-node：支持es6的node环境
	4. babel-register：改写了require命令
	5. babel-core：babel核心模块代码，包含babel的api
	6. babel-polyfill：用于转换es6的api（babel只转换es6的句法）

# 二、let 和 const
	1. let 声明局部变量，只在块级作用域中有效
	2. const 声明只读的常量，作用域类似于 let

# 三、变量的解构赋值
1. 概述：ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，叫做解构(Destructuring)
2. 使用：
	- eg: 
		- let [a, b, c] = [1, 2, 3];
		- let { bar, foo } = { foo: "aaa", bar: "bbb" };
	- 解构赋值的拷贝是浅拷贝。
3. 理解：
	- 根据数字和对象与被赋值对象中的某些对应对等关系，来进行赋值。

# 四、拓展
## 4.1 字符串的拓展
1. 概述：ES6 加强了对 Unicode 的支持，并且拓展了字符串对象。
2. 使用：
	- 关于字符集编码：
		- Unicode 是一种统一码，为每种语言的每个字符设定了统一且唯一的二进制编码，各国编码得以互通。但，每个字符用相同的位数，导致前位全 0 的浪费。
		- UTF-8，又称万国码，用1-6个字节编码 Unicode 字符，用在网页可以统一中文显示各国语言，为传输而设计的编码，变长以节省 Unicode 编码浪费的空间。
		- ASCII，American Standard Code for Information Interchange，单字节字符集。
		- GB2312，ASCII 的中文拓展，双字节字符集。后来拓展到 GBK（增加了新汉字和繁体字）、GB18030（增加了少数民族的字符）。
	- 模板字符串，方便嵌入模板和变量。
	- String API 得到拓展。
3. 实例应用：
	- HTML 模板编译

## 4.2 正则的拓展
1. 对正则不熟，先空着 

## 4.3 数值的拓展
1. 使用：
	- 二进制和八进制的新写法。
	- Number 对象的拓展。
	- Math 对象的拓展。
	- ES2016 新增指数运算符 ** 。

## 4.4 数组的拓展
1. 使用：
	- 数组空位的处理。
	- Array API 得到拓展。

## 4.5 函数的拓展
1. 使用：
	- 函数参数的默认值。
	- 函数新增 name 属性，返回函数名。
	- "..." 的使用：
		- 作为 rest 参数：形式为 “...变量名”，用于获取函数的多余参数来取代 arguments 对象。
		- 作为拓展运算符：相当于 rest 参数的逆运算，将数组转换为逗号分隔的参数序列，便于替代函数的 apply() 。
	- 箭头函数：(参数) => (返回值)
		- 箭头函数的 this 对象，是定义时所在的对象而不是使用时所在的对象。
		- 不可以用作构造函数。
		- 不可以使用 arguments 对象，但可以用 rest 参数代替。
		- 不可以使用 yield 命令，不可以作 generator 函数。
	- “函数绑定”运算符 “::”，ES7 提出的提案
		- 用来取代 call、apply、bind 调用，Babel 已支持。
		- 双冒号左边是对象，右边是函数。左边的对象将作为上下文环境（this对象），绑定到右边的函数上。
		- eg：foo::bar; 等价于 bar.bind(foo);
		- 双冒号运算符返回原对象，所以可以采用链式写法。
	- 尾调用优化 in 函数式编程。
	- ES2017 允许函数最后一个参数有尾逗号，方便管理。

## 4.6 对象的拓展
1. 使用
	- 属性的简洁表示法：
		- 可以直接在对象的属性中写变量。
		- 方法简写。
	
		```
		var birth = '2000/01/01';
		
		var Person = {
		
		  name: '张三',
		
		  //等同于birth: birth
		  birth,
		
		  // 等同于hello: function ()...
		  hello() { console.log('我的名字是', this.name); }
		
		};
		```
	- 属性名表达式：
		- 方括号中可以写表达式，来定义对象的属性和方法。
		- 但不可与简洁表示法同时使用。
	- 属性遍历5种方法：
		- for...in：对象自身的和继承的可枚举属性（不含Symbol属性）。
		- Object.keys(obj)：对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。
		- Object.getOwnPropertySymbols(obj)：包含对象自身的所有Symbol属性。
		- Object.getOwnPropertyNames(obj)：对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。
		- Reflect.ownKeys(obj)：包含对象自身的所有属性，不管属性名是Symbol或字符串，也不管是否可枚举。
	- 对 Prototype 的操作：
		- \_\_proto__ 属性：用来读取和设置当前对象的 prototype 对象。
		- Object.setPrototypeOf 方法和 Object.getPrototypeOf 方法。ES6 正式推荐。
	- ES 2017 将 “...” 引入了对象。
		- rest 参数
		- 拓展运算符
	- Null 传导运算符：“?.” 。
	- Object API 的拓展。

# 五、Symbol
1. 概述：
	- 保证对象每个属性的名字都独一无二，防止属性名冲突。
	- Symbol 是一种新的类似字符串的**数据类型**，第七种。通过 Symbol() 生成，参数代表对当前 Symbol 值的描述，即 key。即便相同参数，每一个 Symbol 值都不相等。
	- Symbol 不能与其它类型的值进行运算，但可以转为字符串和布尔值。
2. 作为属性名的 Symbol
	- Symbol 作为属性名
		- 依然是公开属性
		- 该属性不会出现在 for...in、for...of 循环中
		- 只能通过 Object.getOwnPropertySymbols 返回
	- Symbol 值重用
		- Symbol(key)：未登记的返回 Symbol value。
		- Symbol.for(key)：登记的返回 Symbol value，所以只有 key 不存在时才会创建新 value。
		- Symbol.keyFor(value)：根据 value 返回已登记的 Symbol 的 key。
	- 内置11个 Symbol 值，部署在 Symbol 对象的属性。
		
	```
	var mySymbol = Symbol();
	
	// 第一种写法
	var a = {};
	a[mySymbol] = 'Hello!';
	
	// 第二种写法
	var a = {
		// 如果不放在方括号中，该属性的键名就是字符串，而不是所代表的那个 Symbol 值
	  [mySymbol]: 'Hello!'
	};
	
	// 第三种写法
	var a = {};
	Object.defineProperty(a, mySymbol, { value: 'Hello!' });
	
	// Symbol 值作为对象属性名时，不能用点运算符，因为点运算符后面总是字符串
	a[mySymbol] // "Hello!"
	```
	
3. 实例应用：
	- 防治对象属性名冲突。
	- 消除魔术字符串：消除在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。
	- Singleton 模式：调用一个类，任何时候返回的都是同一个实例。

# 六、Set 和 Map
1. 概述：
	- Set
	- WeakSet：和 Set 的区别在于
		- 成员只能是对象，且都只是弱引用。
		- 会被垃圾回收的引用计数机制忽略，所以 WeakSet 的成员随时会消失，因此不可遍历。
		- 适合存储临时的对象。
	- Map：类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。
	- WeakMap：和 Map 的区别在于
		- WeakMap 只接受对象作为键名（null除外）
		- WeakMap 的键名所指向的对象，不计入垃圾回收机制。
		- WeakMap 应用的典型场合就是 DOM 节点作为键名。
2. 使用：
	- 相互转换：Map、Set 和数组、对象、JSON

# 七、Proxy 对象
1. 概述：在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截。因此提供了一种机制，可以对外界的访问进行过滤和改写。即“代理”某些操作。
2. 使用：
	- 构造函数：

	```
	// target：拦截的目标对象，即若没有 Proxy 介入时要访问的对象
	// handler：定制拦截行为
	// 注：要使得 Proxy 起作用，必须针对 Proxy 实例而不是针对目标对象进行操作。
	var proxy = new Proxy(target, handler);
	```
	- 设置 object.proxy 属性，在 object 上调用。
	- 可以拦截的方法：通常是 object prototype 中的一些方法。
	- API：
		- Proxy.revocable()：返回一个可取消的 Proxy 实例。
		- 使用场景：目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。
	- 在 Proxy 代理的情况下，目标对象内部的 this 关键字会指向 Proxy 代理。
4. 实例应用：
	- Web 服务的客户端

# 八、Reflect 对象
1. 概述：
	- Reflect 对象与 Proxy 对象一样，也是 ES6 为了操作对象而提供的新 API。
	- 从 Reflect 对象上可以拿到语言内部的方法。
	- 修改某些 Object 方法的返回结果，让其变得更合理。例如 defineProperty 方法无法定义属性时，抛出错误修改成返回 false。
	- 让 Object 操作都变成函数行为。例如 in 操作和 delete 操作，改成 has 方法 和 deleteProperty  方法。
	- Reflect 对象的方法与 Proxy 对象的方法一一对应，Proxy 代理时总可以在 Reflect 上获取默认行为。
2. 使用：
	- Reflect 对象的静态方法，13个。
3. 实例应用：
	- 观察者模式

# 九、Promise 对象


# 十、Iterator
1. 概述：
	- 表示集合的数据结构：Array, Object, Map, Set。需要一种统一的访问接口。
	- 使得上述数据结构的成员能够按照某种次序排列。
	- 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费。
	- 遍历器对象本质上，就是一个指针对象指向数据结构的起始位置。不断调用 next 方法返回成员。
2. 使用：
	- 部署了 Symbol.iterator 属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。
	- 在ES6中，有四类数据结构原生具备 Iterator 接口：数组、某些类似数组的对象、Set和Map结构、字符串（由于字符串类似数组）。其他数据结构需要自己在 Symbol.iterator 属性上面部署自己的 Iterator 接口（原型链上的对象具有该方法也可），这样才会被 for...of 循环遍历。
	- 调用 Iterator 接口的场合：
		- 解构赋值
		- 拓展运算符
		- yield*
		- 其他接受数组作为参数的场合
	- 遍历器对象可部署的函数：
		- next：必须。
		- return：提前退出遍历时调用的方法。必须返回一个对象，通常是 {done: true}
		- throw：配合 Generator 函数使用。
	- Iterator 接口的最简单实现方式：Generator 函数
	- for 指令：
		- for...in 循环读取键名 key。
		- for...of 循环读取键值 value。

# 十一、Generator 函数
1. 概述：
	- 是 ES6 提供的一种异步编程解决方案。
	- 从语法上，可以理解成，Generator 函数是一个状态机，封装了多个内部状态。
	- 有两个特征：
		- function 关键字与函数名之间有一个星号；
		- 函数体内部使用 yield 表达式，定义不同的内部状态。
	- 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象。下一步，必须调用遍历器对象的 next 方法，使得指针移向下一个状态。next 方法返回一个对象，value 属性是当前 yield 表达式的值，done 属性表示遍历是否结束。
2. 使用：
	- 注意：
		- 缺点：yield 表达式如果是异步操作，不会等待异步执行完才返回值。
		- yield 表达式是惰性求值的。
		- Generator 函数不用 yield 表达式，就变成了一个单纯的暂缓执行函数。
		- yield 表达式本身没有返回值，但 next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值。
		- for...of 循环、扩展运算符（...）、解构赋值和 Array.from 方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。可以自动遍历 Generator 函数时生成的 Iterator 对象，且此时不再需要调用 next 方法。
	- API：
		- throw()：抛出错误
		- return()：返回给定的值，并且终结遍历Generator函数。
	- yield* 表达式
		- 如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的，这个就需要用到yield*表达式。
		- yield + 遍利器对象，则返回的 value 是这个对象。
		- yield* + 遍利器对象，则会遍历该遍利器对象。
		- yield* 后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，部署一个for...of循环 + yield。所以其实是一个语法糖。如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。
	- Generator 函数作为对象属性：* fun(){} 等价于 fun: function* (){}
	- Generator 函数的自动执行：
		- for...of
		- thunk 函数
		- co 模块
3. 实例应用：
	- yield*命令 + for...of循环可以很方便地取出嵌套数组或二叉树的所有成员。
	- Generator 是实现状态机的最佳结构。
	- Generator 用于处理异步操作：
		- 缺点：yield 表达式并不会等待异步操作执行完。
		- 难以判断何时异步操作完成，调用下一个 next() 来传递数据参数和继续执行。 
		- 实际还是需要结合 Promise，yield 表达式返回一个 Promise 对象。在 Promise 状态改变后调用 next 继续执行。

# 十二、async 函数
1. 概述：
	- ES2017 标准引入了 async 函数，使得异步操作变得更加方便。
	- async 函数是 Generator 函数的语法糖。
2. 使用：
	- 对 Generator 函数的改进，体现在：
		1. 内置执行器：自动执行。
		2. 更好的语义：* 替换成 async 表示有异步，yield 替换成 await 表示需要等待结果。
		3. 更广的实用性：await 后面，可以是 Promise 对象和基本类型值。
		4. 返回值是 Promise：async 函数返回值包装成 Promise 对象，该对象必须等到内部所有 await 命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到 return 语句或者抛出错误。
	- 关于 await：
		- 表现：遇到 await 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。但是，await 会等待异步操作执行完毕，通过封装 Promise 来实现。
		- 原理：await 命令后面是一个 Promise 对象。等到异步完成后 resolve，然后在 then() 中执行 next()。如果不是，会被转成一个立即 resolve 的 Promise。
	- 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这是可以用 catch 来处理错误。
	- 注意点：
		- 错误处理：catch Promise 对象的可能的 rejected 结果。
		- 同时触发节省时间：多个 await 命令，如果不存在继发关系，最好通过 Promise.all 来让它们同时触发。
	- async 函数原理：将 Generator 函数和自动执行器，包装在一个函数里。
	- for await ... of：遍历异步的 Iterator 接口。
3. 实例应用：
	- 顺序完成异步操作。

# 十三、Class
1. 概述：
	- ES6 的 class 是一个语法糖，使更容易面向对象开发。
2. 使用：
	- 基本语法：
		- constructor：构造函数的原理即返回实例对象的 this。
		- class 表达式
		- 私有方法：ES6 暂不提供标准方法，只能通过其他方式变通实现。
		- this：
			- class 中的 this 默认指向类的实例。
			- 若将带 this 的方法提取出来单独使用，this 会指向该方法运行时所在的环境（即默认用法）。
			- 解决方式：
				- constructor 中绑定 this。
				- 箭头函数。
				- Proxy。
		- name 属性
	- 继承：**原理重要，有空仔细阅读**
		- extends 关键字。
		- super 方法：
			- 必须在子类 constructor 中调用，因为子类没有自己的 this 对象，而是继承父类的 this 对象后再加工。
			- ES5 的继承，即原型链继承，实质是先创造子类的实例 this，再将父类的方法添加到 this 上面。
		- prototype 和 \_\_proto__：
			- prototype：显式原型，指向对象的原型 prototype 属性。
			- \_\_proto__：隐式原型，指向对象的构造函数的 prototype 属性。 
			- class 作为构造函数语法糖，同时有这两个属性。
				- 子类的 \_\_proto__ 属性，表示构造函数的继承，总是指向父类。
				- 子类 prototype 属性的 \_\_proto__ 属性，表示方法的继承，总是指向父类的prototype 属性。
				- 详见对象的拓展，与 class 继承的原理。即可知道上述原理。
		- ...（更多原理）
		- 原生构造函数的继承，例如 Array()、Number() 等
	- getter 和 setter：
		- 属性都有对应的读和写函数，是设置在属性的 descriptor 对象上。
		- 对某个属性使用 get 和 set 关键字，拦截读写行为。
	- class 的 Generator 方法。
	- class 的静态方法：
		- 不会像普通方法一样，被实例继承。实例无法直接调用，而是直接通过类调用。
		- 加 static 关键字。
		- 父类的静态方法可被子类继承。
	- class 的静态属性和实例属性：
		- 静态属性指 class 本身的属性，而不是定义在实例对象 this 上的属性。ES6 规定没有静态属性，只能通过一些方式来代替：
		- ES7 有一个静态属性提案：
			- 类的实例属性，直接写入类的定义。以前只能写在类的 constructor 中。
			- 类的静态属性，只要在实例属性前加上 static 关键字，因此产生新写法。
			
		```
		// 老写法
		class Foo {}
		Foo.prop = 1;
		
		// 新写法
		class Foo {
			static prop = 1;
		}
		```
	- class 的私有属性：一个提案，私有属性和方法名前用 # 表示。
	- new.target 属性：
		- 对象：返回 new 命令作用于的那个构造函数，如果构造函数不是用 new 调用，返回 undefined。
		- class：调用 new.target，返回当前 class。
	- Mixin 模式：将多个类的接口“混入”(mix in)另一个类。

# 十四、Decorator
1. 概述：
	- 修饰器(Decorator)是一个函数，用来修改类的行为。
	- 是一个 ES 的提案，Babel 已经支持。
2. 使用：

	```
	@testable
	class MyTestableClass {
	  // ...
	}
	
	// 等同于
	class MyTestableClass {}
	MyTestableClass = testable(MyTestableClass) || MyTestableClass;
	
	function testable(target) {
	  target.isTestable = true;
	}
	
	MyTestableClass.isTestable // true	
	```
	- 编译阶段起作用：
		- 修饰器对类行为的改变，是编译时发生的，而不是在运行时。
		- 修饰器能在编译阶段运行代码，也就是，修饰器本质就是编译时执行的函数。
	- 修饰器不仅可以修饰类，还可以修饰类的属性。但不能用于函数（因为存在变量提升）
	- 如果觉得一个参数不够用，可以在修饰器往外面再封装一层函数。
3. 实例应用：
	- core-decorators.js：是一个第三方模块，提供了几个常用修饰器
		- @autobind
		- @readonly
		- @override
	- 使用修饰器实现自动发布事件。
	- Mixin 和 Trait。

# 十五、Module
1. 概述：
	- 需求：JavaScript 模块化
	- 取代社区制定的一些方案：CommonJS、AMD…
	- 设计思想：
		- 静态化，编译时加载。
		- CommonJS 是运行时加载，即加载整个模块生成一个对象，再从对象上读取想要的方法。
		- ES6 模块不是对象，而是 export 指定输出代码，再通过 import 输入。
		- 效率高，可以静态分析。
2. 使用：
	- import 和 export 可以出现在模块顶层的任何位置，不能处于块级作用域。
	- export：
		- 输出变量、函数或类。可以通过 as 关键字重命名。
		- export 规定的是对外的接口，必须在接口名与模块内的变量之间建立一一对应关系。
		- export 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
	- import：
		- 从其他模块导入接口。可以用 as 关键字重命名。
		- import 是编译阶段执行，在代码运行之前，所以：
			- import 存在提升效果。
			- import 不能使用表达式和变量。
			- 不能放置于块级作用域等运行阶段的区域。
		- import 语句是 Singleton 模式：多次调用一个模块，任何时候返回的都是同一个实例。
	- 模块的整体加载：
		- import * as xx
		- import * 会忽略 default
	- export default：
		- 目的：用户快速上手，不需阅读文档去了解模块有哪些属性和方法。
		- export default 为模块指定默认输出，一个模块只能有一个默认输出。
		- import 可以用任何名称指向默认输出，需要注意的是，此时 import 命令后不使用大括号。
		- 如果想在一条 import 语句中，同时输入默认接口和其他接口，可用逗号分隔大括号。
		- 本质：export default 输出一个叫做 default 的变量接口，将 export default 后面的变量或值复制给 default，然后系统允许你为它取任意名字。
	- export 与 import 的复合写法：
		- 实现模块中先输入后输出同一个模块

		```
		export { foo, bar } from 'my_module';
		
		// 等同于
		import { foo, bar } from 'my_module';
		export { foo, bar };
		```
	- 模块的继承：
		- 方法：先输出引入的模块的所有接口，再输出自己模块本身的接口。
		- 注意：export * 会忽略 default 方法。
	- 跨模块常量
	- import()：
		- 需求：
			- 动态加载（运行时加载），取代 Node 中的 require 方法。
			- 动态加载：到底加载哪一个模块，运行时才（通过变量、条件）知道。
		- 使用：
			- import() 返回一个 Promise 对象。
			- 加载成功后，这个模块成为一个对象作为 then() 的参数。
			- 同时加载多个模块：Promise.all。
			- 也可以用在 async 函数中。
		- 和 Node require 的异同：
			- 都是动态（运行时）加载。
			- import() 是异步加载，Node require 是同步加载。
		- 适合场合：
			- 按需加载
			- 条件加载
			- 动态的模块路径
3. 实例应用：
	- 浏览器加载：
		- 传统加载方法：
			- \<script>：同步加载 JavaScript 脚本
			- defer 属性：异步加载，先下载脚本，等到页面渲染完才执行。多个 defer 脚本会按顺序执行。
			- async 属性：异步加载，先下载脚本，下载完就执行。多个 async 脚本不能保证执行顺序。
		- 加载 ES6 模块：
			- \<script> + type="module" + src：异步加载，渲染完在执行，等同于打开了 defer。
			- \<script> + type="module" + import
	- ES6 模块与 CommonJS 模块的差异：
		- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
			- CommonJS 是拷贝：一旦输出一个值，模块内部的变化就影响不到这个值。
			- ES6 是引用：不会缓存结果，动态的去加载实时的值。只读。
		- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
	- Node 加载
	- 循环加载
	- ES6 模块的转码


# 十六、规格
- 规格文件是计算机语言的官方标准，详细描述语法规则和实现方法。
- 一般来说，没有必要阅读规格，除非你要写编译器。因为规格写得非常抽象和精炼，又缺乏实例，不容易理解，而且对于解决实际的应用问题，帮助不大。但是，如果你遇到疑难的语法问题，实在找不到答案，这时可以去查看规格文件，了解语言标准是怎么说的。规格是解决问题的“最后一招”。
- 这对JavaScript语言很有必要。因为它的使用场景复杂，语法规则不统一，例外很多，各种运行环境的行为不一致，导致奇怪的语法问题层出不穷，任何语法书都不可能囊括所有情况。查看规格，不失为一种解决语法问题的最可靠、最权威的终极方法。
- ECMAScript 6规格的26章之中，第1章到第3章是对文件本身的介绍，与语言关系不大。第4章是对这门语言总体设计的描述，有兴趣的读者可以读一下。第5章到第8章是语言宏观层面的描述。第5章是规格的名词解释和写法的介绍，第6章介绍数据类型，第7章介绍语言内部用到的抽象操作，第8章介绍代码如何运行。第9章到第26章介绍具体的语法。

# 十七、二进制数组

# 十八、SIMD
1. 概述：
	- Single Instruction/Multiple Data：单指令、多数据，使用一个指令，完成多个数据的运算
	- 是 JavaScript 操作 CPU 相应指令的接口























