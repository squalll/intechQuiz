var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
//var tokenManager = require('../config/token_manager');

var votes = [0,0,0,0,0,0,0,0,0];
var ips = [];



exports.vote = function(io) {
    return function(req, res, next) {

        var ip = req.connection.remoteAddress;
        console.log("fonction : " + contains(ips, ip));
        if (contains(ips, ip)) {
            console.log("boulet : " + ip);
            return res.json(200, {message: 'tricheur'});
        } else {
            ips.push(ip);
            var vote = Number(req.body.vote);
            console.log("vote : " + req.body.vote);
            votes [vote - 1] += 1;
            //return res.json(200, {votes:votes,date:new Date(),ips:ips});

            io.sockets.emit('votes', votes);

            next();
        }
    }

};

exports.getvotes = function(req, res) {
 return res.json(200, {votes:votes,date:new Date()});
};

exports.reset = function(req, res) {
 votes = [0,0,0,0,0,0,0,0,0];
	ips =[];
    winners = 0;
return res.json(200, "reset");
};

function contains(a, obj) {
    var i = a.length;
    while (i--) {
	//console.log("a[i] : "+ a[i]);
	//console.log("obj: "+ obj);
       if (a[i] == obj) {
           return true;
       }
    }
    return false;
}

exports.hasVoted = function(socket) {
    if(contains(ips, socket.handshake.address)){
        return true;
    }else{
        return false;
    }
};