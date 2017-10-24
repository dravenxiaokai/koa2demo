const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

//静态资源相对路径
const staticPath = './public'

app.use(static(path.join(__dirname, staticPath)))

app.use(async (ctx) => {
    ctx.body = 'hello koa@2'
})

app.listen(3000, () => {
    console.log('[demo] koa-static middleware is starting on port: 3000')
})