# 一、Python 基本语法
```
// python 基本语法。

// output
>>> print('The quick brown fox', 'jumps over', 'the lazy dog')
// input
>>> name = input('please enter your name: ')

// list
>>> L = ['Apple', 123, True]
// tuple，指向的地址不可变
>>> T = ('a', 'b', ['A', 'B'])
// dic
>>> D = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
// set
>>> S = set([1, 1, 2, 3])
```
```
// 条件判断
if age >= 18:
    print('adult')
elif age >= 6:
    print('teenager')
else:
    print('kid')
```
```
// 循环

// for 循环
// list(range(5)) => [0, 1, 2, 3, 4]
sum = 0
for x in range(101):
    sum = sum + x

// while 循环
sum = 0
n = 99
while n > 0:
    sum = sum + n
    n = n - 2
```
```
// 函数

// 函数调用
// 函数名其实就是指向一个函数对象的引用，完全可以把函数名赋给一个变量
>>> a = abs 
>>> a(-1) 
1

// 函数定义
// 可以返回多个值，函数可以同时返回多个值，但其实就是返回一个tuple。
// 可以设置默认参数，参数可变，参数检查，...
def my_abs(x, y = 0):
	if not isinstance(x, (int, float)):
        raise TypeError('bad operand type')
	if x >= 0:
		return x, y
	else:
		pass
```
```

// 生成器
// 只要把一个列表生成式的[]改成()，就创建了一个 Generator，也可以通过 yield 创建 Generator
// 类似 JavaScript 的 Generator，next()
>>> g = (x * x for x in range(10))
>>> g
<generator object <genexpr> at 0x1022ef630>

// 迭代器
// 这些可以直接作用于 for 循环的对象统称为可迭代对象：Iterable。
// 可以被 next()函数调用并不断返回下一个值的对象称为迭代器：Iterator。
// 生成器都是 Iterator 对象，但 list、dict、str 虽然是 Iterable，却不是 Iterator。把 list、dict、str 等 Iterable 变成 Iterator 可以使用 iter() 函数：
// Iterator 对象表示的是一个数据流，通过 next()函数实现按需计算下一个数据，所以 Iterator 的计算是惰性的，只有在需要返回下一个数据时它才会计算。

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
