const mysql = require('mysql')

//创建数据连接池
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'koademo'
})

//在数据池中进行会话操作
pool.getConnection((err, conn) => {
    conn.query('SELECT * FROM test', (err, rs, fields) => {
        //结束会话
        conn.release()

        if (err) throw err
    })
})