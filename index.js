const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

//使用ctx.body解析中间件
app.use(bodyParser())

app.use(async (ctx) => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        //get请求时返回表单
        let html = `
            <h2>koa@2 post request</h2>
            <form action="/" method="POST">
                <p>userName</p>
                <input name="username" type="text"><br>
                <p>userPwd</p>
                <input name="userPwd" type="password"><br>
                <button type="submit">submit</button>
            </form>
        `
        ctx.body = html
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        //post请求时，解析表单里数据，并显示
        let postData = ctx.request.body
        ctx.body = postData
    } else {
        //其他请求显示404
        ctx.body = '<h1>404 page</h1>'
    }
})

app.listen(3000, () => {
    console.log('[demo] koa-bodyparser is starting on port: 3000')
})