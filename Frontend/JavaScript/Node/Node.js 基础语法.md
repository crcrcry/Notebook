# Node.js 文档阅读笔记
## 一、Node.js
1. JS解析器，提供运行环境(允许定义数据，运算，使用内置对象和方法)：
	1. 浏览器：提供操作dom等的内置对象
	2. Node.js：提供操作磁盘或搭建http服务器等的内置对象
2. 创造Node.js的目的：
	1. 实现高性能web服务器
	2. 重视事件机制和异步io模型(高效)的优越性
	3. 需要一种不自带io功能还良好支持事件机制的编程语言：js

## 二、模块
1. 预先定义的变量：require、exports、module。
2. require()，用于加载和使用别的模块。
	1. 模块名中的.js可以省略
	2. 也可以加载.json文件
3. exports对象是当前模块的导出对象，用于导出公有方法和属性。
4. module对象可以访问当前模块的相关信息，例如exports对象。
5. 一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。
6. 主模块，通常是main.js。
7. Node.js也支持C/C++编写的二进制模块。文件拓展名为.node

## 三、代码组织和部署
1. 模块路径解析规则：
	1. NodeJS内置模块。
	2. node_modules目录用于存放模块，会逐渐向上层查找node_modules中的模块。
	3. NODE_PATH环境变量中查找。
2. 包(package)
	1. 多个子模块组成的大模块称做包，所有子模块放在同一个目录中。
	2. 包有入口子模块，入口模块导出对象为包导出对象，目录会自动查找index.js。
	3. package.json中的“main”字段可以设置入口子模块。
3. 命令行程序（可执行程序），在linux中用shell完成。
4. 工程目录

	```
	- /home/user/workspace/node-echo/   # 工程目录
	    - bin/                          # 存放命令行相关代码
	        node-echo
	    + doc/                          # 存放文档
	    - lib/                          # 存放API相关代码
	        echo.js
	    - node_modules/                 # 存放三方包
	        + argv/
	    + tests/                        # 存放测试用例
	    package.json                    # 元数据文件
	    README.md                       # 说明文件
	```

5. NPM
	1. npm install \<package>@\<version> -global --save-dev
	2. npm adduser、npm publish：发布代码
	3. 语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。
		1. 如果只是修复bug，需要更新Z位。 
		2. 如果是新增了功能，但是向下兼容，需要更新Y位。
		3. 如果有大变动，向下不兼容，需要更新X位。
	4. npm help \<command>
	5. npm update \<package> (-g)：更新本地/全局的模块至最新版本。
	6. npm unpublish \<package>@\<version>：撤销发布过的代码。
	7. npm cache clear可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人。
	8. ...

	
## 四、文件操作
1. process是一个全局变量，可通过process.argv获得命令行参数。由于argv[0]固定等于NodeJS执行程序的绝对路径，argv[1]固定等于主模块的绝对路径，因此第一个命令行参数从argv[2]这个位置开始。
2. Buffer，数据块。将JS的数据处理能力从字符串扩展到了任意二进制数据。
	1. Buffer可以和字符串互相转换，通过toString()和Buffer()构造函数。
	2. 字符串是只读的，修改字符串得到的是新字符串。而Buffer更像指针操作的数组，slice()返回的是中间数组的指针。
	3. 拷贝Buffer需要通过Buffer.copy()。
3. Stream，数据流。
	1. 当内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，就需要用到数据流。
	2. Stream基于事件机制工作，所有Stream的实例都继承于NodeJS提供的EventEmitter。
4. File System，文件系统。fs内置模块提供对文件的操作。
	1. fs模块的API主要分三类：
		1. 文件属性读写：fs.stat, fs.chmod, fs.chown
		2. 文件内容读写：fs.readFile, fs.readdir, fs.writeFile, fs.mkdir
		3. 底层文件操作：fs.open, fs.read, fs.write, fs.close
		4. ...
	3. NodeJS最精华的异步IO模型在fs模块里有着充分的体现，例如上边提到的这些API都通过回调函数传递结果。但fs模块的所有异步API都有对应的同步版本（末尾多了一个Sync），用于无法使用异步操作时，或者同步操作更方便时的情况。
5. Path，路径。
	1. path.normalize：传入路径转换为标准路径。
	2. path.join：拼接多个路径。
	3. path.extname：操作拓展名。
	4. ...
6. 遍历目录，递归+深度优先+先序遍历

















