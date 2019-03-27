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
        if(!user) return res.status(404).send('No user found.');
        
        //compare password
        var passwordIsValid = bcrypt.compareSync(pwd, user[0].password);
        console.log('passwordIsValid',passwordIsValid )

        //invalid password
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        //create token    
        var token = jwt.sign({ id: user[0].id }, 
                                confiq.secret, 
                               {expiresIn: 3600} // expires in 1 hour
        );
        res.status(200).send({ auth: true, token: token,user });             
            // res.send(user);
    })
}

exports.add_user=(req,res) =>{
    // console.log('in register controller')
    var email = req.body.email;
    var pwd = bcrypt.hashSync(req.body.pwd,10)   ;
    var username = req.body.user;
    // var newUser = new Model(req.body)
    Model.user_register(username,email,pwd,function(err,user){
        if(err){res.send(err)}
        //create token
        var token = jwt.sign({id:user.id},
                              confiq.secret,
                             {expiresIn : 3600}  //expires in 1 hr
                             );
            // res.send(user,{auth:true,token:token});
            res.status(200).send({auth: true, token: token, user }); // id:insertid

    })
}

exports.logout=(req,res)=>{
    res.status(200).send({ auth: false, token: null,user });
}
