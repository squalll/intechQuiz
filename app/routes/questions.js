var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
//var tokenManager = require('../config/token_manager');

var data = require('./questions.json');
var questionNumber = -1;

//compteur de gagnants
var winners = 0;

exports.getNext = function(io) {
 	
	return function(req, res){

    io.sockets.emit('questionAdmin',  data.questions[++questionNumber]);
	
	   io.sockets.emit('clean', data.questions[questionNumber]);

	return res.json(200, data.questions[questionNumber]);
 
	}
};


exports.goToQuest = function(io) {
 	
	return function(req, res){
		var index = Number(req.body.goTo);
		   console.log(req.body);
		questionNumber = index;
		io.sockets.emit('questionAdmin',  data.questions[questionNumber]);

		return res.json(200, data.questions[questionNumber]);
	 
  }
};

exports.reset = function(req, res) {
	
	questionNumber = -1;
	winners = 0;
	return res.json(200);
 

};

exports.pushNext = function(io) {
 	
  return function(req, res){
    
    io.sockets.emit('question',  data.questions[questionNumber]);
    res.json(200, {message: "Message received!"});    
  }
};

exports.checkWinner = function(req, res) {
    var currentQuestion = data.questions[questionNumber];
    if(!isNaN(currentQuestion.type)
    ) {
        if (Number(currentQuestion.type) > winners
            && currentQuestion.goodanswer == req.body.vote) {
            //winner++;
            console.log(++winners + " winner(s) / " + currentQuestion.type);
            return res.json(200, {win: true});
        }else{
            return res.json(200, {win: false});
        }
    }

    return res.json(200);


};

exports.currentQuestion = function(){
    if(questionNumber >= 0){
        return data.questions[questionNumber];
    }else{
        return null;
    }
}
