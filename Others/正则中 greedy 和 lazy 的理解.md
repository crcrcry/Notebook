# 正则中的 Greedy 和 Lazy
## 一、现象
```javascript
let result = 'aaab'.match(/(a+?)b/);

console.log(result)	;	// ab？ aaab？
```
- 结果是 aaab。


## 二、问题
- 不是 ? 表示 lazy match，会匹配尽可能少吗？
- 这个问题是有问题的，反映了对正则表达式中 lazy 和 greedy 理解的不透彻。

## 三、解释
- /(a+?)b/，意思是匹配（1——n）个 a 加上1个 b，采取 lazy match。
- 匹配过程：
	- 寻找第一个 a，在 index = 0 处找到，于是 (a+?) 匹配完成，index++，开始匹配 b。
	- 在 index = 1 处没有找到 b，回溯匹配 (a+?) ，匹配成功，index++，开始匹配 b。
	- ...
	- 在 index = 3 处找到 b，匹配完成。
- 原理：
	- lazy 表达，lazy 部分匹配成功时，则立刻匹配下一部分正则。
	- greedy 则表示，greedy 部分匹配成功时，继续尝试匹配当前部分的 greedy 正则，直到匹配不成功，再尝试匹配下一部分。
	- 换句话说，lazy 表示“成功即停止”，而不是简单理解成“最少”。
	- 换句话说，greedy 表示“成功则继续，直到失败”，也不能简单理解成“最多”。

## 四、正则匹配原理
- [参考文献](http://blog.csdn.net/lxcnn/article/details/4756030)
