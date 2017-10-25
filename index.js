const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
    //如果JSONP的请求为GET
    if (ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp') {
        //获取JSONP的callback
        let callbackName = ctx.query.callback || 'callback'
        let returnData = {
            success: true,
            data: {
                text: 'this is a jsonp api',
                time: new Date().getTime()
            }
        }
        //JSONP的script字符串
        let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`
        //用text/javascript，让请求支持跨域请求
        ctx.type = 'text/javascript'
        //输出jsonp字符串
        ctx.body = jsonpStr
    } else {
        ctx.body = 'hello jsonp'
    }
})
app.listen(3000, () => {
    console.log('[demo] jsonp is tarting on port 3000')
})