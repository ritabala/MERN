'use strict';
var Model = require('../model/licenseModel');

// console.log(Model)

// get all licenses from database
exports.get_all_licenses=(req,res)=>{
    console.log('in fetch all controller')
    Model.fetch_all_licenses(function(err,lic){
        if (err){res.send(err);}
        res.send(lic);
    })
    // return 'hi'
}

// get single license from database based upon id
exports.get_single_license =(req,res)=>{
    console.log('in single controller',req)
    var fetchId = req.params.id;
    Model.get_single_license(fetchId,(err,lic)=>{
        if(err){res.send(err)}
        res.send(lic);
    })
}

//add new license in database
exports.add_license = (req,res)=>{
    var newLic=new Model(req.body);

    Model.add_license(newLic,(err,lic)=>{
        if (err) res.send(err);
        res.send(lic);
    })
}

//update existing license based upon id in database
exports.update_license =(req,res)=>{
    var updLic = new Model(req.body);
    var updById = req.params.id; //from URL

    Model.update_license(updById,updLic,(err,lic)=>{
        if(err) res.send(err);
        res.send(lic);
    })
}

//delete license from database
exports.delete_license =(req,res)=>{
    console.log('in delete')
    var delById = req.params.id;
    Model.delete_license(delById,(err,lic)=>{
        if(err){res.send(err)}
        res.send(lic);
    })
}