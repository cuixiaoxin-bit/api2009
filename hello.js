const express = require('express')
const mysql = require('mysql'); 
const app = express()
const port = 3000


const connection = mysql.createConnection({
  host     : 'localhost',         //数据库地址
  user     : 'root',              //数据库用户名
  password : 'root',            // 数据库密码
  database : 'api2009'              // 数据库名
});

//建立连接
connection.connect();

//返回3000端口
app.get('/', (req, res) => {
  res.send('Hello World!')
})


//返回数据库数据
app.get('/user', (req, res) => {
 let ad="<h1>斩断钢铁的意志</h1>"
 res.send(ad)
})


app.get('/user/list', (req, res) => {
      //拼装sql语句
    let sql = "select user_id,user_name,email from p_users order by user_id desc limit 5"

    //执行查询
    connection.query(sql, function (error, results, fields) {
        res.send(results)
    });
 })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})