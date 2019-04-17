'use strict';
var sql = require('./databaseModel.js');

//license JAVASCRIPT OBJECT
// var License = {
//     // this.domain = license.domain;
// };

//license constructor
var License = function(lic){
    this.id= lic.id,
    this.domain=lic.domain,
    this.app_url=lic.app_url,
    this.purchase_code=lic.purchase_code,
    this.purchased_on = lic.purchased_on,
    this.supported_until = lic.supported_until,
    this.license_type	=lic.license_type	,
    this.envato_item_id=lic.envato_item_id,
    this.item_name	=lic.item_name	,
    this.buyer_username = lic.buyer_username,
    this.item_icon_url=lic.item_icon_url,
    this.item_image_url=lic.item_image_url,
    this.status=lic.status,
    this.earning=lic.earning    
};

License.object_data=123; // just for understanding

License.fetch_all_licenses = (result)=>{
    sql.query('Select * from licenses',function(err,res){
        if(err){
            result(null,err)
        }
        else{
             result(null,res);
        }
    })
}

License.get_single_license = (fetchId,result)=>{
    sql.query('Select * from licenses where id=?',fetchId,function(err,res){
        if(err){result(null,err)}
        else{result(null,res)}
    })
}

License.add_license = function add_license(newLic,result){
    sql.query("INSERT into licenses set ?",newLic, function(err,res){
        if(err)
            {result(null,err)}
        else
            {result(null,res)}
    } )
}

License.update_license = (updById,updLic,result)=>{
    sql.query('UPDATE licenses set ? where id=?',[updLic,updById],function(err,res){
        if(err)
            {  console.log(err)
                result(null,err)}
        else
            {  result(null,res)}    
    })
}

License.delete_license =(delById,result)=>{
    sql.query("Delete from licenses where id=?",delById,function(err,res){
        if(err){
            result(null,err)
        }
        else{
            result(null,res)
        }
    })
}
module.exports = License;