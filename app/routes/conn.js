var mysql=require("mysql");
var pool = mysql.createPool({
    host:'localhost',
    port:3306,
    protocol:'mysql',
    user:'root',
    password:'zucc',
    database:'secretbase',
    connectionLimit:100 //最大连接数
})


module.exports=pool;