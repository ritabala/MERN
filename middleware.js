const jwt= require('jsonwebtoken');
const confiq=require('./confiq');

exports.checkToken = function (req,res,next){
    let token = req.headers['x-access-token']|| req.headers['authorization'];
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
