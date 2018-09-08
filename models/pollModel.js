
var startVal = {"spring":0,"summer":0,"autumn":0,"winter":0};
var NodeCache = require( "node-cache" );
var myCache = new NodeCache();
exports.initDataBase = function(cb) {
   myCache.set("dataKey",startVal,function(err,success){
       cb(err,success);
   });
}

exports.getKey = function(cb) {
    myCache.get("dataKey",function(err,value){
       cb(err,value);
    });
}

exports.setData = function(value,cb) {
    myCache.set("dataKey",value,function(err,success) {
        cb(err,success); 
    });
}
