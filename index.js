const Koa = require('koa')
const loggerAsync = require('./middleware/logger-async')
var app = new Koa()

app.use(loggerAsync())

app.use((ctx) => {
    ctx.body = 'hello world'
})
app.listen(3000, 'localhost', () => {
    console.log('starting on port: ', 3000)
})