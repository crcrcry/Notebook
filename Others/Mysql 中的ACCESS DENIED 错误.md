# 关于 Mysql 中 ACCESS DENIED 错误
- 关于此次遇到 mysql -u root -p 时 ACCESS DENIED 错误，引申了解的关于 Mysql 的一些知识。

## 一、基本知识
### 1.1  client and server
- Mysql 分为 client 和 server，通过 socket 端口 3306 进行通信。
- 二进制文件 mysql 指的是 mysql client。
- 二进制文件 mysqld 指的是 mysql server。
- 运行 Mysql 时，必需有 mysqld 在后台运行，mysqld 也就是守护进程。
- 守护进程(daemon)：是一类在后台运行的特殊进程，用于执行特定的系统任务。很多守护进程在系统引导的时候启动，并且一直运行直到系统关闭。另一些只在需要的时候才启动，完成任务后就自动结束。

### 1.2 other command
- mysql_safe：安全模式启动 mysql server 的脚本文件。
- mysql.server：启动 mysql server 的脚本文件。
- mysql_install_db：database mysql 初始化程序。
- ...

## 二、一些重点
### 2.1 远程连接
- mysql 开启远程连接时，注意可以新建一条记录，而不要覆盖已有的，尤其不要覆盖 localhost，因为 mysql -h 不指定时默认用 localhost。
- 通常在 mysql.user 中新建的记录，默认权限都是 NO，所以需要 grant 赋予新权限。
- 最后需要 flush privileges。

### 2.2 修改 mysql.user
- 修改密码时，用 sql 语句的两种写法。
	- 正确：update mysql.user set password=PASSWORD("***********") where User='root';
	- 错误：update mysql.user set password="***********" where User='root';
	- 原因：mysql.user 中存储的 password 经过加密，验证时解密。而使用的映射就是 PASSWORD()。PASSWORD() 是一个 mysql 自带函数，类似 NOW()。
- 修改权限时，建议用 root 来 grant，否则 sql 语句很难写。

### 2.3 关于忘记密码
- 该两条命令可以免密进入 mysql
	- service mysqld stop
  - mysqld_safe --user=mysql --skip-grant-tables --skip-networking &
- 原理是，先停止现在的守护进程 mysqld，再重新开一个安全的跳过密码的 mysqld

### 2.4 关于开关 mysqld
- 关闭：
	- 方法一：
		- ps -A | grep mysql
		- kill -9 -进程号
	- 方法二：
		- service mysqld stop
- 打开：
	- 上面一堆打开的命令和脚本文件







