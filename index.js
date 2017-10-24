const Koa = require('koa')
const app = new Koa()

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
        let postData = await parsePostData(ctx)
        ctx.body = postData
    } else {
        //其他请求显示404
        ctx.body = '<h1>404 page</h1>'
    }
})

//解析上下文里node原生请求的post参数
function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postData = '';
            ctx.req.addListener('data', (data) => {
                postData += data
            })
            ctx.req.addListener('end', () => {
                let parseData = parseQueryStr(postData)
                resolve(parseData)
            })
        } catch (err) {
            reject(err)
        }
    })
}

//将post请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    console.log(queryStrList)
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}

app.listen(3000, () => {
    console.log('[demo] post request is starting on port: 3000')
})