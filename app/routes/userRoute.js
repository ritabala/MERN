// 'use strict';
// const express = require('express');
// const router = express.Router();    
// const user_control = require('../controller/userController')

// router.get('/login',user_control.user_login);
// module.exports.router = router;
'use strict';
module.exports=function(app){
    const user_control = require('../controller/userController')

app.route('/login')
    .post(user_control.get_user)

app.route('/register')
    .post(user_control.add_user)

app.route('/logout')
    .post(user_control.logout)

}