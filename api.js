//引入 mysql 类库
var mysql      = require('mysql');      

var connection = mysql.createConnection({
    host     : 'localhost',         //数据库地址
    user     : 'root',              //数据库用户名
    password : 'msl1326320',            // 数据库密码
    database : 'api2009'              // 数据库名
});

//建立连接
connection.connect();

//拼装sql语句
let sql = "select * from p_users order by user_id desc limit 10"

//执行查询
connection.query(sql, function (error, results, fields) {
    console.log(results)
});
