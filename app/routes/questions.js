var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
//var tokenManager = require('../config/token_manager');

var questionNumber = 0;

var questions = [
    'question 1'
    , 'question 2'
    , 'question 3'
    , 'question 4'
    , 'question 5'
    , 'question 6'
    , 'question 7'
];

exports.getNext = function(req, res) {

	return res.json(200, {questions:{question:"test question 1",reponse:-1}});
 

};

exports.pushNext = function(io) {
 	console.log("test" + io);
  return function(req, res){
    
    io.sockets.emit('question', questions[++questionNumber]);
    res.json(200, {message: "Message received!"});    
  }
};
