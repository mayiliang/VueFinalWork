var express = require('express');
var pool=require("./conn.js");
var moment=require("moment");
var path = require("path");

var addUser=function (res,params){
   
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var time=new Date();
    var datetime=moment(time).format("YYYY-MM-DD HH:mm:ss");
    var store=path.resolve(__dirname,"../public");
    store+=("\\"+params[0]+"_"+new String(time.getTime()));
    params.push(store);
    params.push(datetime);
    var sql="insert into user(username,password,nickname,email,store,regdate) values(?,?,?,?,?,?)";

    pool.getConnection(function(err,conn){
        if(err){
            res.end("false");
            console.log(err);
            //do something
        }
        conn.query(sql,params,function(err,data){
            if(err){
                res.end("false");
                console.log(err);
                //do something
            }else{
                res.end("formtrue");
                console.log(data);
            }
            conn.release();
        })
        
    });
}
var checkLogin=function(res,params){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var sql="select userid from user where username=? and password=?";

    pool.getConnection(function(err,conn){
        if(err){
            res.end("false");
            console.log(err);
        
        }
        conn.query(sql,params,function(err,data){
            if(err){
                res.end("false");
                console.log(err);
                
            }else{
                console.log(data);
                if(data.length==0||data==null||data==undefined){
                    res.end("false");
                }else{
                    res.end("formtrue");
                }
                
                
            }
            conn.release();
        })
        
    });
}
var checkName=function(res,username){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var sql="select userid from user where username=?";
    var params=[username];
    pool.getConnection(function(err,conn){
        if(err){
            res.end("false");
            console.log(err);
        
        }
        conn.query(sql,params,function(err,data){
            if(err){
                res.end("false");
                console.log(err);
                
            }else{
                console.log(data);
                if(data.length==0||data==null||data==undefined){
                    res.end("success");
                }else{
                    res.end("false");
                }
                
                
            }
            conn.release();
        })
        
    });
    
    
}

module.exports={
    addUser,
    checkLogin,
    checkName,
}
