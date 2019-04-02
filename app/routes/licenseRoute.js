'use strict';
module.exports=function(app){
    const middleware = require('../../middleware');
    const license_control = require('../controller/licenseController');

//license routes
app.route('/license').all(middleware.checkToken)
    .get(license_control.get_all_licenses)
    .post(license_control.add_license);

    // app.post('/license',[middleware.checkToken],function(req,res){license_control.add_license});

app.route('/license/:id').all(middleware.checkToken)
    .get(license_control.get_single_license)
    .delete(license_control.delete_license)
    .post(license_control.update_license);    
}
