# 一、Python 基本语法
```
# python 基本语法。

# output
>>> print('The quick brown fox', 'jumps over', 'the lazy dog')
# input
>>> name = input('please enter your name: ')

# list
>>> L = ['Apple', 123, True]
# tuple，指向的地址不可变
>>> T = ('a', 'b', ['A', 'B'])
# dic
>>> D = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
# set
>>> S = set([1, 1, 2, 3])
```
```
# 条件判断
if age >= 18:
    print('adult')
elif age >= 6:
    print('teenager')
else:
    print('kid')
```
```
# 循环

# for 循环
# list(range(5)) => [0, 1, 2, 3, 4]
sum = 0
for x in range(101):
    sum = sum + x

# while 循环
sum = 0
n = 99
while n > 0:
    sum = sum + n
    n = n - 2
```
```
# 函数

# 函数调用
# 函数名其实就是指向一个函数对象的引用，完全可以把函数名赋给一个变量
>>> a = abs 
>>> a(-1) 
1

# 函数定义
# 可以返回多个值，函数可以同时返回多个值，但其实就是返回一个tuple。
# 可以设置默认参数，参数可变，参数检查，...
def my_abs(x, y = 0):
	if not isinstance(x, (int, float)):
        raise TypeError('bad operand type')
	if x >= 0:
		return x, y
	else:
		pass
```

# 二、Python 高级语法
## 2.1 切片
- slice

	```
	>>> (0, 1, 2, 3, 4, 5)[:4:2]
	(0, 2)
	```

## 2.2 列表生成式
- 是为了写出更简明的语法，下面两种复杂度刚好，更复杂的生成式通常就不适用了。

	```
	>>> [x * x for x in range(1, 11) if x % 2 == 0]
	[4, 16, 36, 64, 100]
	>>> [m + n for m in 'ABC' for n in 'XYZ']
	['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']
	```

## 2.3 生成器
- 创建方法：
	- 把一个列表生成式的[]改成()，就创建了一个 Generator
	- yield 创建 Generator 函数
- 遍历方式：
	- next()
	- for 循环
- 类似 JavaScript 的 Generator

## 2.4 迭代器
- 这些可以直接作用于 for 循环的对象统称为可迭代对象：Iterable。
- 可以被 next()函数调用并不断返回下一个值的对象称为迭代器：Iterator。
- 生成器都是 Iterator 对象，但 list、dict、str 虽然是 Iterable，却不是 Iterator。把 list、dict、str 等 Iterable 变成 Iterator 可以使用 iter() 函数：
- Iterator 对象表示的是一个数据流，通过 next()函数实现按需计算下一个数据并返回，所以 Iterator 的计算是惰性的，只有在需要返回下一个数据时它才会计算。

# 三、模块
- 自建模块
	- Python 标准文件模板
		- 第一行注释，可以在 Unix/Linux/Mac 运行
		- 第二行注释，编码
		- 第四行，文档注释，任何模块代码的第一个字符串都被视为模块的文档注释
		- 第六行，作者
	- 下方代码为一个自己写的 hello 模块
	- 最后的条件代码
		- 在命令行运行 hello 模块文件时，Python 解释器把一个特殊变量 \_\_name__ 置为 \_\_main__
		- 这种 if 测试可以让一个模块通过命令行运行时执行一些额外的代码

	```
	#!/usr/bin/env python3
	# -*- coding: utf-8 -*-
	
	' a test module '
	
	__author__ = 'Crcrcry'
	
	import sys
	
	def test():
	    args = sys.argv
	    if len(args)==1:
	        print('Hello, world!')
	    elif len(args)==2:
	        print('Hello, %s!' % args[1])
	    else:
	        print('Too many arguments!')
	
	if __name__=='__main__':
	    test()
	```
- 导入模块
	- import：
		- eg：import sys
		- 导入整个模块
	- from ... import：
		- eg：from sys import argv, path
		- 导入模块特定成员
- 安装第三方模块
	- 通过包管理工具 pip
	- 模块搜索路径，默认为：
		- 当前目录
		- 已安装的内置模块和第三方模块
		- 存放于 sys 模块的 path 变量

# 四、函数式编程
- 概述：
	- 面向过程的程序设计：函数是基本单元，一层层函数调用，把复杂任务分解为简单任务。
	- 函数式编程：思想更接近数学
		- 特点：
			- 允许把函数作为参数传入另一个函数，也允许返回另一个函数。
			- 纯函数：没有副作用。没有变量，输入确定则输出确定。
			- 非纯函数：有副作用。有变量，同样的输入可能得到不同的输出。
	- Python 允许变量，不是纯函数式编程语言，对函数式编程提供部分支持。
- **先跳过**

# 五、面向对象编程
- **先跳过**

# 六、错误、调试和测试
## 6.1 错误
- 错误处理
	- try ... except ... finally ...
	- eg:

	```
	try:
		print('try...')
    	r = 10 / 0
    	print('result:', r)
	except ZeroDivisionError as e:
    	print('except:', e)
	finally:
    	print('finally...')
	print('END')
	```
	```
	# 打印结果
	try...
	except: division by zero
	finally...
	END
	```
	- 如果错误一直没有被捕获，就会不断向上抛，直到被 Python 解释器捕获和打印。
	- 既然能捕获错误，就可以把错误堆栈打印在日志，分析原因。同时程序继续运行。使用内置模块 logging。
- 错误继承
	- 所有错误类型继承自 BaseException，而各类型错误之间也有继承关系，比如 UnicodeError 是 ValueError 的子类。
	- except 不但捕获该类型的错误，在该类型的子类型发生错误时，也会捕获。
- 抛出错误
	- raise 语句
		- 手动抛出错误
		- 不带参数则将当前错误原样上抛
		- 带参数则可以将一种错误转化为另一种，根据继承关系。比如：ZeroDivisionError -> ValueError
	- 意义：
		- 不断向上抛错误，可以让错误在合适的函数去解决。
		- 更明确函数的作用。

## 6.2 调试

## 6.3 测试
	

# 七、IO 编程

# 八、进程和线程

# 九、网络编程

# 十、数据库

# 十一、异步 IO
