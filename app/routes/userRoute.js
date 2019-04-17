'use strict';
let middleware = require('../../middleware');

module.exports=function(app){
    const user_control = require('../controller/userController')

app.route('/login')
    .post(user_control.get_user)

app.route('/register')
    .post(user_control.add_user)

app.route('/logout')
    .post(user_control.logout)

app.route('/refresh_token')
    .all(middleware.checkToken)
    .get(user_control.refresh_token)
}
