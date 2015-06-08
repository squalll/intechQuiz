var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
//var tokenManager = require('../config/token_manager');

var data = require('./questions.json');
var questionNumber = -1;



exports.getNext = function(req, res) {
	return res.json(200, data.questions[questionNumber]);
 

};

exports.reset = function(req, res) {
	
	questionNumber = -1;
	
	return res.json(200);
 

};

exports.pushNext = function(io) {
 	
  return function(req, res){
    
    io.sockets.emit('question',  data.questions[++questionNumber]);
    res.json(200, {message: "Message received!"});    
  }
};
