const express = require('express')
const mysql = require('mysql');
const bodyParser = require('body-parser')
const app = express()
const port = 3002

//根据具体情况 添加或删除部分字段
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    next();
});



app.use(bodyParser.json())



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

//查询数据
app.get('/goods/list', (req, res) => {
      //拼装sql语句
    let sql = "select goods_id,goods_name,number,shop_price from p_cart order by goods_id asc limit 10"

    //执行查询
    connection.query(sql, function (error, results, fields) {
        res.send(results)
    });
 })

 //删除数据
 app.delete('/goods/delete',(req,res)=>{
     let gid=req.query.gid
     let sql= `delete from p_cart where goods_id=${gid}`
     connection.query(sql,function(error,results,fields){
         res.send("删除成功")
     })
 })
 //更新数据
 app.put('/goods/update',(req,res)=>{
     console.log(req.body)
     let goods_id=req.body.goods_id
     let number=req.body.number
     let sql=`update p_cart set number='${number}' where goods_id=${goods_id}`
     connection.query(sql,function(error,results,fields){
         res.send("修改成功")
     })
 })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})