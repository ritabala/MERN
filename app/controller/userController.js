'use strict';
var Model =require('../model/userModel');
// var md5 = require('md5');
var jwt=require('jsonwebtoken');
var bcrypt=require('bcrypt');
var confiq=require('../../confiq')


exports.get_user = (req,res)=>{
    var email = req.body.email;
    var pwd = req.body.pwd   ;
    var userName= req.body.user;
    Model.user_login(email,function(err,user){
        if(err){
            res.send(err)}
        if(!user) return res.status(404).send({auth:false,message:'No user found.'});
        
        //compare password
        var passwordIsValid = bcrypt.compareSync(pwd, user[0].password);
        console.log('passwordIsValid',passwordIsValid )

        //invalid password
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null ,message:'Invalid password'});
        //create token    
        console.log(user)

        var token = jwt.sign({ id: user[0].id }, 
                                confiq.secret, 
                               {expiresIn: 3600} // expires in 1 hour
        );
        console.log(token)
        res.status(200).send({ auth: true, token: token,user ,message:'Authentication Successful'});             
            // res.send(user);
    })
}

exports.add_user=(req,res) =>{
    console.log('in register controller')
    var email = req.body.email;
    var pwd = bcrypt.hashSync(req.body.pwd,10)   ;
    var username = req.body.user;
    // var newUser = new Model(req.body)
    Model.user_register(username,email,pwd,function(err,user){
        if(err){res.send(err)
        console.log(err)}
        //create token
        var token = jwt.sign({id:user.id},
                              confiq.secret,
                             {expiresIn : 3600}  //expires in 1 hr
                             );
            // res.send(user,{auth:true,token:token});
            console.log(user,token)
            res.status(200).send({auth: true, token: token, user ,message:'User Created'}); // id:insertid

    })
}

exports.logout=(req,res)=>{
    res.status(200).send({ auth: false, token: null,user });
}
