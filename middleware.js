const jwt= require('jsonwebtoken');
const confiq=require('./confiq');

exports.checkToken = function (req,res,next){
    console.log(req.headers)
    let token = req.headers['x-access-token']|| req.headers['authorization'];
console.log(token)
    if(token){
        if(token.startsWith(`Bearer`)){
            token = token.slice(7,token.length);
        }
        jwt.verify(token,confiq.secret,(err,decoded)=>{
            if(err){
                return res.send({ 
                    error: 'Fail to Authentication. Error -> ' + err 
                  });            }
            else{
                console.log(decoded);
                req.decoded=decoded;
                next();
            }
        })
    }
    else{
        return res.send({ 
            error: 'No token provided.' 
          });
        }
}

// const authJwt = {};
// authJwt.checkToken = checkToken;
// module.exports = checkToken;
// module.exports=checkToken;