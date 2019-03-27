const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app=express();

// add CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// serve static files like images,css,js
app.use(express.static('public'))

//set view engine to ejs
app.set('view engine','ejs')

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'froiden_envanto'
});

connection.connect();

// const router = express.Router();    
var licenseRoute = require('./app/routes/licenseRoute');
var userRoute = require('./app/routes/userRoute');
licenseRoute(app);
userRoute(app);

// app.get('/',(req,res)=>{
//     res.send('Hello World')
// })

var server = app.listen(4000,()=>{
    console.log('Server is listening on port :'+server.address().port)
})

