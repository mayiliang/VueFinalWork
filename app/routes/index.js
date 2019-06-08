var express = require('express');
var router = express.Router();
var path = require("path");
var fs=require("fs");
var url=require("url");
var bodyParse=require("body-parser");
var querystring = require('querystring');
var urlencode=bodyParse.urlencoded({extended:false});
var methods=require("./methods.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200);
  res.redirect('/login');
});
router.get('/login',function(req,res,next){
  res.status(200);
  res.sendFile(path.resolve(__dirname,"../public/login.html"));
});
router.get('/register',function(req,res,next){
  res.status(200);
  res.sendFile(path.resolve(__dirname,"../public/register.html"));
});
router.get('/homepage',function(req,res,next){
  res.status(200);
  res.sendFile(path.resolve(__dirname,"../public/homepage.html"));
});
router.post('/addUser',urlencode,function(req,res,next){
  var params=[req.body.username,req.body.password,req.body.nickname,req.body.email];
  methods.addUser(res,params);
  
});
router.post('/checkLogin',urlencode,function(req,res,next){
  var params=[req.body.username,req.body.password];
  methods.checkLogin(res,params);
});
router.get('/checkName',function(req,res,next){
  
  var params = url.parse(req.url, true).query;
  methods.checkName(res,params.username);
  
  
})


module.exports = router;
