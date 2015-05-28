var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
//var tokenManager = require('../config/token_manager');


var votes = [0,0,0,0,0,0,0,0,0];
var ips =[];
exports.vote = function(req, res) {

 var ip = req.connection.remoteAddress;
console.log("fonction : " +contains(ips,ip));	 
 if(contains(ips,ip)){
	console.log("boulet");
	return res.json(200);
 }else{
	ips.push(ip);
	var vote= Number(req.query.vote); 
	votes [vote-1] +=  1;
	return res.json(200, {votes:votes,date:new Date(),ips:ips});
}
 

};

exports.getvotes = function(req, res) {
 return res.json(200, {votes:votes,date:new Date()});
};

exports.reset = function(req, res) {
 votes = [0,0,0,0,0,0,0,0,0];
	ips =[];
return res.json(200, "reset");
};

function contains(a, obj) {
    var i = a.length;
    while (i--) {
	console.log("a[i] : "+ a[i]);
	console.log("obj: "+ obj);
       if (a[i] == obj) {
           return true;
       }
    }
    return false;
}