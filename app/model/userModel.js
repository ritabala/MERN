'use strict';

var sql = require('../model/databaseModel');

var User = (user)=>{
    this.username = user.username,
    this.email = user.email,
    this.password = user.password
}

User.user_login = (email,result)=>{
    // sql.query('SELECT * from users where email =? and password =?',[email,password],function(err,res){
    //     if(err){result(null,err)}
    //     else {result(null,res)}
    // })
    sql.query('SELECT * from users where email =?',email,function(err,data){
        if(err){result(null,err)}
            result(null,data)
    })
}

User.user_register =(user,email,pwd,result)=>{
    sql.query('Insert into users set username = ?,email=?,password=?',[user,email,pwd],function(err,res){
        if(err){result(null,err)}
        else{result(null,res)
            console.log(res);
        }
    })
}
module.exports = User;