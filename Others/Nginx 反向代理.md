# Nginx 反向代理
- Nginx 强大的反向代理功能就不赘述了，主要讲讲我在使用反向代理的过程中遇到的想要记录的点。

## 一、一些细节点
- 经过测试：
	- 当所有 server 的规则都不匹配时，nginx 会采用第一条 server 配置，所以一般第一条 server 会使用阻止页面。
	- 如果 nginx 中只配置了一个 server 域的话，则 nginx 是不会去进行 server_name 的匹配的，而是默认进入该 server。因为只有一个 server 域，也就是这有一个虚拟主机，那么肯定是发送到该 nginx 的所有请求均是要转发到这一个域的，即便做一次匹配也是进入这个域。
	- 如果 nginx 中配置了多个 server 域，nginx 进行匹配，一旦匹配成功，不会再进行匹配，关于具体的匹配规则可以参见nginx官网提供的文档。
- 下面为一个 Nginx 反向代理 server 样例


```
server {
  listen       80;
  server_name  _;
  return 404;
}

server {
  listen       80;
  server_name  localhost 115.159.152.163;

  location / {
    	root html;
  		index index.html index.htm;
	}
}

server {
  listen       80;
  server_name  www.zjuscda.club zjuscda.club test.zjuscda.club;

  location / {
  		#root html;
    	#index index.html index.htm;
  		proxy_pass http://115.159.152.163:3000;
  	}
}

server {
  listen       80;
  server_name  www.crcrcry.com.cn crcrcry.com.cn;

  location / {
		#root   html;
		#index  index.html index.htm;
  		proxy_pass http://115.159.152.163:3000;
  }

  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
    root   html;
  }
}
```

## 二、更多
- 其他强大的功能以后接触到再说吧！