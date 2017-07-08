# Koa2 排坑
- ctx.body、ctx.status 的设定并不会立刻返回，而是会等到中间件执行完毕后，以最后一次的设定为准。
- ctx.status 可以用于没有设定 ctx.body 的情况，自动填充 body 为对应字符串。也可以使响应包获得不同的 status 用于处理。
- koa-router 并不会自动进入匹配到的多个路由，只会进入第一个，除非手动调用 next；