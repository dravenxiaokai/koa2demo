const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
    if (ctx.url === '/index') {
        ctx.cookies.set('cid', 'hello world', {
            domain: 'localhost',//cookie所在的域名
            path: '/index',//cookie所在的路径
            maxAge: 20 * 60 * 1000,//cookie有效时长
            expires: new Date('2018-10-24'),//cookie失效时间
            httpOnly: false,//是否只用于http请求中获取
            overwrite: false//是否允许重写
        })
        ctx.body = 'cookie is ok'
    } else {
        ctx.body = 'hello koa@2'
    }
})

app.use(async (ctx) => {
    ctx.body = 'hello koa@2'
})

app.listen(3000, () => {
    console.log('[demo] cookie is starting on port: 3000')
})