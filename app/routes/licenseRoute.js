// 'use strict';
// const express = require('express');
// const router = express.Router();    

// const userRoute = require('./userRoute')

// const license_control = require('../controller/licenseController');

// //license routes
// router.get('/license',license_control.get_all_licenses)   
// router.post('/license',license_control.add_license);

// router.get('/license/:id',license_control.get_single_license)
// router.delete('/license/:id',license_control.delete_license)
// router.post('/license/:id',license_control.update_license);    

// router.use('/user',userRoute.router)

// module.exports.router = router;
module.exports=function(app){
    const license_control = require('../controller/licenseController');

//license routes
app.route('/license')
    .get(license_control.get_all_licenses)   
    .post(license_control.add_license);

app.route('/license/:id')
    .get(license_control.get_single_license)
    .delete(license_control.delete_license)
    .post(license_control.update_license);    
}
