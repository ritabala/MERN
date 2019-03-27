//initialize
// var express = require('express');
// var router = express.Router();
module.exports=function(app){
    require('./licenseRoute');
    require('./userRoute');  
}