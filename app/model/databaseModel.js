'use strict';

var mysql=require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'froiden_envanto'
})

connection.connect(function(err){
    // console.log('sql err : ',err)
    if(err) throw err;
})

module.exports=connection;

